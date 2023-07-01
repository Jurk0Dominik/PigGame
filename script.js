"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let activePlayer, currentScore, scores, timePlay;

const disHoldScore = function (player, value) {
  document.getElementById(`score--${player}`).innerHTML = value;
};
const playerCurr = function (player, className) {
  document.querySelector(`.player--${player}`).classList.toggle(className);
};
const disCurScore = function (player, value) {
  document.getElementById(`current--${player}`).innerHTML = value;
};

const init = function () {
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  timePlay = true;

  disHoldScore(0, 0);
  disHoldScore(1, 0);
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");

  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const displayScore = function (player) {
  disHoldScore(player, scores[activePlayer]);
  disCurScore(player, 0);
};

const changePlayer = function () {
  currentScore = 0;
  disCurScore(activePlayer, currentScore);
  playerCurr(activePlayer, "player--active");
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerCurr(activePlayer, "player--active");
};

const checkWin = function (player) {
  if (scores[player] >= 50) {
    timePlay = false;
    playerCurr(player, "player--winner");
  } else {
    changePlayer();
  }
};

btnRoll.addEventListener("click", function () {
  if (timePlay) {
    // generate random dice number
    let random = Math.trunc(Math.random() * 6) + 1;
    //display proprely dice
    diceEl.src = `images/dice-${random}.png`;
    //check if roll equal 1
    if (random == 1) changePlayer();
    else {
      currentScore += random;
      disCurScore(activePlayer, currentScore);
    }
  }
});

btnHold.addEventListener("click", function () {
  if (timePlay) {
    scores[activePlayer] += currentScore;

    displayScore(activePlayer);
    checkWin(activePlayer);
  }
});

btnNew.addEventListener("click", init);
