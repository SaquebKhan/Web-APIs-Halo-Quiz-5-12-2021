// declare all variables
// declair variables to keep track of quiz statement (q index, time, time variables)
// variables to reference DOM elements
//var questions = document.getElementsbyID(“”)
// create startQuiz function to sart qiuz
// put timer stuff in here and run function to get tiyr quiz item
// create function to render questions for the user
function get(){
    // get current questions object from the array
    // update your HTML with current question
    // clear out any old question choices
    // loop over our choices and create new button for new choices
        // check out .forEach (do not need for loop)
    // attach click event listener to each choice
    choice.onclick = q = qClick
    // display questions on page
}
// function for question clicked
function qClicked() {

 
    // check if user answered wrong question
    // you can decrement time if user is wrong
    // create if to check if time hit 0 or time is still remaining
    if (time < 0)
        time = 0,
    } 
    // display time on page
    // check if answer is correct, if correct move on to give gif
    // move to next question
    // check if we’re out of questions
    // if out of questions run endQuiz function else get next question
    if (currentQIndex === question.length)
        quizEnd();
        else {
            end();
        }
}
// create functiont to end quiz
// clear time interval
// show a end quiz page
// shoe user final score
// check out methods .hide() and .show
// if time hits 0, run end function
// function to run time
// tume--
// display timer on page
// if time hits 0 run end Q()
// create function for high score
// write any function to check how many questions user for right & perform your marth or hardCode to display user score
// check to maje sure usre inputs user name/initials into user prompt
// save highscores to local storage
// retrieve high scores from local storage
// creaye a new object to store users score fr the high score page
// redirect to the highscores page (hint: window.location.href)