// ============================================================================
// API CONFIGURATION
// ============================================================================

const API_BASE_URL = 'http://localhost:5000/api';
const API_ENDPOINTS = {
    // Authentication
    LOGIN: `${API_BASE_URL}/auth/login`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh`,
    
    // Student
    STUDENT_PROFILE: `${API_BASE_URL}/students/profile`,
    ALL_STUDENTS: `${API_BASE_URL}/students`,
    
    // Attendance
    ATTENDANCE_CURRENT: `${API_BASE_URL}/attendance/current-semester`,
    ATTENDANCE_SUBJECT: `${API_BASE_URL}/attendance/subject`,
    
    // Grades
    GRADES_CURRENT: `${API_BASE_URL}/grades/current-semester`,
    GRADES_SUBJECT: `${API_BASE_URL}/grades/subject`,
    
    // Notices
    NOTICES: `${API_BASE_URL}/notices`,
    NOTICE_DETAIL: `${API_BASE_URL}/notices`,
    
    // Timetable
    TIMETABLE_WEEKLY: `${API_BASE_URL}/timetable/weekly`,
    
    // Admin
    ADMIN_STUDENTS: `${API_BASE_URL}/admin/students`,
    ADMIN_ATTENDANCE: `${API_BASE_URL}/admin/attendance`,
    ADMIN_GRADES: `${API_BASE_URL}/admin/grades`,
    ADMIN_NOTICES: `${API_BASE_URL}/admin/notices`
};

/**
 * Get Authorization Headers
 */
function getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}

/**
 * Check if user is authenticated
 */
function isAuthenticated() {
    return !!localStorage.getItem('token');
}

/**
 * Get current user from localStorage
 */
function getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

/**
 * Clear all authentication data
 */
function clearAuth() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('username');
}
