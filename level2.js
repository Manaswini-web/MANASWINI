document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quizForm');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    quizForm.addEventListener('submit', createQuiz);
    loginForm.addEventListener('submit', loginUser);
    registerForm.addEventListener('submit', registerUser);
});

const showSection = (sectionId) => {
    const sections = document.querySelectorAll('main > section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
};

const addQuestion = () => {
    const questionsDiv = document.getElementById('questions');
    const questionHTML = `
        <div class="question">
            <label>Question:</label>
            <input type="text" class="questionText" required>
            <label>Options:</label>
            <input type="text" class="option" required>
            <input type="text" class="option" required>
            <input type="text" class="option" required>
            <input type="text" class="option" required>
            <label>Correct Answer:</label>
            <input type="text" class="correctAnswer" required>
        </div>`;
    questionsDiv.insertAdjacentHTML('beforeend', questionHTML);
};

const createQuiz = (event) => {
    event.preventDefault();
    const quizTitle = document.getElementById('quizTitle').value;
    const questionsDiv = document.getElementById('questions');
    const questions = [];
    questionsDiv.querySelectorAll('.question').forEach(questionDiv => {
        const questionText = questionDiv.querySelector('.questionText').value;
        const options = Array.from(questionDiv.querySelectorAll('.option')).map(input => input.value);
        const correctAnswer = questionDiv.querySelector('.correctAnswer').value;
        questions.push({ questionText, options, correctAnswer });
    });
    const quiz = { title: quizTitle, questions };
    saveQuiz(quiz);
};

const saveQuiz = (quiz) => {
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    quizzes.push(quiz);
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
    alert('Quiz created successfully!');
};

const loadQuizzes = () => {
    const quizListDiv = document.getElementById('quizList');
    quizListDiv.innerHTML = '';
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    quizzes.forEach((quiz, index) => {
        const quizHTML = `<div>
            <h3>${quiz.title}</h3>
            <button onclick="startQuiz(${index})">Start Quiz</button>
        </div>`;
        quizListDiv.insertAdjacentHTML('beforeend', quizHTML);
    });
};

const startQuiz = (quizIndex) => {
    showSection('quizTaking');
    const quizzes = JSON.parse(localStorage.getItem('quizzes'));
    const quiz = quizzes[quizIndex];
    document.getElementById('quizTitleDisplay').innerText = quiz.title;
    const quizContentDiv = document.getElementById('quizContent');
    quizContentDiv.innerHTML = '';
    quiz.questions.forEach((question, index) => {
        const questionHTML = `<div>
            <p>${question.questionText}</p>
            ${question.options.map((option, i) => `
                <input type="radio" name="question${index}" value="${option}">
                <label>${option}</label><br>
            `).join('')}
        </div>`;
        quizContentDiv.insertAdjacentHTML('beforeend', questionHTML);
    });
    const submitButton = `<button onclick="submitQuiz(${quizIndex})">Submit Quiz</button>`;
    quizContentDiv.insertAdjacentHTML('beforeend', submitButton);
};

const submitQuiz = (quizIndex) => {
    const quizzes = JSON.parse(localStorage.getItem('quizzes'));
    const quiz = quizzes[quizIndex];
    let score = 0;
    quiz.questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && selectedOption.value === question.correctAnswer) {
            score++;
        }
    });
    alert(`Your score is ${score} out of ${quiz.questions.length}`);
    showSection('quizzes');
};

const loginUser = (event) => {
    event.preventDefault();
    // Implement user login functionality here
    alert('Login functionality
