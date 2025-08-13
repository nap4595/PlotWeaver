// js/file-manager.js
// Manages the file and folder structure of a project using a functional approach.

import { generateUUID } from './utils.js';

/**
 * Creates a new file or folder node.
 * @param {string} type - 'file' or 'folder'.
 * @param {string} name - The name of the node.
 * @param {string|null} parentId - The ID of the parent folder.
 * @returns {Object} The new file node.
 */
function createNode(type, name, parentId) {
    return {
        id: generateUUID(),
        type,
        name,
        parentId,
        content: type === 'file' ? '' : null,
        children: type === 'folder' ? [] : null,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    };
}

/**
 * Recursively finds a node in the tree by its ID.
 * @param {Array<Object>} tree - The file tree to search.
 * @param {string} nodeId - The ID of the node to find.
 * @returns {Object|null} The found node or null.
 */
function findNodeById(tree, nodeId) {
    for (const node of tree) {
        if (node.id === nodeId) return node;
        if (node.type === 'folder') {
            const found = findNodeById(node.children, nodeId);
            if (found) return found;
        }
    }
    return null;
}

/**
 * Adds a new node (file or folder) to the tree.
 * @param {Array<Object>} tree - The current file tree.
 * @param {string} name - The name of the new node.
 * @param {string} type - 'file' or 'folder'.
 * @param {string|null} parentId - The ID of the parent folder (null for root).
 * @returns {Array<Object>} The new file tree.
 */
export function addNode(tree, name, type, parentId = null) {
    const newNode = createNode(type, name, parentId);
    const newTree = JSON.parse(JSON.stringify(tree)); // Deep copy for immutability

    if (!parentId) {
        // Add to root
        return [...newTree, newNode];
    }

    const parent = findNodeById(newTree, parentId);
    if (parent && parent.type === 'folder') {
        parent.children.push(newNode);
    } else {
        console.error("Parent not found or is not a folder.");
    }
    return newTree;
}

/**
 * Updates the content of a specific file.
 * @param {Array<Object>} tree - The current file tree.
 * @param {string} fileId - The ID of the file to update.
 * @param {string} content - The new content.
 * @returns {Array<Object>} The new file tree.
 */
export function updateFileContent(tree, fileId, content) {
    const newTree = JSON.parse(JSON.stringify(tree));
    const fileNode = findNodeById(newTree, fileId);
    if (fileNode && fileNode.type === 'file') {
        fileNode.content = content;
        fileNode.updatedAt = Date.now();
    } else {
        console.error("File not found or not a file node.");
    }
    return newTree;
}

/**
 * Deletes a node (file or folder) from the tree.
 * @param {Array<Object>} tree - The current file tree.
 * @param {string} nodeId - The ID of the node to delete.
 * @returns {Array<Object>} The new file tree.
 */
export function deleteNode(tree, nodeId) {
    // This is a simplified filter. A real implementation would need to handle parent references.
    const newTree = JSON.parse(JSON.stringify(tree));

    function recursiveFilter(nodes) {
        return nodes.filter(node => {
            if (node.id === nodeId) return false;
            if (node.type === 'folder') {
                node.children = recursiveFilter(node.children);
            }
            return true;
        });
    }

    return recursiveFilter(newTree);
}

/**
 * Renders the file tree as an HTML string (for display).
 * @param {Array<Object>} tree - The file tree to render.
 * @param {string} [currentFileId] - The ID of the currently active file.
 * @returns {string} The HTML representation of the file tree.
 */
export function renderFileTree(tree, currentFileId) {
    function renderNode(node) {
        const isActive = node.id === currentFileId ? 'active' : '';
        if (node.type === 'folder') {
            return `
                <div class="file-item folder ${isActive}" data-id="${node.id}">
                    <span class="name">${node.name}</span>
                    <div class="children">
                        ${node.children.map(renderNode).join('')}
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="file-item file ${isActive}" data-id="${node.id}">
                    <span class="name">${node.name}</span>
                </div>
            `;
        }
    }
    return tree.map(renderNode).join('');
}
