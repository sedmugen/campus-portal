const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

/**
 * Fetch system service status information
 */
export const fetchSystemInfo = async () => {
    const response = await fetch(`${API_BASE_URL}/info`);
    if (!response.ok) {
        throw new Error('Failed to fetch system info. Verify the backend service is running.');
    }
    return response.json();
};

/**
 * Fetch all notices sorted by newest first
 */
export const fetchNotices = async () => {
    const response = await fetch(`${API_BASE_URL}/notice`);
    if (!response.ok) {
        throw new Error('Failed to fetch notices. Verify the backend service is running.');
    }
    return response.json();
};

/**
 * Create and publish a new campus notice
 * @param {{ title: string, message: string }} noticeData
 */
export const createNotice = async (noticeData) => {
    const response = await fetch(`${API_BASE_URL}/notice`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(noticeData),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || 'Failed to publish notice.';
        throw new Error(errorMessage);
    }
    return response.json();
};

/**
 * Delete a campus notice by its ID
 * @param {number|string} id
 */
export const deleteNotice = async (id) => {
    const response = await fetch(`${API_BASE_URL}/notice/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`Failed to delete notice #${id}.`);
    }
    return response.json();
};
