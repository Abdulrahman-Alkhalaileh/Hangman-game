let limbs = document.querySelectorAll("#limbs");
let keys = document.querySelectorAll(".key");
let wrongChar = document.querySelector(".wrong");
let guessField = document.querySelector(".guessField");
let flag = false;
let counter = 0;
let counterLimb = 0;

let words = [
  "DOG",
  "POTATO",
  "COW",
  "PARROT",
  "STONE",
  "WATCH",
  "HOUSE",
  "BREAK",
  "SALAD",
  "TRIP",
  "MASK",
  "CHICKEN",
];
let hintSentences = [
  "A pet animal",
  "Common veggie",
  "An animal",
  "A pet bird",
  "Everywhere on the ground",
  "Has 3 arrows",
  "A shelter",
  "Causes damage",
  "A side dish",
  "On going",
  "We put on face",
  "An animal",
];

//select random word from array
//game preperation

let wordNum = Math.floor(Math.random() * words.length);
let hint = document.querySelector(".hint");
hint.innerHTML += hintSentences[wordNum];

let word = [];

for (let i = 0; i < words[wordNum].length; i++) {
  word.push(words[wordNum].charAt(i));
  document.createElement("div");
}

for (let i = 0; i < words[wordNum].length; i++) {
  let char = document.createElement("div");
  char.setAttribute("class", "char");
  guessField.appendChild(char);
}

let spaces = document.querySelectorAll(".char");

//game start **********************************

for (let i = 0; i < keys.length; i++) {
  keys[i].onclick = (e) => {
    keyCorrect(e);
    keyWrong(e);
    finalResult();
  };
}

//game logic **********************************

function keyCorrect(e) {
  for (let i = 0; i < word.length; i++) {
    if (e.target.innerHTML === word[i]) {
      counter++;
      spaces[i].innerHTML = e.target.innerHTML;
      flag = true;
    }
  }
}

function keyWrong(e) {
  if (counter === 0) {
    limbs[counterLimb].style.display = "block";
    flag = false;
    wrongChar.innerHTML += e.target.innerHTML + " ";
  }
  counter = 0;

  if (flag === false) {
    counterLimb++;
  }
}

//game finishing ******************************

let resultWarning = document.querySelector(".finalResult");

function finalResult() {
  if (ifLooser() || ifWinner()) {
    resultWarning.style.display = "flex";
    if (ifLooser() === true) {
      resultWarning.childNodes[0].innerHTML = "Looser";
    }
    if (ifWinner() === true) {
      resultWarning.childNodes[0].innerHTML = "Winner";
    }
    setInterval(() => {
      resultWarning.childNodes[0].innerHTML += ".";
      setTimeout(() => {
        location.reload();
      }, 1500);
    }, 600);
  }
}

function ifLooser() {
  return limbs[6].style.display === "block";
}

function ifWinner() {
  let counter = 0;
  let flag;
  for (let i = 0; i < spaces.length; i++) {
    if (spaces[i].innerHTML === "") {
      counter++;
    }
  }
  counter > 0 ? (flag = false) : (flag = true);
  return flag;
}
