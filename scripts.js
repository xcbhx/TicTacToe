const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

// Winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
];

// Game Status Messages
const playerTurn = () => `Current Player: ${currentPlayer}`;
const winMessage = () => `Player ${currentPlayer} wins!`;
const drawMessage = () => "It's a draw!";

// Initialize the game
statusText.innerText = playerTurn();

// Handle cell click event
function handleCellClick() {
    const cellIndex = this.id;

    // Ignore clicks if the cell is already filled or if the game is over
    if (board[cellIndex] !== "" || !isGameActive) {
        return;
    }

    // Mark the cell and update the board
    board[cellIndex] = currentPlayer;
    this.innerText = currentPlayer;

    // Check if there's a winner or a draw
    checkResult();
}

// Check for win or draw
function checkResult() {
    let roundWon = false;

    // Check each winning combination
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.innerText = winMessage();
        isGameActive = false;
    } else if (!board.includes("")) {
        statusText.innerText = drawMessage();
        isGameActive = false;
    } else {
        switchPlayer();
    }
}

// Switch players
function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = playerTurn();
}

// Restart the game
function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    currentPlayer = "X";
    statusText.innerText = playerTurn();
    cells.forEach(cell => cell.innerText = "");
}

// Add event listeners to each cell
cells.forEach(cell => cell.addEventListener("click", handleCellClick));

// Add event listener to the reset button
resetButton.addEventListener("click", restartGame);
