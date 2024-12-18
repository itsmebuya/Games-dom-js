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
const createConnect4Board = () => {
const gameBoard = document.getElementById("container")

const board = document.createElement("div");
board.classList.add("board");
document.body.appendChild(board)

for (let i = 0; i < 42; i++) {
    const slot = document.createElement('div');
    slot.classList.add("slot");
    board.appendChild(slot);
}    
};
createConnect4Board();

let array = {
    A: [null, null, null, null, null, null],
    B: [null, null, null, null, null, null],
    C: [null, null, null, null, null, null],
    D: [null, null, null, null, null, null],
    E: [null, null, null, null, null, null],
    F: [null, null, null, null, null, null],
    G: [null, null, null, null, null, null]
}

const container = document.getElementById("container")
const title = document.createElement('div');
title.classList.add("Title")
const title_text = document.createElement('p');
title_text.innerHTML = "4 In A Row"
title_text.classList.add("Title_text")
title.appendChild(title_text);
document.getElementById("container").appendChild(title);

