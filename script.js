const xClass = "x";
const circleClass = "circle";

const allSquares = document.querySelectorAll(".square");
const board = document.querySelector("#board");
const winnegElement = document.querySelector("#winningMessage");
const winningMesaage = document.querySelectorAll("[data-winnig-message-text]");
const Restartbutton = document.querySelector("#restartButton");
const Refresh = document.querySelector(".refresh");
const whosTurn = document.querySelector(".whos-turn");
const winningImage = document.querySelector("#winning-image");
const winnigMessageParagraph = document.querySelector(
  ".winnig-message__paragraph"
);
const xWin = document.querySelector(".x-win");
const tie = document.querySelector(".tie");
const yWin = document.querySelector(".y-win");

let circleturn;
let [rounds, x, z, y] = [0, 0, 0, 0];

const Winnig_combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [2, 5, 8],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

Restartbutton.addEventListener("click", (evt) => {
  evt.preventDefault();
  circleturn = false;
  allSquares.forEach((square) => {
    square.classList.remove(xClass);
    square.classList.remove(circleClass);
    square.removeEventListener("click", handleClick);
    square.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winnegElement.classList.remove("show");
  whosTurn.textContent = "X turn";
});

startGame();

function startGame() {
  circleturn = false;
  allSquares.forEach((square) => {
    square.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
}

function handleClick(e) {
  const square = e.target;
  const currentClass = circleturn ? circleClass : xClass;
  if (circleturn) {
    whosTurn.textContent = "X Turn";
  } else {
    whosTurn.textContent = "O turn";
  }
  placemark(square, currentClass);
  if (checkWin(currentClass)) {
    endgame(false);
  } else if (isDraw()) {
    endgame(true);
  }

  swapTurns();
  setBoardHoverClass();
}

function checkWin(currentClass) {
  console.log(currentClass, "asdd");
  return Winnig_combinations.some((combination) => {
    return combination.every((index) => {
      console.log(allSquares[index].classList.contains(currentClass));
      return allSquares[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...allSquares].every((square) => {
    return (
      square.classList.contains(xClass) ||
      square.classList.contains(circleClass)
    );
  });
}

function endgame(draw) {
  rounds++;
  if (draw) {
    winningMesaage.forEach((message) => {
      winningImage.src = "";
      winnigMessageParagraph.textContent = "";
      message.innerHTML = "ROUND TIED";
      message.style.color = "#A8BFC9";
      tie.textContent = `IT DRAW  ${++z}`;
    });
  } else {
    winningMesaage.forEach((message) => {
      if (circleturn) {
        winningImage.src = "./images 14.35.43/Oval-yellow.svg";
        winnigMessageParagraph.textContent = "OH NO, YOU LOST…";
        message.innerHTML = "Takes The Round";
        message.style.color = "#f2b137";
        yWin.innerHTML = ` Y(CPU)   ${++y}`;
      } else {
        winningImage.src = "./images 14.35.43/Combined.svg";
        winnigMessageParagraph.textContent = "YOU WON!";
        message.innerHTML = "takes The round";
        message.style.color = "#31C3BD";
        xWin.textContent = ` X (YOU) ${++x}`;
      }
    });
  }

  winnegElement.classList.add("show");
}

function placemark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleturn = !circleturn;
}

function setBoardHoverClass() {
  board.classList.remove(xClass);
  board.classList.remove(circleClass);

  if (circleturn) {
    board.classList.add(circleClass);
  } else {
    board.classList.add(xClass);
  }
}

Refresh.addEventListener("click", (evt) => {
  evt.preventDefault();
  location.reload();
});
