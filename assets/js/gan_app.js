
/** 
 * @param {number} randomNumber - Integer between 1 and 100 (inclusive).
 * @description Math.random() produces a float between 0 (inclusive) and 1 (exclusive).
 * Multiplying by 100 scales it to 0-99.99..., adding 1 shifts it to 1-100.99...,
 * and parseInt() truncates the decimal, resulting in an integer from 1 to 100.
 * 
 * @param {number} randomNumber - A new random number between 1 and 100.
 * @const {HTMLButtonElement | HTMLInputElement submit = The submit guess button.}
 * @const {HTMLButtonElement | HTMLInputElement userInput = The userInput input element.}
 * @const {HTMLButtonElement | HTMLInputElement guessSlot = The guessSlot -previous guesses element.}
 * @const {HTMLButtonElement | HTMLInputElement remaining = The remaining guesses element.}
 * @const {HTMLButtonElement | HTMLInputElement startOver = The start over button.}
 * @const {HTMLButtonElement | HTMLInputElement lowOrHi = The lowOrHi element.}
 * @const {HTMLButtonElement | HTMLInputElement p = p element.}
 * @param {text} placesreviousGuesses - All previous guesses separated by a space.
 * @param {number} numGuesses - Number of guesses made
 * @param {boolean} playGame - True or false for game being played
*/
let randomNumber = parseInt((Math.random()*100)+1);
const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const startOver = document.querySelector('.resultParas');
const lowOrHi = document.querySelector('.lowOrHi');
const p = document.createElement('p');
let previousGuesses = [];
let numGuesses = 1;
let playGame = true;
/** 
 * @description This is the listener to get a guess and call the validateGuess function.
 * @param {integer} guess - The current number guess
 * @param {boolean} playGame - True or false for game being played
*/
if (playGame){
    subt.addEventListener('click', function(e){
        e.preventDefault();
        /**Grab guess from user  */
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}
/** 
 * @description This is the validateGuess function.
 * It lets you guess up to 10 times
 * You should guess by halfs, like this
 * 50 too low, 50 + (100-50)/2 = 75 too low, 
 * 75 + (100-75)/2 = 87 too high
 * 75 + (87-75)/2 = 81 too low, etc.
 * The function checks for guesses than are not a number, < 1, > 100
 * and displays alerts.
 * @constructor
 * @param {integer} guess - The current number guess
 * @param {number} numGuesses - Number of guesses made
*/

function validateGuess(guess){
    if (isNaN(guess)){
        alert('Please enter a valid number');
    } else if (guess < 1) {
        alert('Please enter a number greater than 1!');
    } else if (guess > 100){
        alert('Please enter a number less than 500!')
    } else {
        /** Keep record of number of attempted guesses  */
        previousGuesses.push(guess);
        /** Check to see if game is over  */
        if (numGuesses === 11){
            displayGuesses(guess);
            displayMessage(`Game Over! Number was ${randomNumber}`);
            endGame();
        } else {
        /** Display previous guessed numbers  */
        displayGuesses(guess);
        /** Check guess and display if wrong  */
        checkGuess(guess);
        }
    }
}
/** 
 * @description This is the checkGuess function.
 * The function checks for guesses than are 
 * too high, too low, or correct and displays messages
 * and displays alerts.
 * @constructor
 * @param {integer} guess - The current number guess
*/
function checkGuess(guess){
    /** Display clue if guess is too high or too low  */
    if (guess === randomNumber){
        displayMessage(`You guessed correctly!`);
        endGame();
    } else if (guess < randomNumber) {
        displayMessage(`Too low! Try again!`);
    } else if (guess > randomNumber) {
        displayMessage(`Too High! Try again!`);
    }
}
/** 
 * @description This is the displayGuesses function.
 * The function checks for guesses than are 
 * too high, too low, or correct and displays messages
 * and displays alerts.
 * @constructor
 * @param {integer} guess - The current number guess
 * @param {number} numGuesses - Number of guesses made
*/

function displayGuesses(guess){
    userInput.value = '';
    guessSlot.innerHTML += `${guess}  `;
    numGuesses++
    remaining.innerHTML = `${11 - numGuesses}  `;
}
/** 
 * @description This is the displayMessage function.
 * It displays the message passed to it.
 * @constructor
 * @param {text} message - The message to display
*/
function displayMessage(message){
        lowOrHi.innerHTML = `<h1>${message}</h1>`
}

/** 
 * @description This is the endGame function.  
 * This disables the user input button
 * and displays the Start New Game button.
 * playgame is set to false
 * 
 * @const {HTMLButtonElement | HTMLInputElement userInput = The userInput input element.}
 * @const {HTMLButtonElement | HTMLInputElement p = p element.}
 * @param {boolean} playGame - True or false for game being played
*/
function endGame(){
    /** Clear user input */
    userInput.value = '';
    /** Disable user input button */
    userInput.setAttribute('disabled', '');
    /** Display Start new Game Button */
          p.classList.add('button');
          p.innerHTML = `<h1 style="line-height: 1.25"; id="newGame">Start New Game</h1>`
    startOver.appendChild(p);
    playGame = false;
    newGame();
}
/** 
 * @description This is the newGame function.  
 * This enables the user input button
 * and removes the Start New Game button.
 * playgame is set to true
 * @const {HTMLButtonElement | HTMLInputElement userInput = The userInput input element.}
 * @const {HTMLButtonElement | HTMLInputElement guessSlot = The guessSlot -previous guesses element.}
 * @const {HTMLButtonElement | HTMLInputElement remaining = The remaining guesses element.}
 * @const {HTMLButtonElement | HTMLInputElement startOver = The start over button.}
 * @const {HTMLButtonElement | HTMLInputElement lowOrHi = The lowOrHi element.}
 * @const {HTMLButtonElement | HTMLInputElement p = p element.}
 * @param {text} placesreviousGuesses - All previous guesses separated by a space.
 * @param {number} randomNumber - A new random number between 1 and 100.
 * @param {number} numGuesses - Number of guesses made
 * @param {boolean} playGame - True or false for game being played
*/
function newGame(){
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function(){
        /** Pick a new random number */
        randomNumber = parseInt((Math.random()*100)+1);
        previousGuesses = [];
        numGuesses = 1;
        guessSlot.innerHTML = '';
        lowOrHi.innerHTML = '';
        remaining.innerHTML = `${11 - numGuesses}  `;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;
    })
}