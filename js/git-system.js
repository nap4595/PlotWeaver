// js/git-system.js
// Implements the core Git-like functionality (commits, branches).

import { generateUUID } from './utils.js';

/**
 * Creates a new commit object.
 * @param {string} message - The commit message.
 * @param {Array<Object>} fileTree - A snapshot of the file tree.
 * @param {string} author - The author of the commit.
 * @returns {Object} The new commit object.
 */
export function createCommit(message, fileTree, author = 'user') {
    return {
        id: generateUUID(),
        message,
        timestamp: Date.now(),
        fileTreeSnapshot: JSON.parse(JSON.stringify(fileTree)), // Deep copy
        author,
    };
}

/**
 * Creates a new branch.
 * @param {string} name - The name of the new branch.
 * @param {Object} parentCommit - The commit to branch from.
 * @returns {Object} The new branch object.
 */
export function createBranch(name, parentCommit) {
    return {
        id: generateUUID(),
        name,
        // The new branch starts with the commit it was branched from.
        commits: parentCommit ? [parentCommit] : [],
    };
}

/**
 * Finds the latest commit on a given branch.
 * @param {Object} branch - The branch to inspect.
 * @returns {Object|null} The latest commit, or null if the branch has no commits.
 */
export function getLatestCommit(branch) {
    if (!branch || !branch.commits || branch.commits.length === 0) {
        return null;
    }
    // Assumes commits are ordered chronologically.
    return branch.commits[branch.commits.length - 1];
}

/**
 * Gets the file tree from the latest commit of a branch.
 * @param {Object} branch - The branch to get the file state from.
 * @returns {Array<Object>} The file tree snapshot.
 */
export function getFileTreeFromBranch(branch) {
    const latestCommit = getLatestCommit(branch);
    return latestCommit ? latestCommit.fileTreeSnapshot : [];
}

/**
 * Adds a commit to a branch. Returns a new branch object.
 * @param {Object} branch - The branch to add the commit to.
 * @param {Object} commit - The commit to add.
 * @returns {Object} A new branch object with the added commit.
 */
export function addCommitToBranch(branch, commit) {
    return {
        ...branch,
        commits: [...branch.commits, commit],
    };
}

/**
 * Renders the commit history as an HTML string.
 * @param {Array<Object>} commits - The list of commits to render.
 * @returns {string} HTML string for the history view.
 */
export function renderHistory(commits) {
    return commits
        .slice() // Create a copy to avoid reversing the original array
        .reverse()
        .map(commit => `
            <div class="commit-item" data-id="${commit.id}">
                <p class="commit-message">${commit.message}</p>
                <p class="commit-meta">
                    <span class="commit-id">${commit.id.substring(0, 7)}</span> by
                    <span class="commit-author">${commit.author}</span> on
                    <span>${new Date(commit.timestamp).toLocaleString()}</span>
                </p>
            </div>
        `)
        .join('');
}
