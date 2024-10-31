import { Timer } from 'easytimer.js';
import {
  countdownDisplay,
  delayTimerDisplay,
  timerControls,
} from './domElements';
import { mainTimerSetup } from './timerSetup';
import { updateTotalTimeCounter } from './timerCounter';
import { mainTimerSetupModal } from './timerSetupModal';
import {
  delayTimer,
  delayTimerSetup,
  delayTimerSetupModal,
  delayControls,
} from './delayTimer';
import { openEditCounterModal } from './timerCounterModal';
import { resetLocalStorage } from './dataStorage';

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
  if (delayTimer.isRunning() || delayTimerDisplay.innerText === '00:00:00')
    delayControls.resetDelayTimer();
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
  if (countdownDisplay.innerText !== "Time's Up!!") return;
  mainTimerSetup.renderTimerValues(countdownDisplay);
  timer.reset();
  delayControls.resetDelayTimer();
  updateTotalTimeCounter();
};

export const stopTimer = function () {
  stopMainTimer();
  stopDelayTimer();
};

const stopMainTimer = function () {
  timer.stop();
  mainTimerSetup.setTimerValues(0, 0, 0);
  mainTimerSetup.renderTimerValues(countdownDisplay);
  resetLocalStorage(`${countdownDisplay.id}-storage`);
};

const stopDelayTimer = function () {
  delayControls.stopDelayTimer();
  delayTimerSetup.setTimerValues(0, 0, 0);
  delayTimerSetup.renderTimerValues(delayTimerDisplay);
  resetLocalStorage(`${delayTimerDisplay.id}-storage`);
};

timer.addEventListener('secondTenthsUpdated', () => {
  countdownDisplay.innerText = timer.getTimeValues().toString();
});
timer.addEventListener('targetAchieved', () => {
  countdownDisplay.innerText = "Time's Up!!";
  if (delayTimerDisplay.innerText === '00:00:00') return;
  delayControls.startDelayTimer();
});
timerControls.startBtn.addEventListener('click', () => {
  if (mainTimerSetupModal.timeNewlySet === true) timer.stop();
  if (delayTimerSetupModal.timeNewlySet === true) delayTimer.stop();
  if (delayTimer.isPaused()) delayControls.resetDelayTimer();
  mainTimerSetupModal.timeNewlySet = false;
  delayTimerSetupModal.timeNewlySet = false;
  startTimer(...Object.values(mainTimerSetup));
});
timerControls.pauseBtn.addEventListener('click', pauseTimer);
timerControls.resetBtn.addEventListener('click', resetTimer);
timerControls.nextBtn.addEventListener('click', nextTimer);
timerControls.stopBtn.addEventListener('click', stopTimer);
timerControls.setTimerBtn.addEventListener('click', () => {
  if (timer.isRunning()) timer.pause();
  if (delayTimer.isRunning()) delayTimer.pause();
  mainTimerSetupModal.openSetTimerModal();
  mainTimerSetupModal.assignTimerType(mainTimerSetupModal);
});
timerControls.setDelayBtn.addEventListener('click', () => {
  if (timer.isRunning()) timer.pause();
  if (delayTimer.isRunning()) delayTimer.pause();
  delayTimerSetupModal.openSetTimerModal();
  delayTimerSetupModal.assignTimerType(delayTimerSetupModal);
});
timerControls.editTotalTimeBtn.addEventListener('click', openEditCounterModal);
