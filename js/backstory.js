// js/backstory.js
// Manages backstory events and the timeline view.

import { generateUUID } from './utils.js';

/**
 * Creates a new backstory event object.
 * @param {Object} eventData - The data for the event (title, content, date, etc.).
 * @returns {Object} The new backstory event object.
 */
export function createBackstoryEvent(eventData) {
    return {
        id: generateUUID(),
        ...eventData,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    };
}

/**
 * Updates an existing backstory event. Returns a new array of events.
 * @param {Array<Object>} events - The current array of backstory events.
 * @param {string} eventId - The ID of the event to update.
 * @param {Object} updates - An object with the properties to update.
 * @returns {Array<Object>} The new array of backstory events.
 */
export function updateBackstoryEvent(events, eventId, updates) {
    return events.map(event => {
        if (event.id === eventId) {
            return { ...event, ...updates, updatedAt: Date.now() };
        }
        return event;
    });
}

/**
 * Deletes a backstory event. Returns a new array of events.
 * @param {Array<Object>} events - The current array of backstory events.
 * @param {string} eventId - The ID of the event to delete.
 * @returns {Array<Object>} The new array of backstory events without the deleted one.
 */
export function deleteBackstoryEvent(events, eventId) {
    return events.filter(event => event.id !== eventId);
}

/**
 * Renders the backstory timeline as an HTML string.
 * @param {Array<Object>} events - The array of backstory events to render.
 * @returns {string} The HTML representation of the timeline.
 */
export function renderTimeline(events) {
    if (!events || events.length === 0) {
        return '<p class="empty-timeline">No backstory events yet.</p>';
    }

    // Sort events by date, assuming 'YYYY-MM-DD' or similar sortable format
    const sortedEvents = [...events].sort((a, b) => {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
    });

    return sortedEvents.map(event => `
        <div class="timeline-item" data-id="${event.id}">
            <div class="timeline-date">${event.date || 'No Date'}</div>
            <div class="timeline-content">
                <h4 class="timeline-title">${event.title}</h4>
                <p class="timeline-summary">${event.content.substring(0, 100)}...</p>
                <div class="timeline-meta">
                    ${event.tags ? event.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
                </div>
            </div>
        </div>
    `).join('');
}
