import { Timer } from 'easytimer.js';

const countdownDisplay = document.getElementById('countdown-display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const stopBtn = document.getElementById('stop');

const timer = new Timer();

timer.addEventListener('secondTenthsUpdated', () => {
  countdownDisplay.innerText = timer
    .getTimeValues()
    .toString(['hours', 'minutes', 'seconds', 'secondTenths']);
});

timer.addEventListener('targetAchieved', () => {
  countdownDisplay.innerText = "Time's Up!!";
});

export const startTimer = function () {
  timer.start({
    countdown: true,
    startValues: {
      minutes: 0,
      seconds: 12,
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

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
stopBtn.addEventListener('click', stopTimer);
