// quiz/scripts.js

// Function to load questions from Local Storage
function loadQuestions() {
    const savedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    const questionsContainer = document.getElementById('questionsContainer');
    const progress = document.getElementById('progress');

    if (savedQuestions.length === 0) {
        questionsContainer.innerHTML = '<p>No questions available. Please contact the admin.</p>';
        return;
    }

    savedQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';

        const questionTitle = document.createElement('h3');
        questionTitle.innerText = `${index + 1}. ${q.question}`;
        questionDiv.appendChild(questionTitle);

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';

        q.options.forEach(option => {
            const optionLabel = document.createElement('label');
            optionLabel.innerHTML = `
                <input type="radio" name="question${index}" value="${option}" required>
                ${option}
            `;
            optionsDiv.appendChild(optionLabel);
        });

        questionDiv.appendChild(optionsDiv);
        questionsContainer.appendChild(questionDiv);
    });

    // Initialize progress bar
    updateProgress();
}

// Function to handle quiz submission
function handleQuizSubmit(event) {
    event.preventDefault();
    const results = [];
    const savedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    const progress = document.getElementById('progress');

    savedQuestions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            results.push({
                question: q.question,
                selectedAnswer: selectedOption.value,
                correctAnswer: q.answer,
                isCorrect: selectedOption.value === q.answer
            });
        }
    });

    displayResults(results);
    // Reset progress bar after submission
    progress.style.width = '100%';
}

// Function to display quiz results
function displayResults(results) {
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    let score = results.filter(r => r.isCorrect).length;
    resultDiv.innerHTML = `<h2>Your Score: ${score} out of ${results.length}</h2>`;
    results.forEach((r, index) => {
        const resultText = document.createElement('p');
        resultText.innerHTML = `<strong>Q${index + 1}:</strong> ${r.question}<br>
                                 <strong>Your Answer:</strong> ${r.selectedAnswer} <br>
                                 <strong>Correct Answer:</strong> ${r.correctAnswer} ${r.isCorrect ? '✅' : '❌'}`;
        resultDiv.appendChild(resultText);
    });
}

// Function to update progress bar based on answered questions
function updateProgress() {
    const savedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    const progress = document.getElementById('progress');
    const totalQuestions = savedQuestions.length;

    // Function to calculate progress
    const calculateProgress = () => {
        let answered = 0;
        savedQuestions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption) answered++;
        });
        let percentage = (answered / totalQuestions) * 100;
        progress.style.width = `${percentage}%`;
    };

    // Attach event listeners to all radio buttons to update progress on selection
    savedQuestions.forEach((q, index) => {
        const radioButtons = document.querySelectorAll(`input[name="question${index}"]`);
        radioButtons.forEach(rb => {
            rb.addEventListener('change', calculateProgress);
        });
    });

    // Initial progress calculation
    calculateProgress();
}

// Attach event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadQuestions();
    document.getElementById('quizForm').addEventListener('submit', handleQuizSubmit);
});
// quiz/scripts.js

// Function to handle quiz submission
function handleQuizSubmit(event) {
    event.preventDefault();
    const results = [];
    const savedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    const loggedInUser = localStorage.getItem('loggedInUser');
    const quizName = "General Knowledge Quiz"; // You can modify this based on your quiz

    let totalScore = savedQuestions.length;
    let obtainedScore = 0;

    savedQuestions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            const isCorrect = selectedOption.value === q.answer;
            results.push({
                question: q.question,
                selectedAnswer: selectedOption.value,
                correctAnswer: q.answer,
                isCorrect: isCorrect
            });
            if (isCorrect) obtainedScore++;
        }
    });

    // Display Results
    displayResults(obtainedScore, totalScore, results);

    // Save Score to Local Storage
    const userScores = JSON.parse(localStorage.getItem('userScores')) || [];
    const currentDate = new Date().toLocaleString();
    userScores.push({
        username: loggedInUser,
        quizName: quizName,
        score: obtainedScore,
        total: totalScore,
        date: currentDate
    });
    localStorage.setItem('userScores', JSON.stringify(userScores));
}

// Function to display results (update accordingly)
function displayResults(obtainedScore, totalScore, results) {
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `<h2>Your Score: ${obtainedScore} out of ${totalScore}</h2>`;
    results.forEach((r, index) => {
        const resultText = document.createElement('p');
        resultText.innerHTML = `<strong>Q${index + 1}:</strong> ${r.question}<br>
                                 <strong>Your Answer:</strong> ${r.selectedAnswer} <br>
                                 <strong>Correct Answer:</strong> ${r.correctAnswer} ${r.isCorrect ? '✅' : '❌'}`;
        resultDiv.appendChild(resultText);
    });
}
// Function to handle quiz submission
function handleQuizSubmit(event) {
    event.preventDefault();
    const results = [];
    const savedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    const loggedInUser = localStorage.getItem('loggedInUser');
    const quizName = "General Knowledge Quiz"; // Modify as needed

    let totalScore = savedQuestions.length;
    let obtainedScore = 0;

    savedQuestions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            const isCorrect = selectedOption.value === q.answer;
            results.push({
                question: q.question,
                selectedAnswer: selectedOption.value,
                correctAnswer: q.answer,
                isCorrect: isCorrect
            });
            if (isCorrect) obtainedScore++;
        }
    });

    // Display Results
    displayResults(obtainedScore, totalScore, results);

    // Save Score to Local Storage
    const userScores = JSON.parse(localStorage.getItem('userScores')) || [];
    const currentDate = new Date().toLocaleString();
    userScores.push({
        username: loggedInUser,
        quizName: quizName,
        score: obtainedScore,
        total: totalScore,
        date: currentDate
    });
    localStorage.setItem('userScores', JSON.stringify(userScores));
}

// Function to display results
function displayResults(obtainedScore, totalScore, results) {
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `<h2>Your Score: ${obtainedScore} out of ${totalScore}</h2>`;
    results.forEach((r, index) => {
        const resultText = document.createElement('p');
        resultText.innerHTML = `<strong>Q${index + 1}:</strong> ${r.question}<br>
                                 <strong>Your Answer:</strong> ${r.selectedAnswer} <br>
                                 <strong>Correct Answer:</strong> ${r.correctAnswer} ${r.isCorrect ? '✅' : '❌'}`;
        resultDiv.appendChild(resultText);
    });
}
