let rgb = document.getElementById("RGB");
let container = document.querySelector(".container");
let scoreContainer = document.getElementById("scores");
let correctStreak = 0;
let score = 0;
let button = document.querySelector("button");
let footer = document.getElementById("footer");
scores.innerHTML = Number();
function randomGenrateNumberBetween(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}
function increment() {
  score++;
  scoreContainer.innerText = score;
}
function validateResult(el) {
  let selectedColor = el.target.style.backgroundColor;
  if (selectedColor === randomColor) {
    increment();
    correctStreak++;
  } else {
    score = 0;
    correctStreak = 0;
  }
  window.localStorage.setItem("score", score);
  if (correctStreak === 3) {
    rgb.innerText = "🎉 Well Done!";
    container.innerHTML = ""; // remove all boxes
    correctStreak = 0;
    footer.innerText =
      "Amazing! 3 correct guesses in a row — you're really good at this!"; // reset streak
    return; // stop here
  }
  startGame();
}
function generateRandomColorRGB() {
  const red = randomGenrateNumberBetween(0, 255);
  const green = randomGenrateNumberBetween(0, 255);
  const blue = randomGenrateNumberBetween(0, 255);
  return `rgb(${red}, ${green}, ${blue})`;
}

function startGame() {
  score = window.localStorage.getItem("score") ?? 0;
  scoreContainer.innerText = Number(score);
  container.innerHTML = null;
  randomColor = generateRandomColorRGB();
  rgb.innerText = randomColor;

  const ansIndex = randomGenrateNumberBetween(0, 5);

  for (let i = 0; i < 6; i++) {
    const div = document.createElement("div");
    div.addEventListener("click", validateResult);
    if (i === ansIndex) {
      div.style.backgroundColor = randomColor;
    } else {
      div.style.backgroundColor = generateRandomColorRGB();
    }
    div.classList.add("box");
    container.append(div);
  }
}

window.addEventListener("load", () => startGame());

button.addEventListener("click", () => {
  score = 0;
  correctStreak = 0;
  window.localStorage.setItem("score", score);
  scoreContainer.innerText = score;
  startGame();
});
