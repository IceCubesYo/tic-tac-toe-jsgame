// Select all table cells and initialize the current player and win counts
const cells = document.querySelectorAll('td');
let currentPlayer = 'X';
let playerXWins = 0;
let playerOWins = 0;

// Select the span elements that display the win counts
const playerXWinsSpan = document.querySelector('#player-x-wins');
const playerOWinsSpan = document.querySelector('#player-o-wins');

// Select the reset button and game container
const resetButton = document.querySelector('#reset-button');
const gameContainer = document.querySelector('#game-container');

// Add a click event listener to each cell
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

// Handle cell clicks
function handleCellClick(e) {
  const cell = e.target;
  
  // If the cell is already filled, do nothing
  if (cell.textContent !== '') {
    return;
  }
  
  // Set the cell's content to the current player
  cell.textContent = currentPlayer;
  
  // Remove the click event listener from the cell to prevent further moves
  cell.removeEventListener('click', handleCellClick);
  
  // Check for a win or tie and handle the outcome
  if (checkWin()) {
    updateScoreboard();
    alert(currentPlayer + ' wins!');
    resetGame();
  } else if (checkTie()) {
    alert('It\'s a tie!');
    resetGame();
  } else {
    // Switch to the other player's turn
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Check for a win
function checkWin() {
  // Define all possible winning combinations
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  // Check if any winning combination is true
  return winConditions.some(condition => {
    // Check if every cell in the winning combination has the current player's symbol
    return condition.every(index => {
      return cells[index].textContent === currentPlayer;
    });
  });
}

// Check for a tie
function checkTie() {
  // Convert the NodeList of cells into an array and check if every cell is filled
  return Array.from(cells).every(cell => {
    return cell.textContent !== '';
  });
}

// Reset the game and win counts
function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.addEventListener('click', handleCellClick);
  });
  currentPlayer = 'X';
  playerXWinsSpan.textContent = playerXWins;
  playerOWinsSpan.textContent = playerOWins;
  playerXWins = 0;
  playerOWins = 0;
}

// Update the scoreboard with the current win count
function updateScoreboard() {
  if (currentPlayer === 'X') {
    playerXWins++;
    playerXWinsSpan.textContent = playerXWins;
  } else {
    playerOWins++;
    playerOWinsSpan.textContent = playerOWins;
  }
}

// Reset the game when the reset button is clicked
resetButton.addEventListener('click', resetGame);