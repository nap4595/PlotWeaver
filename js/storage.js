// js/storage.js
// Manages saving and loading project data to/from LocalStorage.

const PROJECTS_LIST_KEY = 'plotweaver_projects';

/**
 * Retrieves the list of all projects from LocalStorage.
 * @returns {Array<Object>} A list of project metadata (e.g., { id, name }).
 */
export function getProjectList() {
    const list = localStorage.getItem(PROJECTS_LIST_KEY);
    return list ? JSON.parse(list) : [];
}

/**
 * Saves the list of all projects to LocalStorage.
 * @param {Array<Object>} projects - The list of project metadata to save.
 */
function saveProjectList(projects) {
    localStorage.setItem(PROJECTS_LIST_KEY, JSON.stringify(projects));
}

/**
 * Adds a new project to the projects list.
 * @param {Object} project - The full project object.
 */
export function addProjectToList(project) {
    const projects = getProjectList();
    if (!projects.find(p => p.id === project.id)) {
        projects.push({ id: project.id, name: project.name });
        saveProjectList(projects);
    }
}

/**
 * Deletes a project from the projects list and removes its data.
 * @param {string} projectId - The ID of the project to delete.
 */
export function deleteProject(projectId) {
    let projects = getProjectList();
    projects = projects.filter(p => p.id !== projectId);
    saveProjectList(projects);
    localStorage.removeItem(`plotweaver_project_${projectId}`);
}

/**
 * Saves a single project's entire data to LocalStorage.
 * @param {Object} project - The project object to save.
 */
export function saveProject(project) {
    if (!project || !project.id) {
        console.error("Cannot save project without an ID.");
        return;
    }
    addProjectToList(project); // Ensure it's in the list
    localStorage.setItem(`plotweaver_project_${project.id}`, JSON.stringify(project));
    console.log(`Project '${project.name}' saved.`);
}

/**
 * Loads a project's data from LocalStorage.
 * @param {string} projectId - The ID of the project to load.
 * @returns {Object|null} The loaded project object, or null if not found.
 */
export function loadProject(projectId) {
    const data = localStorage.getItem(`plotweaver_project_${projectId}`);
    if (data) {
        console.log(`Project with ID '${projectId}' loaded.`);
        return JSON.parse(data);
    }
    console.warn(`Project with ID '${projectId}' not found.`);
    return null;
}
