let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

// "started" shows has the game started or not
let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  //   game can start once only
  if (started == false) {
    console.log("game has started");
    started = true;

    //game started and call lvl up
    levelUp();
  }
});

// it does white color when flashes
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

// when user clicks the btn, color changes to green
function userFlash(btn) {
  btn.classList.add("userflash");
  //   flash will be there for few ms nd get back to original color of btn
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  //   updating level once game starts
  h2.innerText = `Level ${level}`;

  //   random index
  let randIdx = Math.floor(Math.random() * 3);
  //   random btn choose
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  // storing game random color in the array
  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}

// to check if game seq and user seq is same or not
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    // after game overs, we need to reset
    reset();
  }
}

// after 'user' button press
function btnPress() {
  let btn = this; // function scope
  userFlash(btn);

  // storing user color in the array
  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
