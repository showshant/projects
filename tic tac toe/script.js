// let turn = "O";

// let winner = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
//   [1, 4, 7],
//   [2, 5, 8],
//   [3, 6, 9],
//   [1, 5, 9],
//   [3, 5, 7],
// ];
// const boardArray = {};
// for (let i = 1; i <= 9; i++) {
//   boardArray[i] = "E";
// }

// // 1.   2.   3.   4.   5.   6.   7.   8    9.
// // ["E", "E", "E", "E", "E", "E", "E", "E", "E",]

// function checkWinner() {
//   for (let [index0, index1, index2] of winner) {
//     if (
//       boardArray[index0] != "E" &&
//       boardArray[index0] === boardArray[index1] &&
//       boardArray[index0] === boardArray[index2]
//     )
//       return 1;
//   }
//   return 0;
// }

// const board = document.getElementById("board");
// board.addEventListener("click", (event) => {
//   // console.log(event.target.id);

//   const element = event.target;

//   if (boardArray[element.id] === "E") {
//     if (turn === "O") {
//       element.innerHTML = "O";
//       boardArray[element.id] = "O";
//       if (checkWinner()) {
//         document.getElementById("winningMessage").innerHTML = "winner is O";
//       }
//       turn = "X";
//     } else {
//       element.innerHTML = "X";
//       boardArray[element.id] = "X";
//       if (checkWinner()) {
//         document.getElementById("winningMessage").innerHTML = "winner is X";
//       }
//       turn = "O";
//     }
//   }
// });

let turn = "O";
let gameActive = true;

const winningCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

// Initialize board as an object with string keys
const boardArray = {};
for (let i = 1; i <= 9; i++) {
  boardArray[i] = "E";
}

function checkWinner() {
  for (let [a, b, c] of winningCombinations) {
    if (
      boardArray[a] !== "E" &&
      boardArray[a] === boardArray[b] &&
      boardArray[b] === boardArray[c]
    ) {
      return boardArray[a];
    }
  }
  return null;
}

function checkDraw() {
  return Object.values(boardArray).every((cell) => cell !== "E");
}

const board = document.getElementById("board");
board.addEventListener("click", (event) => {
  if (!gameActive || !event.target.classList.contains("cell")) return;

  const element = event.target;
  const cellId = element.id;

  if (boardArray[cellId] === "E") {
    boardArray[cellId] = turn;
    element.textContent = turn;

    const winner = checkWinner();
    if (winner) {
      document.getElementById(
        "winningMessage"
      ).textContent = `Winner is ${winner}!`;
      gameActive = false;
      return;
    }

    if (checkDraw()) {
      document.getElementById("winningMessage").textContent =
        "Game ended in a draw!";
      gameActive = false;
      return;
    }

    turn = turn === "O" ? "X" : "O";
  }
});

document.getElementById("restart-game").addEventListener("click", () => {
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = "";
  });

  for (let i = 1; i <= 9; i++) {
    boardArray[i] = "E";
  }

  document.getElementById("winningMessage").textContent = "";
  turn = "O";
  gameActive = true;
});
