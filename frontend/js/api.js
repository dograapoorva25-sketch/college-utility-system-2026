// ============================================================================
// API HELPER FUNCTIONS
// ============================================================================

/**
 * Make HTTP request with authentication
 */
async function makeRequest(endpoint, method = 'GET', data = null) {
    try {
        const options = {
            method,
            headers: getAuthHeaders()
        };
        
        if (data) {
            options.body = JSON.stringify(data);
        }
        
        const response = await fetch(endpoint, options);
        
        // Check for unauthorized access
        if (response.status === 401) {
            clearAuth();
            window.location.href = 'login.html';
            return null;
        }
        
        const responseData = await response.json();
        
        if (!response.ok) {
            throw new Error(responseData.message || 'Request failed');
        }
        
        return responseData;
    } catch (error) {
        console.error('API Error:', error);
        return null;
    }
}

/**
 * Fetch student profile
 */
async function fetchStudentProfile() {
    return makeRequest(API_ENDPOINTS.STUDENT_PROFILE);
}

/**
 * Fetch current semester attendance
 */
async function fetchAttendance() {
    return makeRequest(API_ENDPOINTS.ATTENDANCE_CURRENT);
}

/**
 * Fetch current semester grades
 */
async function fetchGrades() {
    return makeRequest(API_ENDPOINTS.GRADES_CURRENT);
}

/**
 * Fetch all notices
 */
async function fetchNotices() {
    return makeRequest(API_ENDPOINTS.NOTICES);
}

/**
 * Fetch weekly timetable
 */
async function fetchTimetable() {
    return makeRequest(API_ENDPOINTS.TIMETABLE_WEEKLY);
}

/**
 * Format date to readable format
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Calculate attendance color based on percentage
 */
function getAttendanceColor(percentage) {
    if (percentage >= 85) return '#4caf50'; // Green
    if (percentage >= 75) return '#ffc107'; // Amber
    return '#f44336'; // Red
}

/**
 * Format attendance percentage
 */
function formatAttendance(attended, total) {
    return total > 0 ? Math.round((attended / total) * 100) : 0;
}
