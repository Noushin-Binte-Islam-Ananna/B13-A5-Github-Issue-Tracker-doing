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

const API = "https://phi-lab-server.vercel.app/api/v1/lab";

const container = document.getElementById('issuesContainer');
const countDisplay = document.getElementById('countDisplay');
const loader = document.getElementById('loader');
const searchInput = document.getElementById('searchInput');

let allIssues = [];

// Fetch all issues from API and render on page load
async function fetchIssues() {

    loader.classList.remove('hidden');
    container.innerHTML = '';

    try {

        const res = await fetch(`${API}/issues`);
        const result = await res.json();

        allIssues = result.data;

        renderCards(allIssues);

    } catch (err) {

        container.innerHTML = `
        <p class="col-span-full text-center text-red-500 font-bold">
        Failed to load data.
        </p>`;

    }

    loader.classList.add('hidden');
}
