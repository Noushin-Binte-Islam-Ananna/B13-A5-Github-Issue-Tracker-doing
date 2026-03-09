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

// Render Issue Cards
function renderCards(data) {

    if(data.length === 0){
        container.innerHTML = `
        <p class="col-span-full text-center text-gray-400 font-semibold">
        No issues found
        </p>`;
        countDisplay.innerText = 0;
        return;
    }

    countDisplay.innerText = data.length;

    container.innerHTML = data.map(issue => {

        const isOpen = issue.status.toLowerCase() === 'open';

        const topBorder = isOpen
            ? 'border-t-[#00A96E]'
            : 'border-t-[#A855F7]';

        const priorityMap = {
            high: "bg-[#FEECEC] text-[#EF4444]",
            medium: "bg-[#FFF6D1] text-[#F59E0B]",
            low: "bg-[#EEEFF2] text-[#9CA3AF]"
        };

        const priorityStyle = priorityMap[issue.priority.toLowerCase()];


        const statusImg = isOpen
            ? `<img src="./assets/Open-Status.png" class="w-6 h-6">`
            : `<img src="./assets/Closed- Status .png" class="w-6 h-6">`;

        return `

        <div onclick="openModal('${issue.id}')"
        class="bg-white border border-gray-100 border-t-4 ${topBorder}
        rounded-lg shadow-sm cursor-pointer hover:shadow-md
        transition-all flex flex-col h-full">

            <div class="p-5 flex-1 flex flex-col">

                <div class="flex justify-between items-center mb-4">
                    <div>${statusImg}</div>

                    <span class="text-[10px] font-medium px-5 py-1 rounded-full uppercase ${priorityStyle}">
                    ${issue.priority}
                    </span>
                </div>

                <h3 class="font-semibold text-black text-sm mb-2">
                ${issue.title}
                </h3>

                <p class="text-xs text-gray-400 mb-6">
                ${issue.description}
                </p>

                <div class="flex flex-wrap gap-2 mb-4">

                    <span class="text-[10px] font-medium bg-[#FEECEC] text-[#EF4444] px-2 py-1 rounded-full border border-[#FECACA] uppercase">
                    <i class="fas fa-bug text-[8px]"></i>
                    ${issue.category}
                    </span>

                    <span class="text-[10px] font-medium bg-[#FFF8DB] text-[#D97706] px-2 py-1 rounded-full border border-[#FDE68A] uppercase">
                    <i class="fa-solid fa-life-ring text-[8px]"></i>
                    HELP WANTED
                    </span>

                </div>

            </div>

            <div class="px-5 py-4 border-t border-gray-100 bg-gray-50/30">

                <p class="text-[10px] text-[#64748B] uppercase">
                #${issue.id} by ${issue.author}
                </p>

                <p class="text-[10px] text-[#64748B] mt-1">
                ${new Date(issue.createdAt).toLocaleDateString('en-US')}
                </p>

            </div>

        </div>

        `;

    }).join('');
}

// Filter issues based on status
function filterIssues(status, btn) {

    document.querySelectorAll('.tab-btn').forEach(b => {

        b.classList.remove('bg-[#4A00FF]', 'text-white');
        b.classList.add('text-gray-500', 'border', 'border-gray-300');

    });

    btn.classList.add('bg-[#4A00FF]', 'text-white');
    btn.classList.remove('text-gray-500', 'border', 'border-gray-300');


    const filtered =
        status === 'all'
        ? allIssues
        : allIssues.filter(issue => issue.status.toLowerCase() === status);

    renderCards(filtered);
}

// Live search functionality using API & loader implementation
searchInput.addEventListener('input', async (e) => {

    const query = e.target.value.trim();

    if(query === ""){
        renderCards(allIssues);
        return;
    }

    loader.classList.remove('hidden');

    try {

        const res = await fetch(`${API}/issues/search?q=${query}`);
        const result = await res.json();

        renderCards(result.data);

    } catch (err) {

        container.innerHTML = `
        <p class="col-span-full text-center text-red-500 font-bold">
        Search failed.
        </p>`;

    }

    loader.classList.add('hidden');

});

// Open Modal with Issue Details
async function openModal(id) {

    const modal = document.getElementById('issueModal');
    const modalContent = document.getElementById('modalContent');

    modal.classList.remove('hidden');

    modalContent.innerHTML = `
    <p class="text-center py-10 font-bold text-gray-400 animate-pulse">
    Fetching details...
    </p>`;

    try {

        const res = await fetch(`${API}/issue/${id}`);
        const result = await res.json();

        const issue = result.data;

        modalContent.innerHTML = `

        <h2 class="text-3xl font-bold text-black mb-3">
        ${issue.title}
        </h2>

        <div class="flex items-center gap-3 mb-6 text-sm font-medium text-gray-500">

            <span class="px-3 py-1 bg-[#00A96E] text-white rounded-full">
            Opened
            </span>

            <span>&bull;</span>

            <span>
            Opened by <span class="text-[#64748B]">${issue.author}</span>
            </span>

            <span>&bull;</span>

            <span>
            ${new Date(issue.createdAt).toLocaleDateString('en-GB')}
            </span>

        </div>


        <div class="flex gap-2 mb-8">

            <span class="text-[10px] bg-[#FEECEC] text-[#EF4444] px-3 py-2 rounded-full border border-[#FECACA] uppercase">
            <i class="fas fa-bug"></i> ${issue.category}
            </span>

            <span class="text-[10px] bg-[#FFF8DB] text-[#D97706] px-3 py-2 rounded-full border border-[#FDE68A] uppercase">
            <i class="fa-solid fa-life-ring"></i> HELP WANTED
            </span>

        </div>


        <p class="text-gray-600 mb-8 text-lg">
        ${issue.description}
        </p>


        <div class="grid grid-cols-2 gap-8 p-6 bg-[#F8FAFC] rounded-xl">

            <div>
                <p class="text-gray-400 mb-2">
                Assignee:
                </p>

                <p class="font-bold text-lg">
                ${issue.author}
                </p>
            </div>


            <div>
                <p class="text-gray-400 mb-2">
                Priority:
                </p>

                <span class="px-4 py-1 bg-[#EF4444] text-white rounded-full uppercase">
                ${issue.priority}
                </span>
            </div>

        </div>
        `;

    } catch (err) {

        modalContent.innerHTML = `
        <p class="text-red-500 font-bold text-center">
        Failed to load issue details.
        </p>`;

    }

}

// Close Modal function
function closeModal(){
    document.getElementById('issueModal').classList.add('hidden');
}


// close when clicking outside modal
document.getElementById('issueModal').addEventListener('click', function(e){

    if(e.target.id === "issueModal"){
        closeModal();
    }

});

// Page load - fetch and display all issues 
window.onload = fetchIssues;