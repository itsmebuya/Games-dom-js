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
const createConnect4Board = () => {
  const gameBoard = document.getElementById("container");

  const board = document.createElement("div");
  board.classList.add("board");
  gameBoard.appendChild(board);

  for (let i = 0; i < 42; i++) {
      const slot = document.createElement("div");
      slot.classList.add("slot");
      slot.dataset.column = i % 7;
      slot.dataset.row = Math.floor(i / 7);
      board.appendChild(slot);
  } 
// controls
const controls = document.createElement("div");
controls.classList.add("controls");  
// red disc section   
  const redDisc = document.createElement("div");
  redDisc.classList.add("redDisc");
  
  const redInput = document.createElement("input");
  redInput.type = "radio";
  redInput.name = "discChoice";
  redInput.id = "redDiscChoice";
  redInput.checked = true;
// yellow disc section  
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

  
  };
  createConnect4Board();
  
// game logic

 


    
  

// PS this will be used
let array = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
];

const columnMap = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

// Check for a win condition
const checkWin = (array, currentPlayer) => {
  const directions = [
      [0, 1], // horizontal
      [1, 0], // vertical
      [1, 1], // diagonal down-right
      [1, -1], // diagonal up-right
  ];

  for (let column in array) {
      for (let row = 0; row < array[column].length; row++) {
          if (array[column][row] === currentPlayer) {
              for (let [dx, dy] of directions) {
                  let count = 1;
                  for (let step = 1; step < 4; step++) {
                      const nextColumn = columnMap[columnMap.indexOf(column) + dx * step];
                      const nextRow = row + dy * step;
                      if (
                          nextColumn &&
                          nextRow >= 0 &&
                          nextRow < 6 &&
                          array[nextColumn]?.[nextRow] === currentPlayer
                      ) {
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

let currentPlayer = "red";

// Handle slot clicks and manage the falling effect
document.querySelectorAll(".slot").forEach((slot) => {
  slot.addEventListener("click", () => {
      const columnIndex = parseInt(slot.dataset.column);
      const columnKey = columnMap[columnIndex];
      const column = array[columnKey];

      // Find the lowest empty slot in the column (simulating falling discs)
      const rowIndex = column.lastIndexOf(null);
      if (rowIndex !== -1) {
          // Update the game state
          column[rowIndex] = currentPlayer;

          // Create the disc element and position it to fall
          const disc = document.createElement("div");
          disc.classList.add("disc", `${currentPlayer}Disc`);
          document.body.appendChild(disc);

          const slots = document.querySelectorAll(`.slot[data-column="${columnIndex}"]`);
          const targetSlot = slots[5 - rowIndex];
          const rect = targetSlot.getBoundingClientRect();

          // Set the initial position above the board to simulate falling
          disc.style.left = `${rect.left + window.scrollX}px`;
          disc.style.top = `${rect.top + window.scrollY - 100}px`; // Start above the board
          disc.style.position = "absolute"; // Absolute position for falling effect

          // Simulate falling by transitioning the disc down to the slot
          setTimeout(() => {
              disc.style.transition = "top 0.5s ease-in";
              disc.style.top = `${rect.top + window.scrollY}px`; // Move to slot position

              // After falling, append the disc to the slot
              setTimeout(() => {
                  targetSlot.appendChild(disc);
                  disc.style.position = "relative"; // Reset position for grid placement

                  // Check for win after the disc lands
                  if (checkWin(array, currentPlayer)) {
                      alert(`${currentPlayer} wins!`);
                      location.reload(); // Restart the game
                  }

                  // Toggle player turn
                  currentPlayer = currentPlayer === "red" ? "yellow" : "red";
              }, 500);
          }, 0);
      }
  });
});







//const container = document.getElementById("container")
//const title = document.createElement('div');
//title.classList.add("Title")
//const title_text = document.createElement('p');
//title_text.innerHTML = "4 In A Row"
//title_text.classList.add("Title_text")
//title.appendChild(title_text);
//document.getElementById("container").appendChild(title);

