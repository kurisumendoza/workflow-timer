import { Timer } from 'easytimer.js';
import {
  countdownDisplay,
  delayTimerDisplay,
  timerControls,
} from './domElements';
import { mainTimerSetup } from './timerSetup';
import { mainTimerSetupModal } from './timerSetupModal';
import {
  delayTimer,
  delayTimerSetup,
  delayTimerSetupModal,
  delayControls,
} from './delayTimer';
import { openEditCounterModal } from './timerCounterModal';
import { updateTotalTimeCounter } from './timerCounter';
import { playShortAlert, playFullAlarm, stopFullAlarm } from './timerSounds';
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
  if (countdownDisplay.innerText !== "TIME'S UP!!") return;
  mainTimerSetup.renderTimerValues(countdownDisplay);
  timer.reset();
  delayControls.resetDelayTimer();
  stopFullAlarm();
  updateTotalTimeCounter();
};

export const stopTimer = function () {
  stopMainTimer();
  stopDelayTimer();
  stopFullAlarm();
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

const reinitializeTimersOnTimeSet = function () {
  if (mainTimerSetupModal.timeNewlySet === true) timer.stop();
  if (delayTimerSetupModal.timeNewlySet === true) delayTimer.stop();
  if (delayTimer.isPaused()) delayControls.resetDelayTimer();
  mainTimerSetupModal.timeNewlySet = false;
  delayTimerSetupModal.timeNewlySet = false;
};

const pauseTimersOnTimerBeingSet = function () {
  if (timer.isRunning()) timer.pause();
  if (delayTimer.isRunning()) delayTimer.pause();
};

const playAlertSound = function () {
  if (delayTimerDisplay.innerText !== '00:00:00') playShortAlert();
  else playFullAlarm();
};

const initializeControlEventListeners = function () {
  timer.addEventListener('secondTenthsUpdated', () => {
    countdownDisplay.innerText = timer.getTimeValues().toString();
  });
  timer.addEventListener('targetAchieved', () => {
    countdownDisplay.innerText = "TIME'S UP!!";
    playAlertSound();
    if (delayTimerDisplay.innerText === '00:00:00') return;
    delayControls.startDelayTimer();
  });
  timerControls.startBtn.addEventListener('click', () => {
    reinitializeTimersOnTimeSet();
    startTimer(...Object.values(mainTimerSetup));
  });
  timerControls.pauseBtn.addEventListener('click', pauseTimer);
  timerControls.resetBtn.addEventListener('click', resetTimer);
  timerControls.nextBtn.addEventListener('click', nextTimer);
  timerControls.stopBtn.addEventListener('click', stopTimer);
  timerControls.setTimerBtn.addEventListener('click', () => {
    pauseTimersOnTimerBeingSet();
    mainTimerSetupModal.openSetTimerModal();
    mainTimerSetupModal.assignTimerType(mainTimerSetupModal);
  });
  timerControls.setDelayBtn.addEventListener('click', () => {
    pauseTimersOnTimerBeingSet();
    delayTimerSetupModal.openSetTimerModal();
    delayTimerSetupModal.assignTimerType(delayTimerSetupModal);
  });
  timerControls.editTotalTimeBtn.addEventListener(
    'click',
    openEditCounterModal
  );
};
initializeControlEventListeners();
