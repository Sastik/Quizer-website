const countSound = new Audio("assets/count-down.mp3");
const nextSound = new Audio("assets/next.m4a");
const correctSound = new Audio("assets/correct.mp3");
const wrongSound = new Audio("assets/wrong.mp3");
const finishSound = new Audio("assets/finish.m4a");

let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 6;
let countdown;
let modal = document.getElementById("myModal");
let btn = document.getElementById("instruct_Btn");
let span = document.getElementsByClassName("close")[0];

//Questions and Options array
const quizArray = [
  {
    id: "0",
    question: "What does SDLC stands for?",
    options: [
      "System Design Life Cycle",
      " Software Design Life Cycle",
      "Software Development Life Cycle",
      "System Development Life cycle",
    ],
    correct: "Software Development Life Cycle",
  },
  {
    id: "1",
    question:
      "In which of the following formats data is stored in the database management system?",
    options: ["Image", "Text", "Table", "Graph"],
    correct: "Table",
  },
  {
    id: "2",
    question: "Which of the following is not an OOPS concept in Java?",
    options: ["Polymorphism", "Inheritance", "Compilation", "Encapsulation"],
    correct: "Compilation",
  },
  {
    id: "3",
    question: "Which of the following is a type of cyber attack?",
    options: [
      "Phishing",
      "SQL Injections",
      "Password Attack",
      "All of the above",
    ],
    correct: "All of the above",
  },
  {
    id: "4",
    question:
      "______________ is a set of one or more attributes taken collectively to uniquely identify a record",
    options: ["Primary Key", "Foreign key", "Super key", "Candidate key"],
    correct: "Super key",
  },
  {
    id: "5",
    question:
      "Which of the following is the Cloud Platform provided by Amazon?",
    options: ["AWS", "Cloudera", "Azure", "All of the mentioned"],
    correct: "AWS",
  },
  {
    id: "6",
    question: "Which of the following is an objective of network security?",
    options: [
      "Confidentiality",
      "Integrity",
      "Availability",
      "All of the above",
    ],
    correct: "All of the above",
  },
  {
    id: "7",
    question:
      " _________ is a software development life cycle model that is chosen if the development team has less experience on similar projects.",
    options: ["Iterative Enhancement Model", "RAD", "Spiral", "Waterfall"],
    correct: "Spiral",
  },
  {
    id: "8",
    question: "Which command is used to remove a relation from an SQL?",
    options: ["Drop table", "Delete", "Purge", "Remove"],
    correct: "Drop table",
  },
  {
    id: "9",
    question: "Which exception is thrown when java is out of memory?",
    options: [
      "MemoryError",
      "OutOfMemoryError",
      "MemoryOutOfBoundsException",
      "MemoryFullException",
    ],
    correct: "OutOfMemoryError",
  },
];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",

  (displayNext = () => {
    //increment questionCount
    countSound.pause();
    nextSound.play();
    questionCount += 1;

    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      countSound.pause();
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      finishSound.play();
      //user score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      // countSound.play();
      count = 6;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    countSound.play();
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      countSound.pause();
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    correctSound.play();
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    wrongSound.play();
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 6;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
