const questions = {
    easy: [
        { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
        { question: "What color is the sky?", options: ["Blue", "Green", "Red", "Yellow"], answer: "Blue" },
        { question: "How many legs does a spider have?", options: ["6", "8", "10", "12"], answer: "8" },
        { question: "Which is the largest planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Jupiter" },
        { question: "What is 10 - 5?", options: ["2", "5", "6", "7"], answer: "5" },
        { question: "Which animal says 'Meow'?", options: ["Dog", "Cat", "Cow", "Bird"], answer: "Cat" },
        { question: "How many sides does a triangle have?", options: ["2", "3", "4", "5"], answer: "3" },
        { question: "Which fruit is yellow and curved?", options: ["Apple", "Banana", "Grapes", "Pineapple"], answer: "Banana" },
        { question: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: "Pacific" },
        { question: "What is the color of grass?", options: ["Red", "Blue", "Green", "Yellow"], answer: "Green" }
    ],
    medium: [
        { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
        { question: "Who painted the Mona Lisa?", options: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"], answer: "Da Vinci" },
        { question: "What is the boiling point of water in Celsius?", options: ["90°C", "100°C", "110°C", "120°C"], answer: "100°C" },
        { question: "Who discovered America?", options: ["Columbus", "Magellan", "Cook", "Vasco da Gama"], answer: "Columbus" },
        { question: "Which gas do plants absorb from the air?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Carbon Dioxide" },
        { question: "What is the capital of Japan?", options: ["Seoul", "Tokyo", "Beijing", "Bangkok"], answer: "Tokyo" },
        { question: "Which metal is used to make coins?", options: ["Copper", "Silver", "Gold", "Iron"], answer: "Copper" },
        { question: "How many continents are there?", options: ["5", "6", "7", "8"], answer: "7" },
        { question: "What is the fastest land animal?", options: ["Cheetah", "Lion", "Tiger", "Horse"], answer: "Cheetah" },
        { question: "Who wrote Romeo and Juliet?", options: ["Shakespeare", "Hemingway", "Dickens", "Austen"], answer: "Shakespeare" }
    ],
    hard: [
        { question: "What is the square root of 144?", options: ["10", "12", "14", "16"], answer: "12" },
        { question: "Who discovered gravity?", options: ["Newton", "Einstein", "Galileo", "Darwin"], answer: "Newton" },
        { question: "What is the chemical symbol for Gold?", options: ["Au", "Ag", "Fe", "Pb"], answer: "Au" },
        { question: "How many bones are in the human body?", options: ["200", "206", "212", "220"], answer: "206" },
        { question: "What is the smallest planet in our solar system?", options: ["Mercury", "Venus", "Mars", "Pluto"], answer: "Mercury" },
        { question: "Who developed the theory of relativity?", options: ["Newton", "Tesla", "Einstein", "Bohr"], answer: "Einstein" },
        { question: "Which country has the most population?", options: ["USA", "India", "China", "Russia"], answer: "China" },
        { question: "What is the capital of Canada?", options: ["Toronto", "Vancouver", "Ottawa", "Montreal"], answer: "Ottawa" },
        { question: "Which is the hardest natural substance?", options: ["Gold", "Diamond", "Iron", "Granite"], answer: "Diamond" },
        { question: "How many hearts does an octopus have?", options: ["1", "2", "3", "4"], answer: "3" }
    ]
};

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;
let difficulty = "easy";

function startQuiz(selectedDifficulty) {
    difficulty = selectedDifficulty;
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("quiz-container").classList.remove("hidden");
    loadQuestion();
}

function startTimer() {
    timeLeft = 10;
    document.getElementById("time").innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").innerText = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            document.getElementById("timeout-sound").play();
            nextQuestion();
        }
    }, 1000);
}

function loadQuestion() {
    clearInterval(timer);
    startTimer();
    let questionObj = questions[difficulty][currentQuestionIndex];
    document.getElementById("question").innerText = questionObj.question;
    
    let optionsHTML = "";
    questionObj.options.forEach(option => {
        optionsHTML += `<li onclick="checkAnswer(this, '${option}')">${option}</li>`;
    });

    document.getElementById("options").innerHTML = optionsHTML;
    document.getElementById("next").classList.add("hidden");
}

function checkAnswer(selectedElement, selectedOption) {
    let correctAnswer = questions[difficulty][currentQuestionIndex].answer;
    clearInterval(timer);

    if (selectedOption === correctAnswer) {
        selectedElement.classList.add("correct");
        score += 10;
        document.getElementById("correct-sound").play();
    } else {
        selectedElement.classList.add("wrong");
        document.getElementById("wrong-sound").play();
    }

    document.getElementById("next").classList.remove("hidden");
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < 10) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timer);
    let playerName = prompt("Quiz Over! Enter your name for the leaderboard:");
    if (playerName) {
        saveScore(playerName, score);
    }
    displayLeaderboard();
}

function saveScore(name, score) {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ name, score });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function displayLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    let leaderboardHTML = "";
    leaderboard.forEach(entry => {
        leaderboardHTML += `<li>${entry.name}: ${entry.score}</li>`;
    });
    document.getElementById("leaderboard").innerHTML = leaderboardHTML;
}

function clearLeaderboard() {
    localStorage.removeItem("leaderboard");  // Deletes stored leaderboard data
    document.getElementById("leaderboard").innerHTML = "";  // Clears displayed leaderboard
    alert("Leaderboard cleared!");
}

window.onload = displayLeaderboard;
