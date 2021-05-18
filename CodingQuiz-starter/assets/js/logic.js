// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// variables to reference DOM elements
var startScreenEl = document.getElementById("start-screen");
var questionsEl = document.getElementById("questions");
var questionTextEl = document.getElementById("question-text");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var endScreenEl = document.getElementById("end-screen");

// sound effects
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

function startQuiz() {
  // HIDE START SCREEN SECTION
  // 1. create a variable to store the start-screen html element
  // 2. set atttribute class to 'hide' on the start screen element
  startScreenEl.setAttribute("class", "hide");

  // UNHIDE QUESTIONS SECTION
  // 1. set attribute class to 'show' to unhide questions section html element
  questionsEl.setAttribute("class", "show");

  // START TIMER
  // 1. call setInterval method, passing in a callback function and an interval value of 1000 as input arguments
  // 2. store the returned id to the global variable timerId
  timerId = setInterval(CLOCK$$TICK, 1000);

  // SHOW STARTING TIME ON HTML TIMER ELEMENT
  timerEl.textContent = time;

  ASK$$QUESTIONS();
}

function ASK$$QUESTIONS() {
  // GET CURRENT QUESTION OBJECT FROM ARRAY WITH THE GLOBAL INDEX VARIABLE
  console.log("hi");
  var currentQuestion = questions[currentQuestionIndex];

  // UPDATE QUESTION ON HMTL QUESTION ELEMENT
  questionTextEl.textContent = currentQuestion.title;

  // CLEAR OUT OLD QUESTION CHOICES ON HTML CHOICES ELEMENT
  choicesEl.innerHTML = "";

  // LOOP OVER CHOICES ARRAY
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    // CREATE NEW BUTTON HTML ELEMENT FOR EACH CHOICE
    var a = document.createElement('button');

    // ADD A CLASS ATTRIBUTE ON THIS BUTTON AND SET IT TO 'CHOICE'
    a.setAttribute('class', 'choice');

    // ADD A VALUE ATTRIBUTE ON THIS BUTTON AND SET IT TO THE CURRENT CHOICE FROM ARRAY
    a.value = currentQuestion.choices[i];

    // SET TEXT CONTEXT OF THIS BUTTON TO THE CURRENT CHOICE FROM ARRAY
    a.textContent = currentQuestion.choices[i];

    // ADD EVENT LISTENER ON 'CLICK' TO THIS BUTTON, PASSING IN EVENT CALLBACK FUNCTION, USER$$CHOICE$$CB
    a.onclick = USER$$CHOICE$$CB;

    // DISPLAY CHOICE ON THE PAGE BY APPENDING THIS BUTTON TO THE CHOICES ELEMENT
    choicesEl.append(a);

  };
}

// USER CHOICE EVENT CALLBACK FUNCTION
function USER$$CHOICE$$CB(event) {
  // CHECK IF USER CHOICE IS WRONG
  // 1. event target has the choice button element on which user clicked
  //    that button element has the value attribute to contain the choice user clicked
  //    console.log the event target to look for the where the value attribute is
  // 2. get the anwer to the current question
  // 3. compare these two variables to check if user choice is wrong
  console.log(event.target);
  console.log(this); // this = event.target

  if (event.target.value !== questions[currentQuestionIndex].answer) {
    // PENALIZE TIME BY SUBTRACTING 15 SECONDS FROM THE GLOBAL TIME VARIABLE
    time = time - 15;
    // IF TIME IS LESS THAN 0, MAKE IT EQUAL TO 0
    if (time < 0) { time=0; }

    // DISPLAY NEW TIME ON THE PAGE BY ASSIGNING TIME TO TEXT CONTEXT OF HTML TIMER ELEMENT
    timerEl.textContent = time;

    // OPTIONAL - PLAY "WRONG" SOUND EFFECT
    sfxWrong.play();

    // ASSIGN  "WRONG!" TO TEXT CONTENT OF HTML FEEDBACK ELEMENT
    feedbackEl.textContent = "Wrong!";

  } else {
    // OPTIONAL - PALY "RIGHT" SOUND EFFECT
    sfxRight.play();

    // ASSIGN "CORRECT!" TO TEXT CONTENT OF HTML FEEDBACK ELEMENT
    feedbackEl.textContent = "Correct!";
  }

  // FLASH RIGHT/WRONG FEEDBACK ON PAGE FOR HALF A SECOND
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // MOVE TO NEXT QUESTION BY INCREMENTING THE GLOBAL INDEX VARIABLE
  currentQuestionIndex = currentQuestionIndex +1;
  // CHEKC IF WE'VE RUN OUT OF QUESTIONS
  // 1. if we've run out, call quizEnd function
  // 2. else call ask questions funciton
  if (currentQuestionIndex == 4) { quizEnd(); }
  else { ASK$$QUESTIONS(); }
}

function quizEnd() {
  // STOP TIMER
  clearInterval(timerId);

  // SHOW END SCREEN
  // 1. get end screen html element and store it to a variable
  // 2. set class attribute to 'show' on this element variable to display end screen
  questionsEl.setAttribute("class", "hide");
  endScreenEl.setAttribute("class", "show");

  // SHOW FINAL SCORE
  // 1. get final score html element and store it to a variable
  // 2. set text content to the remaing time left on this element variable
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // HIDE QUESTIONS SECTION
  // set class attritube to 'hide' on html questions element


}

function CLOCK$$TICK() {
  // UPDATE TIME
  // 1. decrement time by 1
  // 2. set time to text content of html timer element
  time--;
  timerEl.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // GET INITIALS VALUE FROM INPUT ELEMENT AND STORE IT TO A VARIABLE
  var initials = initialsEl.value.trim();

  // MAKE SURE INITIALS IS NOT EMPTY
  if (initials !== "") {
    // GET SAVED SCORES FROM LOCAL STORAGE AND CONVERT IT AND STORE IT TO AN ARRAY VARIABLE
    // OR IF NOT ANY, SET IT TO EMPTY ARRAY


    // CREATE A NEW SCORE OBJECT FOR THE USER TO STORE SCORE AND INITIALS
    var newScore = {
      score: time,
      initials: initials
    };

    // SAVE TO LOCAL STORAGE
    // 1. push new score object to the scores array
    // 2. save updated scores array to local storage. do not forget to convert the object to string before saving it
    localStorage.setItem (saveHighscore)

    // REDIRECT TO HIGH SCORES HTML PAGE
    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
