/* set variables */
const startBtn = document.querySelector("#startBtn");
const resetBtn = document.querySelector("#resetBtn");
const submitBtn = document.querySelector("#submitBtn");
const clearBtn = document.querySelector("#clearBtn");
const rules = document.querySelector("#quizRules");
const inputName = document.querySelector("#inputName");
const viewHighscore = document.querySelector("#viewHighscore");
const choiceA = document.querySelector("#choiceA");
const choiceB = document.querySelector("#choiceB");
const choiceC = document.querySelector("#choiceC");
const choiceD = document.querySelector("#choiceD");
const btnEle = document.querySelector(".btnEle");
const olEle = document.querySelector("#olEle");

const questionCont = document.querySelector("#questionCont");
const resultCont = document.querySelector("#resultCont");
const timerEl = document.querySelector("#timerEl");
const timeLeft = 60;
const currentIndex = 0;
const correct = 0;
const score = [];
const userScore = [];

/* quiz questions */
const questions = [
    {
        question: "How many Gen 1 Pokemon are there?", 
        answers: ["150", "160", "148", "151"], 
        correctAnswer: "151",
    },

    {
        question: "What Pokemon type is Gengar?", 
        answers: ["Ghost", "Poison Ghost", "Dark", "Poison"],
        correctAnswer: "Poison Ghost",
    },

    {
        question: "How many eeveelutions are therein Gen 1?", 
        answers: ["4", "8", "3", "5"],
        correctAnswer: "3",
    },

    {
        question: "How many fossil Pokemon are there in Gen 1? (excluding thier evolutions).", 
        answers: ["3", "2", "5", "4"],
        correctAnswer: "3",
    },

    {
        question: "How many legendary Pokemon are there in Gen 1? (including evolutions).", 
        answers: ["3", "5", "8", "4"],
        correctAnswer: "5",
    },

    {
        question: "What type of Pokemon is Tauros?", 
        answers: ["Normal", "Ground", "Rock", "Fighting"], 
        correctAnswer: "Normal",
    },

    {
        question: "How many Pokemon in Gen 1, don't have an evolution?", 
        answers: ["24", "22", "25", "21"],
        correctAnswer: "21",
    },

    {
        question: "Which of the following is NOT a Gen 1 eeveelution?", 
        answers: ["Fire", "Water", "Grass", "Electric"],
        correctAnswer: "Grass",
    },

    {
        question: "What Pokemon is number 100?", 
        answers: ["Voltorb", "Kingler", "Exeggcute", "Cubone"],
        correctAnswer: "Voltorb",
    },

    {
        question: "Which Pokemon is a Gen 1 legengary bird?", 
        answers: ["Pidgeot", "Fearow", "Articuno", "Dodrio"],
        correctAnswer: "Articuno",
    },
]

/* function to start quiz */
function startQuiz() {
    console.log("Start Quiz! Good Luck!");

    countdown();
    displayQuestion();
    quizCont.classList.remove("hide");
    rules.classList.add("hide");
    viewHighscore.classList.add("hide");
    resultCont.classList.remove("hide");
}

/* function to load highscores */
function init() {
    getHighScores();
}
init();

/* countdown function */
function countdown(){
    console.log("Starting Countdown");
    const timeInt = setInterval(function () {
        if (timeLeft > 1 && currentIndex == questions.length) {
            clearInterval(timeInt);
        } else if (timeLeft === 1) {
            timerEl.textContent = timeLeft + "  seconds remaining";
            timeLeft--;
        } else {
            timerEl.textContent = " ";
            clearInterval(timeInt);
            gameOver();
        }
    }, 1000);
}

/* function to display question */ 
function displayQuestion() {
    console.log(currentIndex);
    if (questions.length > currentIndex) {
        questionCont.innerHTML = questions[currentIndex].question;
        console.log(questions[currentIndex].question);

        choiceA.innerHTML = questions[currentIndex].answers[0];
        console.log(choiceA.innerHTML);

        
        choiceB.innerHTML = questions[currentIndex].answers[1];
        console.log(choiceB.innerHTML);

        
        choiceC.innerHTML = questions[currentIndex].answers[2];
        console.log(choiceC.innerHTML);

        
        choiceD.innerHTML = questions[currentIndex].answers[3];
        console.log(choiceD.innerHTML);
    } else {
        console.log("Game Over");
        gameOver();
    }
}

/* function to verify answers */

function verifyAnswer(event) {
    event.preventDefault(); 
    btnEle = event.target; 
    if (btnEle.innerHTML === questions[currentIndex].correctAnswer) {
        console.log("Correct!");
        currentIndex++;
        Correct++;
        displayQuestion();
    } else {
        console.log("Incorrect!");
        timeLeft -=3;
        currentIndex++;
        displayQuestion();
    }
}

/* gameOver function */
function gameOver() {
    console.log("Correct Answers: " + Correct);
    Score = timeLeft + Correct * 5;
    console.log("Your Score: " + Score);

    quizCont.classList.add("hide");
    viewHighscore.classList.add("hide");
    resultCont.classList.remove("hide");
}

/* function to get highscore */
function getHighScores() {
    const localUserScores = localStorage.getItem("Scores");
    if (localUserScores) {
        userScore = JSON.parse(localUserScores);
    } else {
        userScore = [];
    }
    olEle.textContent = " "; 
    for (i = 0; i < userScore.length; i++) {
        const li = document.createElement("li");
        li.textContent = userScore[i].user + " - " + userScore[i].score;
        olEle.appendChild(li);
    }
    return userScore;
}

function getHighScores(event) {
    event.preventDefault();

    const userName = inputName.value;
    console.log(userName);
    const saveScore = {
        user: userName,
        score: Score,
    };
    userScore.push(saveScore);

    localStorage.setItem("Scores", JSON.stringify(userScore));
    getHighScores();
    inputName.classList.add("hide");
    submitBtn.classList.add("hide");
}

function displayHighscore() {
    resultCont.classList.add("hide");
    inputName.classList.add("hide");
    submitBtn.classList.add("hide");
    resetBtn.classList.add("hide");
}

function clearBtn() {
    localStorage.clear();
    location.reload();
}

function resetQuiz() {
    location.reload();
}

/* adding event listeners */
startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", setHighScore);
resetBtn.addEventListener("click", resetQuiz);
clearBtn.addEventListener("click", clearScore);
viewHighscore.addEventListener("click", displayHighscore);
choiceA.addEventListener("click", verifyAnswer);
choiceB.addEventListener("click",verifyAnswer);
choiceC.addEventListener("click", verifyAnswer);
choiceD.addEventListener("click", verifyAnswer);
