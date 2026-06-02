// ============================================================================
// LOGIN PAGE JAVASCRIPT - Authentication Handler
// ============================================================================

/**
 * Toggle password visibility
 */
function togglePassword() {
    const passwordField = document.getElementById('password');
    const toggleBtn = document.querySelector('.password-toggle');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        passwordField.type = 'password';
        toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

/**
 * Handle login form submission
 */
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const rollNumber = document.getElementById('rollNumber').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.querySelector('.remember-me input').checked;
    const loginBtn = document.getElementById('loginBtn');
    const errorMsg = document.getElementById('errorMessage');
    const loader = document.getElementById('loadingSpinner');
    
    // Validation
    if (!rollNumber || !password) {
        showError('Please fill in all fields');
        return;
    }
    
    if (password.length < 4) {
        showError('Invalid credentials');
        return;
    }
    
    // Show loading state
    loginBtn.style.display = 'none';
    loader.style.display = 'flex';
    errorMsg.style.display = 'none';
    
    try {
        // Send login request
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: rollNumber,
                password: password
            })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            // Store token and user info
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            if (rememberMe) {
                localStorage.setItem('rememberMe', 'true');
                localStorage.setItem('username', rollNumber);
            }
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 500);
        } else {
            showError(data.message || 'Invalid roll number or password');
            loginBtn.style.display = 'flex';
            loader.style.display = 'none';
        }
    } catch (error) {
        console.error('Login error:', error);
        showError('An error occurred. Please try again.');
        loginBtn.style.display = 'flex';
        loader.style.display = 'none';
    }
});

/**
 * Display error message
 */
function showError(message) {
    const errorMsg = document.getElementById('errorMessage');
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
}

/**
 * Populate remember me field on page load
 */
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('rememberMe') === 'true') {
        const username = localStorage.getItem('username');
        if (username) {
            document.getElementById('rollNumber').value = username;
            document.querySelector('.remember-me input').checked = true;
        }
    }
    
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
        window.location.href = 'dashboard.html';
    }
});
