// scripts.js

// Hardcoded credentials for demonstration purposes
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'password123'
};

// Handle Admin Login
function handleAdminLogin(event) {
    event.preventDefault();
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        window.location.href = '../dashboard/index.html'; // Redirect to index.html
    } else {
        alert('Invalid admin username or password.');
    }
}

// Sample function to add a question from admin panel
function addQuestion(event) {
    event.preventDefault();

    const questionInput = document.getElementById('question').value;
    const optionsInput = [
        document.getElementById('option1').value,
        document.getElementById('option2').value,
        document.getElementById('option3').value,
        document.getElementById('option4').value,
    ];
    const answerInput = document.getElementById('answer').value;

    const questions = JSON.parse(localStorage.getItem('questions')) || [];
    questions.push({
        question: questionInput,
        options: optionsInput,
        answer: answerInput
    });

    localStorage.setItem('questions', JSON.stringify(questions));
    
    alert('Question added successfully!');
    // Optionally clear inputs after submission
    document.getElementById('addQuestionForm').reset();
}

// Event listener for the add question form
document.getElementById('addQuestionForm').addEventListener('submit', addQuestion);
// admin_panel/scripts.js

// Function to generate a unique ID for each question
function generateUniqueId() {
    return 'q_' + Date.now();
}

// Function to add or update a question
function handleAddOrUpdateQuestion(event) {
    event.preventDefault();

    const questionId = document.getElementById('questionId').value;
    const questionText = document.getElementById('question').value.trim();
    const option1 = document.getElementById('option1').value.trim();
    const option2 = document.getElementById('option2').value.trim();
    const option3 = document.getElementById('option3').value.trim();
    const option4 = document.getElementById('option4').value.trim();
    const correctAnswer = document.getElementById('correctAnswer').value.trim();

    // Validate inputs
    if (!questionText || !option1 || !option2 || !option3 || !option4 || !correctAnswer) {
        alert('Please fill in all fields.');
        return;
    }

    // Retrieve existing questions from Local Storage
    let questions = JSON.parse(localStorage.getItem('questions')) || [];

    if (questionId) {
        // Editing existing question
        const questionIndex = questions.findIndex(q => q.id === questionId);
        if (questionIndex !== -1) {
            questions[questionIndex] = {
                id: questionId,
                question: questionText,
                options: [option1, option2, option3, option4],
                answer: correctAnswer
            };
            alert('Question updated successfully!');
        } else {
            alert('Question not found.');
            return;
        }
    } else {
        // Adding new question
        const newQuestion = {
            id: generateUniqueId(),
            question: questionText,
            options: [option1, option2, option3, option4],
            answer: correctAnswer
        };
        questions.push(newQuestion);
        alert('Question added successfully!');
    }

    // Save updated questions back to Local Storage
    localStorage.setItem('questions', JSON.stringify(questions));

    // Reset the form
    document.getElementById('addQuestionForm').reset();
    document.getElementById('questionId').value = '';
    document.getElementById('submitBtn').innerText = 'Add Question';
    document.getElementById('cancelEditBtn').style.display = 'none';

    // Refresh the questions list
    displayQuestions();
}

// Function to display all existing questions
function displayQuestions() {
    const questionsList = document.getElementById('questionsList');
    const questions = JSON.parse(localStorage.getItem('questions')) || [];

    // Clear existing list
    questionsList.innerHTML = '';

    if (questions.length === 0) {
        questionsList.innerHTML = '<p>No questions available. Please add some questions.</p>';
        return;
    }

    // Create a list of questions
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-item';

        const questionText = document.createElement('p');
        questionText.innerHTML = `<strong>Q${index + 1}:</strong> ${q.question}`;
        questionDiv.appendChild(questionText);

        const optionsList = document.createElement('ul');
        q.options.forEach(option => {
            const optionItem = document.createElement('li');
            optionItem.innerText = option;
            optionsList.appendChild(optionItem);
        });
        questionDiv.appendChild(optionsList);

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'actions';

        // Modify Button
        const modifyBtn = document.createElement('button');
        modifyBtn.innerText = 'Modify';
        modifyBtn.className = 'modify-btn';
        modifyBtn.onclick = () => editQuestion(q.id);
        actionsDiv.appendChild(modifyBtn);

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => deleteQuestion(q.id);
        actionsDiv.appendChild(deleteBtn);

        questionDiv.appendChild(actionsDiv);
        questionsList.appendChild(questionDiv);
    });
}

// Function to edit a question
function editQuestion(questionId) {
    const questions = JSON.parse(localStorage.getItem('questions')) || [];
    const question = questions.find(q => q.id === questionId);

    if (!question) {
        alert('Question not found.');
        return;
    }

    // Populate the form with question data
    document.getElementById('questionId').value = question.id;
    document.getElementById('question').value = question.question;
    document.getElementById('option1').value = question.options[0];
    document.getElementById('option2').value = question.options[1];
    document.getElementById('option3').value = question.options[2];
    document.getElementById('option4').value = question.options[3];
    document.getElementById('correctAnswer').value = question.answer;

    // Change the submit button text
    document.getElementById('submitBtn').innerText = 'Update Question';
    document.getElementById('cancelEditBtn').style.display = 'inline-block';
}

// Function to delete a question
function deleteQuestion(questionId) {
    if (!confirm('Are you sure you want to delete this question?')) {
        return;
    }

    let questions = JSON.parse(localStorage.getItem('questions')) || [];
    questions = questions.filter(q => q.id !== questionId);
    localStorage.setItem('questions', JSON.stringify(questions));

    alert('Question deleted successfully!');
    displayQuestions();
}

// Function to cancel editing
function cancelEdit() {
    document.getElementById('addQuestionForm').reset();
    document.getElementById('questionId').value = '';
    document.getElementById('submitBtn').innerText = 'Add Question';
    document.getElementById('cancelEditBtn').style.display = 'none';
}

// Attach event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addQuestionForm').addEventListener('submit', handleAddOrUpdateQuestion);
    document.getElementById('cancelEditBtn').addEventListener('click', cancelEdit);
    displayQuestions();
});
