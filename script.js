document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Navigation Toggle ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            mainNav.style.display = mainNav.style.display === 'block' ? 'none' : 'block';
        });
    }

    // --- Page specific logic ---
    const page = document.body.className || document.title.split('|')[0].trim().toLowerCase();

    if (document.querySelector('.dashboard')) {
        initDashboard();
    }
    
    if (document.querySelector('.quiz-container')) {
        initQuiz();
    }
});


// =================================================================
// --- DASHBOARD LOGIC ---
// =================================================================

function initDashboard() {
    // --- Mock Data (in a real app, this would come from a server/API) ---
    const userData = {
        username: 'Mayank Acharya',
        level: 'Level 5 Recycler',
        ecoPoints: 1250,
        questsCompleted: 15
    };

    const quests = [
        { id: 1, icon: '💧', title: 'Take a 5-minute shower', points: 20, completed: true },
        { id: 2, icon: '♻️', title: 'Segregate waste for a day', points: 30, completed: true },
        { id: 3, icon: '💡', title: 'Use natural light instead of bulbs for 2 hours', points: 25, completed: false },
        { id: 4, icon: '🛍️', title: 'Use a reusable bag for shopping', points: 15, completed: false }
    ];

    const badges = [
        { id: 1, icon: '🌱', name: 'First Step', earned: true },
        { id: 2, icon: '♻️', name: 'Recycle Rookie', earned: true },
        { id: 3, icon: '💧', name: 'Water Saver', earned: true },
        { id: 4, icon: '🌳', name: 'Tree Planter', earned: false },
        { id: 5, icon: '⚡️', name: 'Energy Saver', earned: true },
        { id: 6, icon: '🌍', name: 'Planet Hero', earned: false }
    ];

    const leaderboardData = [
        { rank: 1, name: 'Dibyajeet Mohanty', points: 1500 },
        { rank: 2, name: 'Mayank Acharya', points: 1250 },
        { rank: 3, name: 'Jasmin', points: 1100 },
        { rank: 4, name: 'Ayush', points: 950 },
        { rank: 5, name: 'Prateek Das', points: 800 }
    ];


    // --- Functions to render dynamic content ---

    function renderUserProfile() {
        document.getElementById('username').textContent = userData.username;
        document.querySelector('.user-level').textContent = userData.level;
        document.getElementById('eco-points').textContent = userData.ecoPoints.toLocaleString();
        document.getElementById('quests-completed').textContent = userData.questsCompleted;
    }

    function renderQuests() {
        const container = document.getElementById('quests-container');
        if (!container) return;
        container.innerHTML = quests.map(quest => `
            <div class="quest-item">
                <div class="quest-icon">${quest.icon}</div>
                <div class="quest-details">
                    <p>${quest.title}</p>
                    <span>+${quest.points} Eco-Points</span>
                </div>
                <div class="quest-action">
                    <button class="btn ${quest.completed ? 'completed' : 'btn-primary'}" data-quest-id="${quest.id}" ${quest.completed ? 'disabled' : ''}>
                        ${quest.completed ? 'Done' : 'Complete'}
                    </button>
                </div>
            </div>
        `).join('');
    }

    function renderBadges() {
        const container = document.getElementById('badges-container');
        if (!container) return;
        container.innerHTML = badges.map(badge => `
            <div class="badge ${badge.earned ? 'earned' : ''}" title="${badge.name}">
                ${badge.icon}
                <span class="tooltip">${badge.name} ${badge.earned ? '(Earned)' : '(Locked)'}</span>
            </div>
        `).join('');
    }

    function renderLeaderboard() {
        const list = document.getElementById('leaderboard-list');
        if (!list) return;
        list.innerHTML = leaderboardData.map(user => `
            <li>
                <span class="rank">${user.rank}</span>
                <span class="name">${user.name}</span>
                <span class="points">${user.points.toLocaleString()} pts</span>
            </li>
        `).join('');
    }

    // --- Event Listeners ---
    const questsContainer = document.getElementById('quests-container');
    if (questsContainer) {
        questsContainer.addEventListener('click', function(e) {
            if (e.target.matches('.btn-primary')) {
                const button = e.target;
                const questId = parseInt(button.dataset.questId);
                const quest = quests.find(q => q.id === questId);

                if (quest) {
                    quest.completed = true;
                    userData.ecoPoints += quest.points;
                    userData.questsCompleted++;
                    
                    // Re-render to show updates
                    renderUserProfile();
                    renderQuests(); 
                }
            }
        });
    }

    // --- Initial Render ---
    renderUserProfile();
    renderQuests();
    renderBadges();
    renderLeaderboard();
}

// =================================================================
// --- QUIZ LOGIC ---
// =================================================================
function initQuiz() {
    const quizData = [
        { question: "Which gas is most responsible for global warming?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Carbon Dioxide" },
        { question: "Which renewable energy comes from sunlight?", options: ["Solar", "Wind", "Hydro", "Geothermal"], answer: "Solar" },
        { question: "What percentage of Earth’s water is drinkable?", options: ["10%", "5%", "1%", "25%"], answer: "1%" },
        { question: "Which of these is biodegradable?", options: ["Plastic bottle", "Banana peel", "Glass jar", "Aluminum can"], answer: "Banana peel" }
    ];

    let currentQuestion = 0;
    let score = 0;

    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options");
    const scoreText = document.getElementById("score");
    const nextBtn = document.getElementById("next-btn");

    function loadQuestion() {
        const q = quizData[currentQuestion];
        questionText.innerText = q.question;
        optionsContainer.innerHTML = "";
        
        q.options.forEach(option => {
            const btn = document.createElement("button");
            btn.innerText = option;
            btn.classList.add("option-btn");
            btn.addEventListener('click', () => checkAnswer(option, btn));
            optionsContainer.appendChild(btn);
        });

        scoreText.innerText = `Score: ${score}/${quizData.length}`;
        nextBtn.style.display = 'none';
    }

    function checkAnswer(selected, btn) {
        const correct = quizData[currentQuestion].answer;
        const allOptions = optionsContainer.querySelectorAll('.option-btn');

        allOptions.forEach(opt => {
            opt.disabled = true; // Disable all options after one is clicked
            if (opt.innerText === correct) {
                opt.classList.add('correct');
            } else if (opt.innerText === selected) {
                 opt.classList.add('incorrect');
            }
        });

        if (selected === correct) {
            score++;
        }
        
        scoreText.innerText = `Score: ${score}/${quizData.length}`;
        nextBtn.style.display = 'block';
    }

    nextBtn.addEventListener('click', () => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            questionText.innerText = "🎉 Quiz Finished!";
            optionsContainer.innerHTML = `<p>Your final score is ${score} out of ${quizData.length}. Well done!</p>`;
            nextBtn.style.display = 'none';
        }
    });

    loadQuestion();
}