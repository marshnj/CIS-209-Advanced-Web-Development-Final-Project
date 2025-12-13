// ------------------------------------------------------------
// Tic-Tac-Toe Game Script
// ------------------------------------------------------------

/**
 * Collection of all tic-tac-toe board cells.
 * @type {HTMLElement[]}
 */
let boxes = [...document.querySelectorAll('.box')];

/**
 * Button that resets the game board.
 * @type {HTMLElement}
 */
let resetBtn = document.querySelector('#reset');

/**
 * Button that starts a new game.
 * @type {HTMLElement}
 */
let newGameBtn = document.querySelector('#new-btn');

/**
 * Message container that becomes visible when a win/draw occurs.
 * @type {HTMLElement}
 */
let msgContainer = document.querySelector('.msg-container');

/**
 * Message display element for winner or draw text.
 * @type {HTMLElement}
 */
let msg = document.querySelector('#msg');

/**
 * Tracks current player's turn.
 * true = Player O, false = Player X
 * @type {boolean}
 */
let turnO = true;

/**
 * All win conditions represented as board index combinations.
 * @type {number[][]}
 */
const winPatterns = [
	[0, 1, 2],
	[0, 3, 6],
	[0, 4, 8],
	[1, 4, 7],
	[2, 5, 8],
	[2, 4, 6],
	[3, 4, 5],
	[6, 7, 8]
];

/**
 * Adds click event listeners to each box.
 * Each click places the current player's mark and checks for a winner.
 */
boxes.forEach((box) => {
	box.addEventListener('click', function() {

		// Place O or X depending on turn
		if (turnO) {
			box.innerText = 'O';
			box.style.color = 'green';
			turnO = false;
		} else {
			box.innerText = 'X';
			box.style.color = 'black';
			turnO = true;
		}

		// Prevent further clicks and evaluate the board
		box.disabled = true;
		checkWinner();
	});
});

/**
 * Enables all boxes and clears their displayed values.
 * Used when starting/resetting a game.
 * @returns {void}
 */
const enableBoxes = () => {
	for (let box of boxes) {
		box.disabled = false;
		box.innerText = "";
	}
};

/**
 * Disables all boxes to prevent further gameplay.
 * Used when someone wins.
 * @returns {void}
 */
const disableBoxes = () => {
	for (let box of boxes) {
		box.disabled = true;
	}
};

/**
 * Displays the winner message and disables the board.
 * @param {string} winner - The symbol ("O" or "X") of the winning player.
 * @returns {void}
 */
const showWinner = (winner) => {
	msg.innerText = `Congratulations, Winner is ${winner}`;
	msgContainer.classList.remove('hide');
	disableBoxes();
};

/**
 * Checks the game board for a win or a draw.
 * Evaluates all win patterns and updates UI accordingly.
 * @returns {void}
 */
const checkWinner = () => {

	let hasWin = false;

	// Check each winning pattern
	for (let pattern of winPatterns) {
		let pos1Val = boxes[pattern[0]].innerText;
		let pos2Val = boxes[pattern[1]].innerText;
		let pos3Val = boxes[pattern[2]].innerText;

		if (
			pos1Val !== "" &&
			pos2Val !== "" &&
			pos3Val !== "" &&
			pos1Val === pos2Val &&
			pos2Val === pos3Val
		) {
			showWinner(pos1Val);
			hasWin = true;
			return;
		}
	}

	// If no win, check for draw
	if (!hasWin) {
		const allBoxesFilled = boxes.every((box) => box.innerText !== "");
		if (allBoxesFilled) {
			msgContainer.classList.remove('hide');
			msg.innerText = 'Match Drawn';
		}
	}
};

/**
 * Resets the game state back to initial conditions.
 * Restores empty board, hides messages, and sets turn to Player O.
 * @returns {void}
 */
const resetGame = () => {
	turnO = true;
	enableBoxes();
	msgContainer.classList.add('hide');
};

// Attach reset handlers
newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);