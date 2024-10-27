import Timer from 'easytimer.js';
import { timer } from './timerControl';

const delayConfirmationModal = document.getElementById(
  'delay-timer-confirmation-modal'
);
const yesDelay = document.getElementById('delay-yes');
const noDelay = document.getElementById('delay-no');

const delayTimer = new Timer();

const delayTimerValues = {
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export const openDelayConfirmationModal = function () {
  delayConfirmationModal.showModal();
};

const renderDelayTimer = function () {};

const renderDelayTimerInModal = function () {};

yesDelay.addEventListener('click', renderDelayTimerInModal);
noDelay.addEventListener('click', () => delayConfirmationModal.close());
