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
// board section
// Select the board container
const createConnect4Board = () => {
  const gameBoard = document.getElementById("container")
  
  const board = document.createElement("div");
  board.classList.add("board");
  document.body.appendChild(board)
  
  for (let i = 0; i < 42; i++) {
      const slot = document.createElement('div');
      slot.classList.add("slot");
      slot.dataset.column = i % 7;
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
const array = {
    A: [null, null, null, null, null, null],
    B: [null, null, null, null, null, null],
    C: [null, null, null, null, null, null],
    D: [null, null, null, null, null, null],
    E: [null, null, null, null, null, null],
    F: [null, null, null, null, null, null],
    G: [null, null, null, null, null, null]
};

const columnMap = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

document.querySelectorAll('.slot').forEach(slot => {
  slot.addEventListener('click', () => {
    const columnIndex = parseInt(slot.dataset.column);
    const columnKey = columnMap[columnIndex];
    const column = array[columnKey];
// Find the lowest empty slot in the column
    const rowIndex = column.lastIndexOf(null);

    if(rowIndex !== -1){
      const currentPlayer = document.createElement("redDiscChoice").checked ? "red" : "yellow";
      column[rowIndex] = currentPlayer;

// UI update here

const slots = document.querySelector(`[data-column="${columnIndex}"]`);
const targetSlot = slots[slots.length - 1 - rowIndex];
      const disc = document.createElement("div");
      disc.classList.add(`${currentPlayer}Disc`);
      document.querySelector(`[data-column="${columnIndex}"]`).appendChild(disc);
      targetSlot.appendChild(slots)
    }
  })
})















//const container = document.getElementById("container")
//const title = document.createElement('div');
//title.classList.add("Title")
//const title_text = document.createElement('p');
//title_text.innerHTML = "4 In A Row"
//title_text.classList.add("Title_text")
//title.appendChild(title_text);
//document.getElementById("container").appendChild(title);

