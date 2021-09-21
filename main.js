let stopTime = 0;
let myVal = 0;
var counter;
let breakTime = 5;
var sessionTime = 25;
let tempTime = sessionTime;

//adding audio for session start and end

var x = document.getElementById("myAudio-1");

var y = document.getElementById("myAudio-2");

var sessionEndVoice = document.getElementById("myVoice-1");

var sessionStartVoice = document.getElementById("myVoice-2");

//input control operations

document
  .getElementById("left_up_arrow")
  .addEventListener("click", incrementBreakTime);

function incrementBreakTime() {
  // breakTime = breakTime + 1;
  breakTime = Math.ceil(breakTime) + 1;
  document.getElementById("break-length").innerText = `${Math.ceil(breakTime)}`;
  clearInterval(myVal);
}

document
  .getElementById("left_down_arrow")
  .addEventListener("click", decrementBreakTime);

function decrementBreakTime() {
  clearInterval(myVal);
  if (breakTime > 0) {
    breakTime = Math.ceil(breakTime) - 1;
  }
  document.getElementById("break-length").innerText = `${Math.ceil(breakTime)}`;
 }

document
  .getElementById("right_up_arrow")
  .addEventListener("click", incrementSessionTime);

function incrementSessionTime() {
  tempTime = Math.ceil(tempTime) + 1;
  document.getElementById("session-length").innerText = `${Math.ceil(
    tempTime
  )}`;
  clearInterval(myVal);
}

document
  .getElementById("right_down_arrow")
  .addEventListener("click", decrementSessionTime);

function decrementSessionTime() {
  if (tempTime > 0) {
    // tempTime--;
    tempTime = Math.ceil(tempTime) - 1;
  }
  document.getElementById("session-length").innerText = `${Math.ceil(
    tempTime
  )}`;
  clearInterval(myVal);
}

//Timer function
function mainTimer(value = 0) {
  let time = value;

  counter++;
  console.log(counter);

  myVal = setInterval(timer, 1000);

  function timer() {
    let min = Math.floor(time / 60);

    let sec = time % 60;

    if (min < 10) {
      min = `0${min}`;
    }
    if (sec < 10) {
      sec = `0${sec}`;
    }

    if (min == 0 && sec == 0) {
      clearInterval(myVal);
      if (counter % 2 != 0) {
        x.play();
        // sessionEndVoice.play();
        redBackground();
        mainTimer(convertInSec(breakTime));
      } else {
        y.play();
        // sessionStartVoice.play();
        greenBackground();
        mainTimer(convertInSec(tempTime));
      }
    }

    document.getElementById("countDownTimer").innerHTML = `${min}:${sec}`;

    time--;
    stopTime = time;
    console.log(stopTime);
  }
}

//Timer starter function
document.getElementById("start").addEventListener("click", starterFun);

function starterFun() {
  clearInterval(myVal);
  y.play();
  // sessionStartVoice.play();
  greenBackground();
  mainTimer(convertInSec(tempTime));
}

//Timer reset function
document.getElementById("reset").addEventListener("click", resetFun);

function resetFun() {
  clearInterval(myVal);
  // mainTimer(convertInSec(sessionTime));
  location.reload();
}

//Timer stoper function
document.getElementById("stop").addEventListener("click", stoperFun);

function stoperFun() {
  counter = 0;
  if (stopTime >= 1) {
    tempTime = stopTime / 60;
  }
  noBackground();
  clearInterval(myVal);
}

function convertInSec(val) {
  // if (val >= 1) {
  //   return val * 60;
  // }

  return val * 60;
}

//function for change background color

function redBackground() {
  document.getElementById("main").style.backgroundColor = "red";
}

function greenBackground() {
  document.getElementById("main").style.backgroundColor = "green";
}

function noBackground() {
  document.getElementById("main").style.backgroundColor = "rgb(96, 138, 138)";
}
