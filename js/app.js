// js/app.js - Main application logic

import * as storage from './storage.js';
import * as fileManager from './file-manager.js';
import * as git from './git-system.js';
import * as backstory from './backstory.js';
import { generateUUID } from './utils.js';

// --- STATE MANAGEMENT ---
let appState = {
    currentProjectId: null,
    project: null,
    activeFileId: null,
};

// --- DOM ELEMENTS ---
const fileTreeContainer = document.querySelector('.file-tree');
const branchSelectorContainer = document.querySelector('.branch-selector');
const editor = document.querySelector('.text-editor');
const commitHistoryContainer = document.querySelector('.commit-history');
const timelineContainer = document.querySelector('.timeline-view');
const commitMessageInput = document.getElementById('commit-message');
const commitButton = document.getElementById('commit-button');

// --- RENDER FUNCTIONS ---

function render() {
    if (!appState.project) return;
    console.log("Rendering application state:", appState);

    const currentBranch = appState.project.branches.find(b => b.id === appState.project.currentBranchId);
    if (!currentBranch) {
        console.error("Current branch not found!");
        return;
    }

    const fileTree = git.getFileTreeFromBranch(currentBranch);
    fileTreeContainer.innerHTML = fileManager.renderFileTree(fileTree, appState.activeFileId);
    commitHistoryContainer.innerHTML = git.renderHistory(currentBranch.commits);
    timelineContainer.innerHTML = backstory.renderTimeline(appState.project.backstory);

    branchSelectorContainer.innerHTML = `
        <select id="branch-switcher">
            ${appState.project.branches.map(b => `
                <option value="${b.id}" ${b.id === appState.project.currentBranchId ? 'selected' : ''}>
                    ${b.name}
                </option>
            `).join('')}
        </select>
    `;

    const activeFile = appState.activeFileId ? fileManager.findNodeById(fileTree, appState.activeFileId) : null;
    if (activeFile) {
        if (editor.value !== activeFile.content) {
            editor.value = activeFile.content;
        }
    } else {
        editor.value = 'Select a file to start editing.';
        editor.disabled = true;
    }

    // Re-attach listener for the new branch switcher dropdown
    document.getElementById('branch-switcher').addEventListener('change', handleBranchSwitch);
}

// --- EVENT HANDLERS ---

function handleFileClick(event) {
    const fileItem = event.target.closest('.file-item');
    if (fileItem && fileItem.dataset.id) {
        const fileId = fileItem.dataset.id;
        const fileNode = fileManager.findNodeById(git.getFileTreeFromBranch(getCurrentBranch()), fileId);

        if(fileNode && fileNode.type === 'file') {
            appState.activeFileId = fileId;
            editor.disabled = false;
            render();
        }
    }
}

function handleEditorInput() {
    if (!appState.activeFileId || !appState.project) return;

    let currentBranch = getCurrentBranch();
    let fileTree = git.getFileTreeFromBranch(currentBranch);

    // This is where we break immutability for performance.
    // Instead of deep copying the whole project on every keypress, we mutate the state directly.
    const fileNode = fileManager.findNodeById(fileTree, appState.activeFileId);
    if (fileNode && fileNode.content !== editor.value) {
        fileNode.content = editor.value;
        // A full save on every keystroke is too slow.
        // A real app would use debouncing. For now, we save on commit.
    }
}

function handleCommit() {
    const message = commitMessageInput.value.trim();
    if (!message) {
        alert('Please enter a commit message.');
        return;
    }

    let currentBranch = getCurrentBranch();
    const fileTree = git.getFileTreeFromBranch(currentBranch);

    const newCommit = git.createCommit(message, fileTree);
    const newBranch = git.addCommitToBranch(currentBranch, newCommit);

    // Update the project state
    appState.project.branches = appState.project.branches.map(b => b.id === newBranch.id ? newBranch : b);

    storage.saveProject(appState.project);
    commitMessageInput.value = '';
    render();
}

function handleBranchSwitch(event) {
    const selectedBranchId = event.target.value;
    appState.project.currentBranchId = selectedBranchId;

    // Reset active file when switching branches
    const newBranch = getCurrentBranch();
    const fileTree = git.getFileTreeFromBranch(newBranch);
    appState.activeFileId = (fileTree.length > 0 && fileTree[0].type === 'file') ? fileTree[0].id : null;

    storage.saveProject(appState.project);
    render();
}

// --- HELPERS ---
function getCurrentBranch() {
    return appState.project.branches.find(b => b.id === appState.project.currentBranchId);
}


// --- INITIALIZATION ---

function createDefaultProject() {
    const project = {
        id: generateUUID(), name: 'My First Novel', currentBranchId: null,
        branches: [], backstory: [], createdAt: Date.now()
    };

    const chapter1Node = { id: generateUUID(), type: 'file', name: 'Chapter 1.txt', content: 'It was a dark and stormy night...', children: null, parentId: null, createdAt: Date.now(), updatedAt: Date.now() };
    const charactersNode = { id: generateUUID(), type: 'folder', name: 'Characters', content: null, children: [], parentId: null, createdAt: Date.now(), updatedAt: Date.now() };
    const initialFileTree = [chapter1Node, charactersNode];

    const initialCommit = git.createCommit('Initial commit', initialFileTree);
    const mainBranch = git.createBranch('main', initialCommit);

    project.branches.push(mainBranch);
    project.currentBranchId = mainBranch.id;

    project.backstory.push(backstory.createBackstoryEvent({
        title: 'The Great Cataclysm', content: 'An ancient event that shaped the world.', date: '1000-01-01', tags: ['world-building', 'history']
    }));

    return project;
}

function init() {
    console.log("Initializing Plot Weaver...");
    let projects = storage.getProjectList();
    let projectToLoad = projects.length > 0 ? storage.loadProject(projects[0].id) : null;

    if (!projectToLoad) {
        console.log("No projects found. Creating a default project.");
        projectToLoad = createDefaultProject();
        storage.saveProject(projectToLoad);
    }

    appState.project = projectToLoad;
    appState.currentProjectId = projectToLoad.id;

    const currentBranch = getCurrentBranch();
    const fileTree = git.getFileTreeFromBranch(currentBranch);
    if (fileTree.length > 0 && fileTree[0].type === 'file') {
        appState.activeFileId = fileTree[0].id;
    }

    render();

    // Add event listeners
    fileTreeContainer.addEventListener('click', handleFileClick);
    editor.addEventListener('input', handleEditorInput);
    commitButton.addEventListener('click', handleCommit);
    // The branch switcher listener is added in render() because the element is recreated.
}

document.addEventListener('DOMContentLoaded', init);
