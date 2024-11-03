import Timer from 'easytimer.js';
import { TimerSetup } from './timerSetup';
import { TimerSetupModal } from './timerSetupModal';
import { delayTimerDisplay, setupModalEl } from './domElements';
import { storageObj } from './dataStorage';
import { playFullAlarm } from './timerSounds';

export const delayTimer = new Timer();
export const delayTimerSetup = new TimerSetup(0, 0, 0);
export const delayTimerSetupModal = new TimerSetupModal(
  '',
  setupModalEl.warningMsg,
  delayTimerSetup,
  delayTimerDisplay,
  setupModalEl.delayDisplay
);

const startDelayTimer = function () {
  delayTimer.start({
    countdown: true,
    startValues: {
      hours: delayTimerSetup.hours,
      minutes: delayTimerSetup.minutes,
      seconds: delayTimerSetup.seconds,
    },
    precision: 'secondTenths',
  });
};

const pauseDelayTimer = function () {
  delayTimer.pause();
};

const resetDelayTimer = function () {
  delayTimer.reset();
  delayTimerSetup.renderTimerValues(delayTimerDisplay);
  pauseDelayTimer();
};

const stopDelayTimer = function () {
  delayTimer.stop();
};

delayTimerSetup.initializeSetup(delayTimerDisplay, storageObj.delayTimer);

export const delayControls = {
  startDelayTimer,
  resetDelayTimer,
  stopDelayTimer,
};

delayTimer.addEventListener('secondTenthsUpdated', () => {
  delayTimerDisplay.innerText = delayTimer.getTimeValues().toString();
});

delayTimer.addEventListener('targetAchieved', playFullAlarm);
