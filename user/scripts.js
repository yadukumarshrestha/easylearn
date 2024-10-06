// user/scripts.js

// Example of hardcoded admin credentials for demonstration purposes
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'password123'
};

// Load existing user credentials from local storage
let userCredentials = JSON.parse(localStorage.getItem('userCredentials')) || [];

// Handle Admin Login
function handleAdminLogin(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const username = document.getElementById('adminUsername').value.trim();
    const password = document.getElementById('adminPassword').value.trim();

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        window.location.href = '../dashboard/dashboard.html'; // Redirect to admin dashboard
    } else {
        alert('Invalid admin username or password.');
    }
}

// Handle User Login
function handleUserLogin(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const username = document.getElementById('userUsername').value.trim();
    const password = document.getElementById('userPassword').value.trim();

    // Debugging: Log input values
    console.log('Attempting login for:', username);

    const userFound = userCredentials.find(user => user.username === username && user.password === password);

    if (userFound) {
        // Store logged-in username in local storage
        localStorage.setItem('loggedInUser', username);
        console.log('Login successful for:', username);
        window.location.href = 'user_dashboard.html'; // Redirect to user dashboard
    } else {
        alert('Invalid username or password.');
        console.log('Login failed for:', username);
    }
}

// Handle User Registration
function handleUserRegistration(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const newUsername = document.getElementById('newUsername').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const gender = document.getElementById('gender').value;
    const newPassword = document.getElementById('newPassword').value.trim();

    // Validate inputs
    if (!name || !email || !newUsername || !phone || !gender || !newPassword) {
        alert('Please fill in all fields.');
        return;
    }

    // Check if the username already exists
    const existingUser = userCredentials.find(user => user.username === newUsername);
    if (existingUser) {
        alert('Username already exists. Please choose another one.');
        return;
    }

    // Store new user credentials
    userCredentials.push({ name, email, username: newUsername, phone, gender, password: newPassword });
    localStorage.setItem('userCredentials', JSON.stringify(userCredentials)); // Save to local storage

    alert('Registration successful! You can now log in.');
    window.location.href = 'user_login.html'; // Redirect to login page
}

// Attach event listeners based on the current page
document.addEventListener('DOMContentLoaded', () => {
    const adminLoginForm = document.getElementById('adminLoginForm');
    const userLoginForm = document.getElementById('userLoginForm');
    const userRegistrationForm = document.getElementById('userRegistrationForm');

    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', handleAdminLogin);
    }
    if (userLoginForm) {
        userLoginForm.addEventListener('submit', handleUserLogin);
    }
    if (userRegistrationForm) {
        userRegistrationForm.addEventListener('submit', handleUserRegistration);
    }
});

