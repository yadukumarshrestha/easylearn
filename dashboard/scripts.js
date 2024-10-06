// scripts.js

// Redirects for buttons in index.html
document.addEventListener('DOMContentLoaded', () => {
    // Button for Add Questions
    document.getElementById('addQuestionsBtn').addEventListener('click', () => {
        window.location.href = '../admin_panel/add_questions.html'; // Redirect to add_questions.html
    });

    // Button for User Management
    document.getElementById('userManagementBtn').addEventListener('click', () => {
        window.location.href = '../user/user_management.html'; // Redirect to user_management.html
    });
});
// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    // Button for Admin Panel
    document.getElementById('adminBtn').addEventListener('click', () => {
        window.location.href = '../admin_panel/admin_login.html'; // Redirect to admin_login.html
    });

    // Button for User Panel
    document.getElementById('userBtn').addEventListener('click', () => {
        window.location.href = '../user/user_login.html'; // Redirect to user_login.html
    });
});
