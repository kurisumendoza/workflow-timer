import { Timer } from 'easytimer.js';
import { timerValues } from './timerSetup';

export const countdownDisplay = document.getElementById('countdown-display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
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
  timer.reset();
};

export const stopTimer = function () {
  timer.stop();
  countdownDisplay.innerText = '00:00:00';
};

startBtn.addEventListener('click', () =>
  startTimer(timerValues.hour, timerValues.min, timerValues.sec)
);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
stopBtn.addEventListener('click', stopTimer);
