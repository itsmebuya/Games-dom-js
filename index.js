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








// Function to create and initialize the Connect 4 game board
const createConnect4Board = () => {
  // Get the container element where the board will be placed
  const gameBoard = document.getElementById("container");

  // Create the board element and add a class for styling
  const board = document.createElement("div");
  board.classList.add("board");
  gameBoard.appendChild(board);

  // Loop to create 42 slots (7 columns x 6 rows) for the Connect 4 grid
  for (let i = 0; i < 42; i++) {
    const slot = document.createElement("div"); // Create a slot element
    slot.classList.add("slot"); // Add a class for styling
    slot.id = i % 7 + "-" + Math.floor(i / 7); // Assign a unique ID in "column-row" format
    slot.dataset.column = i % 7; // Add the column index as a dataset attribute
    slot.dataset.row = Math.floor(i / 7); // Add the row index as a dataset attribute
    board.appendChild(slot); // Add the slot to the board
  }
  // creating reset button and display
  const resetButton = document.createElement('button');
  resetButton.innerHTML = "Reset Game"
  resetButton.classList.add("reset_button");




  // Create a container for the controls (player disc choices)
  // Create the controls container
  // Create the controls container
  const controls = document.createElement("div");
  controls.classList.add("controls"); // Add a class for styling

  // Create and configure the red disc selection
  // Create the red disc element and input
  const redDisc = document.createElement("div");
  redDisc.classList.add("redDisc"); // Add a class for styling
  redDisc.style.display = "none"; // Hide the red disc element

  const redInput = document.createElement("input"); // Create a radio input
  redInput.type = "radio"; // Set type to radio
  redInput.name = "discChoice"; // Set name for grouping radio buttons
  redInput.id = "redDiscChoice"; // Assign an ID
  redInput.checked = true; // Make red the default selected disc
  redInput.style.display = "none"; // Hide the input element

  // Create the yellow disc element and input
  const yellowDisc = document.createElement("div");
  yellowDisc.classList.add("yellowDisc"); // Add a class for styling
  yellowDisc.style.display = "none"; // Hide the yellow disc element

  const yellowInput = document.createElement("input"); // Create a radio input
  yellowInput.type = "radio"; // Set type to radio
  yellowInput.name = "discChoice"; // Group with red disc radio
  yellowInput.id = "yellowDiscChoice"; // Assign an ID
  yellowInput.style.display = "none"; // Hide the input element

  // Create containers for each disc choice and append elements
  const redContainer = document.createElement("div");
  redContainer.appendChild(redDisc);
  redContainer.appendChild(redInput);

  const yellowContainer = document.createElement("div");
  yellowContainer.appendChild(yellowDisc);
  yellowContainer.appendChild(yellowInput);

  // Append the red and yellow containers to the controls div
  controls.appendChild(redContainer);
  controls.appendChild(yellowContainer);

  // Optionally, append the controls div to the body or another parent container
  document.body.appendChild(controls);


  // Append the disc choices to the controls section
  controls.appendChild(redContainer);
  controls.appendChild(yellowContainer);
  gameBoard.appendChild(controls); // Add controls to the game board

  // Add a status message (h3) below the board for displaying the current turn or winner
  const status = document.createElement("h3");
  gameBoard.appendChild(status);
  gameBoard.appendChild(resetButton)

};




// Initialize the game board by calling the createConnect4Board function

document.addEventListener("DOMContentLoaded", createConnect4Board());


// Initialize the game state as a 2D array representing the board (7 columns x 6 rows)
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
let isLock = false;

function togglePlayer() {
  currentPlayer = 3 - currentPlayer;
}

function paintSlot(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      // const slot = document.getElementById(`${j}-${i}`); // Get the slot by ID
      // // const color = array[i][j] === 1 ? 'red' : array[i][j] === 2 ? 'yellow' : null; // Determine slot color
      // let color;
      // if (array[i][j] === 1) {
      //   color = 'red';
      // } else if (array[i][j] === 2) {
      //   color = 'yellow';
      // } else {
      //   color = null;
      // }

      if (array[i][j] == '1') {
        console.log(i, j, 'red')
        document.getElementById(j + "-" + i).classList.add("red")
        // console.log(i+"-"+j)
      }
      else if (array[i][j] == '2') {
        document.getElementById(j + "-" + i).classList.add("yellow")
        console.log(i, j, 'yellow')
      }
      else if (array[i][j] == null) {
        // document.getElementById(j+"-"+i).classList.add("emptySlot")
      }

    }
  }
}
function emptySlot(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      const element = document.getElementById(j + "-" + i);
      if(element.classList.contains('red')){
        element.classList.remove('red')
      }
      else if(element.classList.contains('yellow')){
        element.classList.remove('yellow')
      }

    }
  }
}

// Function to check if a player has won the game
const checkWin = (array, currentPlayer) => {
  // Define directions for checking: horizontal, vertical, and both diagonals
  const directions = [
    [0, 1], // Horizontal
    [1, 0], // Vertical
    [1, 1], // Diagonal down-right
    [1, -1], // Diagonal up-right
  ];

  // Loop through each position on the board
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      if (array[row][col] === currentPlayer) { // Check if the current slot belongs to the player
        for (let [dx, dy] of directions) { // Check all directions
          let count = 1; // Initialize a count for consecutive discs
          for (let step = 1; step < 4; step++) { // Check the next 3 slots in the direction
            const nextRow = row + dy * step;
            const nextCol = col + dx * step;
            if (
              nextRow >= 0 &&
              nextRow < 6 &&
              nextCol >= 0 &&
              nextCol < 7 &&
              array[nextRow][nextCol] === currentPlayer
            ) {
              count++;
            } else {
              break; // Stop checking if out of bounds or no match
            }
          }
          if (count === 4) return true; // Return true if 4 consecutive discs are found
        }
      }
    }
  }
  return false; // Return false if no win is found
};

// Function to update the status message and toggle the player's turn
const updatePlayerTurn = () => {
  const status = document.querySelector('h3'); // Get the status element
  if (currentPlayer === 1) {
    currentPlayerName = playerOne; // Set to Player 1's name
    status.textContent = `${currentPlayerName}: It's your turn, click a column to add your chip`;
    currentColor = playerOneColor; // Update the current color
  } else {
    currentPlayerName = playerTwo; // Set to Player 2's name
    status.textContent = `${currentPlayerName}: It's your turn, click a column to add your chip.`;
    currentColor = playerTwoColor; // Update the current color
  }
};

// Utility function to pause for a duration (used for animations)
const waitForAnimation = (duration) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

const onClick = async (event) => {
  if (isLock) return
  const slot = event.target
  const columnIndex = parseInt(slot.dataset.column);
  const column = array.map(row => row[columnIndex]);

  // Find the lowest empty slot in the column (simulating falling discs)
  const rowIndex = column.lastIndexOf(null); // Find the first available row
  if (rowIndex !== -1) {
    // Update the game state by placing the current player's disc
    array[rowIndex][columnIndex] = currentPlayer;

    // Create a disc element for the falling effect
    const disc = document.createElement("div");
    disc.classList.add("disc", `${currentColor}Disc`); // Style the disc with color
    document.body.appendChild(disc);

    const targetSlot = document.querySelector(`.slot[data-column="${columnIndex}"][data-row="${rowIndex}"]`);
    const rect = targetSlot.getBoundingClientRect(); // Get the slot's position on the screen
    const firstSlotInColumn = document.querySelector(`.slot[data-column="${columnIndex}"][data-row="0"]`); // First slot in the column
    const firstSlotRect = firstSlotInColumn.getBoundingClientRect(); // Get position of the first slot

    // Set initial position for the disc above the board
    disc.style.left = `${firstSlotRect.left + window.scrollX + firstSlotRect.width / 2 - disc.offsetWidth / 2}px`; // Center horizontally
    disc.style.top = `${firstSlotRect.top + window.scrollY - 100}px`; // Start above the board
    disc.style.position = "absolute"; // Use absolute positioning for animation

    // Trigger the falling animation
    setTimeout(() => {
      disc.style.transition = "top 1.5s ease-in"; // Smooth falling animation
      disc.style.top = `${rect.top + window.scrollY}px`; // Move to the slot position
    }, 0);

    isLock = true

    // Wait for the falling animation to complete
    await waitForAnimation(1500);

    // After falling, remove the disc
    disc.remove(); // Remove the disc element after the animation
    isLock = false

    // Apply the color class to the slot for visual representation
    targetSlot.classList.add(currentColor);

    // Check for a win condition after the disc lands
    if (checkWin(array, currentPlayer)) {
      isLock = true;
      const status = document.querySelector('h3'); // Get the status element
      const resultMessage = document.createElement('h2'); // Create a new element for the win message
      resultMessage.textContent = `${currentPlayerName} wins!`; // Set the win message
      resultMessage.classList.add("win-message"); // Style the win message
      status.parentNode.appendChild(resultMessage); // Display the win message
      return; // Stop further play
    }

    // Toggle player turn
    togglePlayer();
    // currentPlayer = currentPlayer === 1 ? 2 : 1;
    updatePlayerTurn(); // Update the turn message
  }
  console.log(array);
};
document.querySelectorAll(".slot").forEach((slot) => {
  slot.addEventListener("click", onClick)
});
document.querySelectorAll(".slot").forEach((slot) => {
  slot.addEventListener("click", onClick)
});




document.querySelector('.reset_button').addEventListener('click', () => {
  emptySlot(array);
  array = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ];
})









//const container = document.getElementById("container")
//const title = document.createElement('div');
//title.classList.add("Title")
//const title_text = document.createElement('p');
//title_text.innerHTML = "4 In A Row"
//title_text.classList.add("Title_text")
//title.appendChild(title_text);
//document.getElementById("container").appendChild(title);

