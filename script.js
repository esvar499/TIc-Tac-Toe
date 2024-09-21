// Select all boxes and store them in a NodeList
let boxes = document.querySelectorAll(".box");
let turn = "X";
let isGameOver = false;

// Cache commonly used DOM elements
const resultDisplay = document.querySelector("#results");
const playAgainButton = document.querySelector("#play-again");
const bgIndicator = document.querySelector(".bg");

// Initialize game: Clear boxes and add event listeners
boxes.forEach(box => {
    box.innerHTML = "";
    box.addEventListener("click", () => {
        if (!isGameOver && box.innerHTML === "") {
            box.innerHTML = turn;
            checkWin();
            checkDraw();
            changeTurn();
        }
    });
});

function changeTurn() {
    if (turn === "X") {
        turn = "O";
        bgIndicator.style.left = "85px";
    } else {
        turn = "X";
        bgIndicator.style.left = "0";
    }
}

function checkWin() {
    // Winning combinations
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    // Loop through win conditions and check for a win
    winConditions.forEach(condition => {
        const [a, b, c] = condition;
        const boxA = boxes[a].innerHTML;
        const boxB = boxes[b].innerHTML;
        const boxC = boxes[c].innerHTML;

        // Check if all three boxes are filled with the same value (not empty)
        if (boxA !== "" && boxA === boxB && boxA === boxC) {
            isGameOver = true;
            resultDisplay.innerHTML = `${turn} wins!`;
            playAgainButton.style.display = "inline";

            // Highlight the winning boxes
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

        // Check if any box is still empty
        boxes.forEach(box => {
            if (box.innerHTML === "") isDraw = false;
        });

        // If all boxes are filled and no one has won, it's a draw
        if (isDraw) {
            isGameOver = true;
            resultDisplay.innerHTML = "It's a draw!";
            playAgainButton.style.display = "inline";
        }
    }
}

// Reset game when "Play Again" button is clicked
playAgainButton.addEventListener("click", () => {
    isGameOver = false;
    turn = "X";
    bgIndicator.style.left = "0";
    resultDisplay.innerHTML = "";
    playAgainButton.style.display = "none";

    // Clear all boxes and reset styles
    boxes.forEach(box => {
        box.innerHTML = "";
        box.style.backgroundColor = "";
        box.style.color = "#fff";
    });
});
