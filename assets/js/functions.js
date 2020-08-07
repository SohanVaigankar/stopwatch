const hourUnit = document.querySelector(".hours");
const minuteUnit = document.querySelector(".minutes");
const secondUnit = document.querySelector(".seconds");
const milliSecUnit = document.querySelector(".milliseconds");
const resetBtn = document.querySelector(".reset");
const startBtn = document.querySelector(".start");
const theme = document.querySelector(".theme");

document.querySelector(
  ".lap-unit"
).innerHTML += `<li class="new-lap-list"></li>`;
let hours = 0;
let minutes = 0;
let seconds = 0;
let milliSeconds = 0;
let hourFunction = 0;
let minuteFunction = 0;
let secondFunction = 0;
let milliSecFunction = 0;
let temp = 0;
let lap = false;
let lapTotalPrev = 0;
let count = 0;

startBtn.classList.add("btn-success");
resetBtn.classList.add("btn-warning");

window.onkeypress = function (event) {
  if (event.which === 32) return reset();
  if (event.which === 13) return timeUpdate();
};

function clock() {
  hourFunction = setInterval(() => {
    hours++;
    stopwatchDisplay(hours, hourUnit);
  }, 3600000);

  minuteFunction = setInterval(() => {
    minutes++;
    if (minutes === 60) minutes = 0;
    stopwatchDisplay(minutes, minuteUnit);
  }, 60000);

  secondFunction = setInterval(() => {
    seconds++;
    if (seconds === 60) seconds = 0;
    stopwatchDisplay(seconds, secondUnit);
  }, 1000);

  milliSecFunction = setInterval(() => {
    milliSeconds++;
    if (milliSeconds === 100) milliSeconds = 0;
    stopwatchDisplay(milliSeconds, milliSecUnit);
  }, 10);
}

//function to update time on website w.r.t units
function stopwatchDisplay(time, timeUnit) {
  if (time < 10) timeUnit.textContent = "0" + time;
  else timeUnit.textContent = time;
}

function timeUpdate() {
  lap = true;
  temp = temp + 1;
  if (temp === 1) {
    startBtn.classList.remove("btn-success");
    resetBtn.classList.remove("btn-warning");
    startBtn.classList.add("btn-danger");
    resetBtn.classList.add("btn-primary");
    startBtn.textContent = "Stop";
    resetBtn.textContent = "Lap";
    if (hours > 0) {
      hourUnit.classList.add(".hours");
    }
    clock();
  }
  if (temp === 2) {
    lap = false;
    temp = 0;
    if (hours > 0) {
      clearInterval(hourFunction);
    }
    clearInterval(minuteFunction);
    clearInterval(secondFunction);
    clearInterval(milliSecFunction);
    startBtn.classList.remove("btn-danger");
    resetBtn.classList.remove("btn-primary");
    startBtn.classList.add("btn-success");
    resetBtn.classList.add("btn-warning");
    startBtn.textContent = "Start";
    resetBtn.textContent = "Reset";
  }
}

function lapTimeFunction(val) {
  if (val < 10) return "0" + val;
  else return val;
}

function reset() {
  if (lap === true) {
    let lapMinute = minutes * 60 * 1000;
    let lapSecond = seconds * 1000;
    let lapMilliSec = milliSeconds * 10;
    let lapTotalNew = lapMinute + lapSecond + lapMilliSec;
    let lapTime = Math.abs(lapTotalPrev - lapTotalNew);
    lapTotalPrev = lapTotalNew;
    lapMinute = Math.floor(((lapTime % 10000000) / (60 * 1000)) % 60);
    lapSecond = Math.floor(((lapTime % 100000) / 1000) % 60);
    lapMilliSec = Math.floor(((lapTime % 1000) / 10) % 100);
    document.querySelector(
      ".new-lap-list"
    ).innerHTML += `<li class="lap-list"><p class="lap-no temp-lap">${++count}</p>
        <p class="lap-time temp-lap">${
          lapTimeFunction(minutes) +
          " : " +
          lapTimeFunction(seconds) +
          " . " +
          lapTimeFunction(milliSeconds)
        }
          </p>
        <p class="lap-diff temp-lap">+ ${
          lapTimeFunction(lapMinute) +
          " : " +
          lapTimeFunction(lapSecond) +
          " . " +
          lapTimeFunction(lapMilliSec)
        }</p></li>`;
  }
  if (lap === false) {
    count = 0;
    let deleteList = document.querySelector(".new-lap-list");
    deleteList.remove();
    hours = 0;
    minutes = 0;
    seconds = 0;
    milliSeconds = 0;
    lapTotalPrev = 0;
    stopwatchDisplay(minutes, minuteUnit);
    stopwatchDisplay(seconds, secondUnit);
    stopwatchDisplay(milliSeconds, milliSecUnit);
    document.querySelector(
      ".lap-unit"
    ).innerHTML += `<li class="new-lap-list"></li>`;
  }
}
