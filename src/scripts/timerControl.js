import { Timer } from 'easytimer.js';
import { timerValues, setTimerValues, renderTimerValues } from './timerSetup';
import { updateTotalTimeCounter } from './timerCounter';

export const countdownDisplay = document.getElementById('countdown-display');

const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const nextBtn = document.getElementById('next');
const stopBtn = document.getElementById('stop');

const timer = new Timer();

timer.addEventListener('secondTenthsUpdated', () => {
  countdownDisplay.innerText = timer.getTimeValues().toString();
});

timer.addEventListener('targetAchieved', () => {
  countdownDisplay.innerText = "Time's Up!!";
});

export const startTimer = function (hour, min, sec) {
  timer.start({
    countdown: true,
    startValues: {
      hours: hour,
      minutes: min,
      seconds: sec,
    },
    precision: 'secondTenths',
  });
};

export const pauseTimer = function () {
  timer.pause();
};

export const resetTimer = function () {
  if (!timer.isRunning() && !timer.isPaused()) return;
  renderTimerValues();
  timer.reset();
};

export const nextTimer = function () {
  if (countdownDisplay.innerText != "Time's Up!!") return;
  renderTimerValues();
  timer.reset();
  updateTotalTimeCounter();
};

export const stopTimer = function () {
  timer.stop();
  setTimerValues(0, 0, 0);
  renderTimerValues();
};

startBtn.addEventListener('click', () =>
  startTimer(...Object.values(timerValues))
);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
nextBtn.addEventListener('click', nextTimer);
stopBtn.addEventListener('click', stopTimer);
