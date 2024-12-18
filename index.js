// document.getElementById('game1-btn').addEventListener('click', function() {
//     // Go to 4 in a row game
//     window.location.href = '4inarow.html'; // Change this path to your 4 in a row game page
// });

// document.getElementById('game2-btn').addEventListener('click', function() {
//     // Go to Tic Tac Toe game
//     window.location.href = 'tictactoe.html'; // Change this path to your Tic Tac Toe game page
// });

// document.getElementById('game3-btn').addEventListener('click', function() {
//     // Go to Line game
//     window.location.href = 'line.html'; // Change this path to your Line game page
// });
// Create Connect 4 Board
const createConnect4Board = () => {
  const gameBoard = document.getElementById("container");

  const board = document.createElement("div");
  board.classList.add("board");
  gameBoard.appendChild(board);

  for (let i = 0; i < 42; i++) {
    const slot = document.createElement("div");
    slot.classList.add("slot");
    slot.id = i % 7 + "-" + Math.floor(i / 7);
    slot.dataset.column = i % 7; // 7 columns
    slot.dataset.row = Math.floor(i / 7); // 6 rows
    board.appendChild(slot);
  }

  // Controls
  const controls = document.createElement("div");
  controls.classList.add("controls");

  // Red disc section
  const redDisc = document.createElement("div");
  redDisc.classList.add("redDisc");

  const redInput = document.createElement("input");
  redInput.type = "radio";
  redInput.name = "discChoice";
  redInput.id = "redDiscChoice";
  redInput.checked = true;

  // Yellow disc section
  const yellowDisc = document.createElement("div");
  yellowDisc.classList.add("yellowDisc");

  const yellowInput = document.createElement("input");
  yellowInput.type = "radio";
  yellowInput.name = "discChoice";
  yellowInput.id = "yellowDiscChoice";

  const redContainer = document.createElement("div");
  redContainer.appendChild(redDisc);
  redContainer.appendChild(redInput);

  const yellowContainer = document.createElement("div");
  yellowContainer.appendChild(yellowDisc);
  yellowContainer.appendChild(yellowInput);

  controls.appendChild(redContainer);
  controls.appendChild(yellowContainer);
  gameBoard.appendChild(controls);

  // Add h3 tag at the bottom of the board
  const status = document.createElement('h3');
  gameBoard.appendChild(status);
};

// Initialize the game board
createConnect4Board();

// Game state (2D array for the board)
let array = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
];

let currentPlayer = 1; // 1 for Player One (red), 2 for Player Two (yellow)
let currentPlayerName = 'Player One';
let playerOne = 'Player One';
let playerTwo = 'Player Two';
let playerOneColor = 'red';
let playerTwoColor = 'yellow';
let currentColor = playerOneColor;

function paintSlot(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] == 'red') {
        console.log(i, j, 'red')
        document.getElementById(j+"-"+i).classList.add("red")
        // console.log(i+"-"+j)
      }
      else if (array[i][j] == 'yellow') {
        document.getElementById(j+"-"+i).classList.add("yellow")
        console.log(i, j, 'yellow')
      }
    }
  }
}

// Check for a win condition
const checkWin = (array, currentPlayer) => {
  const directions = [
    [0, 1], // horizontal
    [1, 0], // vertical
    [1, 1], // diagonal down-right
    [1, -1], // diagonal up-right
  ];

  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      if (array[row][col] === currentPlayer) {
        for (let [dx, dy] of directions) {
          let count = 1;
          for (let step = 1; step < 4; step++) {
            const nextRow = row + dy * step;
            const nextCol = col + dx * step;
            if (nextRow >= 0 && nextRow < 6 && nextCol >= 0 && nextCol < 7 && array[nextRow][nextCol] === currentPlayer) {
              count++;
            } else {
              break;
            }
          }
          if (count === 4) return true;
        }
      }
    }
  }
  return false;
};

// Update the h3 tag and player turn
const updatePlayerTurn = () => {
  const status = document.querySelector('h3');
  if (currentPlayer === 1) {
    currentPlayerName = playerOne;
    status.textContent = `${currentPlayerName}: It's your turn, click a column to add your chip`;
    currentColor = playerOneColor;
  } else {
    currentPlayerName = playerTwo;
    status.textContent = `${currentPlayerName}: It's your turn, click a column to add your chip.`;
    currentColor = playerTwoColor;
  }
};

// Handle slot clicks and manage the falling effect
document.querySelectorAll(".slot").forEach((slot) => {
  slot.addEventListener("click", () => {
    const columnIndex = parseInt(slot.dataset.column);
    const column = array.map(row => row[columnIndex]);

    // Find the lowest empty slot in the column (simulating falling discs)
    const rowIndex = column.lastIndexOf(null);
    if (rowIndex !== -1) {
      // Update the game state
      array[rowIndex][columnIndex] = currentPlayer;

      // Create the disc element and position it to fall
      const disc = document.createElement("div");
      disc.classList.add("disc", `${currentColor}Disc`);
      document.body.appendChild(disc);

      const targetSlot = document.querySelector(`.slot[data-column="${columnIndex}"][data-row="${rowIndex}"]`);
      const rect = targetSlot.getBoundingClientRect();
      const firstSlotInColumn = document.querySelector(`.slot[data-column="${columnIndex}"][data-row="0"]`); // First slot in the column
      const firstSlotRect = firstSlotInColumn.getBoundingClientRect();

      // Set the initial position above the board to simulate falling
      disc.style.left = `${firstSlotRect.left + window.scrollX + firstSlotRect.width / 2 - disc.offsetWidth / 2}px`; // Center the disc horizontally
      disc.style.top = `${firstSlotRect.top + window.scrollY - 100}px`; // Start above the board
      disc.style.position = "absolute"; // Absolute position for falling effect

      // Simulate falling by transitioning the disc down to the slot
      setTimeout(() => {
        disc.style.transition = "top 3s ease-in"; // Extended time for the fall
        disc.style.top = `${rect.top + window.scrollY}px`; // Move to slot position

        // After falling, append the disc to the slot
        setTimeout(() => {
          targetSlot.appendChild(disc);
          disc.style.position = "relative"; // Reset position for grid placement

          // Check for win after the disc lands
          if (checkWin(array, currentPlayer)) {
            console.log(`${currentPlayerName} wins`);
            // alert(`${currentPlayerName} wins!`);
            // location.reload(); // Restart the game
          }
          paintSlot(array);

          // Toggle player turn
          currentPlayer = currentPlayer === 1 ? 2 : 1;
          updatePlayerTurn(); // Update the turn message
        }, 3000); // This timeout matches the new fall duration
      }, 0);
    }
    console.log(array);
  });
});

// Initialize the first player turn
updatePlayerTurn();












//const container = document.getElementById("container")
//const title = document.createElement('div');
//title.classList.add("Title")
//const title_text = document.createElement('p');
//title_text.innerHTML = "4 In A Row"
//title_text.classList.add("Title_text")
//title.appendChild(title_text);
//document.getElementById("container").appendChild(title);

