// Selecting the form element
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // 1. Get the values from the input fields
        const usernameInput = document.getElementById('username').value.trim();
        const passwordInput = document.getElementById('password').value.trim();

        // 2. Define the required credentials from your assignment
        const validUsername = "admin";
        const validPassword = "admin123";

        // 3. Validation Logic
        if (usernameInput === validUsername && passwordInput === validPassword) {
            // Success: Save a "login session" so the next page knows you're logged in
            localStorage.setItem('isLoggedIn', 'true');
            
            // Redirect to your Main Page (make sure the filename matches)
            window.location.href = 'main.html'; 
        } else {
            // Failure: Show an error (you can also style this with a red border later)
            alert('Invalid credentials! Please use: admin / admin123');
        }
    });
}