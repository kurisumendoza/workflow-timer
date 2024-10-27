import { Timer } from 'easytimer.js';
import { mainTimerSetup } from './timerSetup';
import { updateTotalTimeCounter } from './timerCounter';

export const countdownDisplay = document.getElementById('countdown-display');

const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const nextBtn = document.getElementById('next');
const stopBtn = document.getElementById('stop');

export const timer = new Timer();

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
  if (!timer.isRunning() && !timer.isPaused()) return;
  timer.pause();
};

export const resetTimer = function () {
  if (!timer.isRunning() && !timer.isPaused()) return;
  mainTimerSetup.renderTimerValues(countdownDisplay);
  timer.reset();
};

export const nextTimer = function () {
  if (countdownDisplay.innerText != "Time's Up!!") return;
  mainTimerSetup.renderTimerValues(countdownDisplay);
  timer.reset();
  updateTotalTimeCounter();
};

export const stopTimer = function () {
  timer.stop();
  mainTimerSetup.setTimerValues(0, 0, 0);
  mainTimerSetup.renderTimerValues(countdownDisplay);
};

timer.addEventListener('secondTenthsUpdated', () => {
  countdownDisplay.innerText = timer.getTimeValues().toString();
});
timer.addEventListener('targetAchieved', () => {
  countdownDisplay.innerText = "Time's Up!!";
});
startBtn.addEventListener('click', () =>
  startTimer(...Object.values(mainTimerSetup))
);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
nextBtn.addEventListener('click', nextTimer);
stopBtn.addEventListener('click', stopTimer);
