// script.js
const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restartButton');
const message = document.getElementById('message');

let currentPlayer = 'X';
let boardState = Array(9).fill(null);
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (boardState[cellIndex] !== null || !gameActive) {
        return;
    }

    boardState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        switchPlayer();
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return boardState[index] === currentPlayer;
        });
    });
}

function isDraw() {
    return boardState.every(cell => cell !== null);
}

function endGame(draw) {
    gameActive = false;
    if (draw) {
        message.textContent = "It's a draw!";
    } else {
        message.textContent = `${currentPlayer} wins!`;
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function restartGame() {
    currentPlayer = 'X';
    boardState = Array(9).fill(null);
    gameActive = true;
    message.textContent = '';
    cells.forEach(cell => (cell.textContent = ''));
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
