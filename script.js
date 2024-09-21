let boxes = document.querySelectorAll(".box");
let turn = "X";
let isGameOver = false;
let turnCount = 1;
let timer = 10; // 10 seconds per turn
let timerInterval;

// DOM Elements
const resultDisplay = document.querySelector("#results");
const playAgainButton = document.querySelector("#play-again");
const bgIndicator = document.querySelector(".bg");
const turnCountDisplay = document.querySelector("#turn-count");
const timerDisplay = document.querySelector("#turn-timer");

// Initialize game: Clear boxes and add event listeners
boxes.forEach(box => {
    box.innerHTML = "";
    box.addEventListener("click", () => {
        if (!isGameOver && box.innerHTML === "") {
            box.innerHTML = turn;
            clearInterval(timerInterval);  // Stop the timer after a valid move
            checkWin();
            checkDraw();
            if (!isGameOver) {
                changeTurn();
            }
        }
    });
});

// Timer function
function startTimer() {
    timer = 10;
    timerDisplay.innerHTML = `Time left: ${timer}s`;

    timerInterval = setInterval(() => {
        timer--;
        timerDisplay.innerHTML = `Time left: ${timer}s`;

        if (timer === 0) {
            clearInterval(timerInterval);
            changeTurn();  // Automatically change turn if time runs out
        }
    }, 1000); // Decrease the timer every second
}

function changeTurn() {
    // Toggle turn between "X" and "O"
    if (turn === "X") {
        turn = "O";
        bgIndicator.style.left = "85px"; // Move the background indicator to player O
        document.querySelector("#player-X").style.opacity = "0.5"; // Dim player X
        document.querySelector("#player-O").style.opacity = "1";   // Highlight player O
    } else {
        turn = "X";
        bgIndicator.style.left = "0"; // Move the background indicator to player X
        document.querySelector("#player-O").style.opacity = "0.5"; // Dim player O
        document.querySelector("#player-X").style.opacity = "1";   // Highlight player X
    }

    // Increment turn count
    turnCount++;
    turnCountDisplay.innerHTML = `Turn: ${turnCount}`;

    // Start a new timer for the next player
    startTimer();
}

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    winConditions.forEach(condition => {
        const [a, b, c] = condition;
        const boxA = boxes[a].innerHTML;
        const boxB = boxes[b].innerHTML;
        const boxC = boxes[c].innerHTML;

        if (boxA !== "" && boxA === boxB && boxA === boxC) {
            isGameOver = true;
            clearInterval(timerInterval); // Stop the timer when game ends
            resultDisplay.innerHTML = `${turn} wins!`;
            playAgainButton.style.display = "inline";

            condition.forEach(index => {
                boxes[index].style.backgroundColor = "#08D9D6";
                boxes[index].style.color = "#000";
            });
        }
    });
}

function checkDraw() {
    if (!isGameOver) {
        let isDraw = true;

        boxes.forEach(box => {
            if (box.innerHTML === "") isDraw = false;
        });

        if (isDraw) {
            isGameOver = true;
            clearInterval(timerInterval); // Stop the timer on a draw
            resultDisplay.innerHTML = "It's a draw!";
            playAgainButton.style.display = "inline";
        }
    }
}

// Event listener for the "Play Again" button to reset the game
playAgainButton.addEventListener("click", () => {
    isGameOver = false;
    turn = "X";  // Reset to Player X
    turnCount = 1; // Reset turn count
    bgIndicator.style.left = "0";  // Reset background indicator to Player X
    resultDisplay.innerHTML = "";  // Clear the result message
    playAgainButton.style.display = "none";  // Hide the Play Again button

    turnCountDisplay.innerHTML = `Turn: ${turnCount}`; // Reset turn count display
    timerDisplay.innerHTML = `Time left: ${timer}s`; // Reset timer display
    clearInterval(timerInterval);  // Stop any ongoing timer
    startTimer();  // Start a new timer for Player X

    // Reset all boxes to empty and restore original styles
    boxes.forEach(box => {
        box.innerHTML = "";
        box.style.backgroundColor = "";
        box.style.color = "#fff";
    });

    document.querySelector("#player-X").style.opacity = "1";  // Highlight Player X
    document.querySelector("#player-O").style.opacity = "0.5";  // Dim Player O
});

// Start the timer when the game first loads
startTimer();
