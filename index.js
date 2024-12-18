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