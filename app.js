let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let newBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
let container = document.querySelector(".container");

let turnO = true;
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("displayHide");
  boxes.forEach(box => {
    box.classList.remove("o-color", "x-color");
  });

};


const checkDraw = () => {
  for (let box of boxes) {
    if (box.innerText === "") {
      return false; // If any box is empty, game is not a draw
    }
  }
  return true; // All boxes are filled, game is a draw
};

const checkWinnerOrDraw = () => {
  if (checkDraw()) {
    showDraw();
  } else {
    checkWinner();
  }
};

const showDraw = () => {
  msg.innerHTML = `
  <i class="bi bi-emoji-neutral"></i> It's a Draw! <i class="bi bi-emoji-neutral"></i>
  `;
  drawSound();
  msgContainer.classList.remove("displayHide");
  disableBoxes();
};
function drawSound() {
  const drawSound = document.getElementById("drawSound");
  drawSound.play();
}


boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      playXSound();
      box.classList.add("o-color");
      turnO = false;
    } else {
      box.innerText = "X";
      box.classList.add("x-color");
      turnO = true;
    }
    box.disabled = true;
    playXSound();
    // checkWinner();
    checkWinnerOrDraw();
  });
});

function playXSound() {
  const XclickSound = document.getElementById("xSound");
  XclickSound.play();
}

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  winnerSound();
  msg.innerHTML = `
  <i class="bi bi-emoji-heart-eyes"></i> Congratulation winner <i class="bi bi-trophy"></i> is 
  <p style="color: white; font-weight: bold;font-size:5rem">(${winner})</p>
  `;
  msgContainer.classList.remove("displayHide");
  disableBoxes();
};

function winnerSound() {
  const winnerSound = document.getElementById("winnerSound");
  winnerSound.play();
}


const checkWinner = () => {
  for (let pattern of winningPattern) {
    let position1 = boxes[pattern[0]].innerText;
    let position2 = boxes[pattern[1]].innerText;
    let position3 = boxes[pattern[2]].innerText;

    if (position1 != "" && position2 != "" && position3 != "") {
      if (position1 === position2 && position2 === position3) {
        showWinner(position1);
        return;
      }
      
    }
  }
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
