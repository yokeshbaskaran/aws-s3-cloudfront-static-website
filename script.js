const emojis = [
  "🎁",
  "🎁",
  "🚗",
  "🚗",
  "🌟",
  "🌟",
  "💎",
  "💎",
  "🃏",
  "🃏",
  "♥️",
  "♥️",
  "♠️",
  "♠️",
  "♣️",
  "♣️",
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

const gameBoard = document.getElementById("game-board");

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  gameBoard.innerHTML = "";
  shuffle(emojis);

  emojis.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = emoji;
    card.dataset.index = index;

    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this.classList.contains("flipped") || this.classList.contains("matched"))
    return;

  this.classList.add("flipped");
  this.textContent = this.dataset.value;

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    lockBoard = true;
    checkMatch();
  }
}

function checkMatch() {
  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    resetChoices();
    checkWin();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard.textContent = "";
      secondCard.textContent = "";
      resetChoices();
    }, 800);
  }
}

function resetChoices() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function checkWin() {
  const allCards = document.querySelectorAll(".card");
  const matchedCards = document.querySelectorAll(".matched");

  if (allCards.length === matchedCards.length) {
    setTimeout(() => {
      alert("🎉 You Win! Great Memory!");
    }, 200);
  }
}

document.getElementById("restart-btn").addEventListener("click", createBoard);

createBoard();
