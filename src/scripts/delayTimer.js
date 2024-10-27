import Timer from 'easytimer.js';
import { timer } from './timerControl';
import { TimerSetup } from './timerSetup';
import { delayModalEl } from './domElements';

const delayTimer = new Timer();

const delayTimerSetup = new TimerSetup(0, 0, 0);
console.log(delayTimerSetup);

export const openDelayConfirmationModal = function () {
  delayModalEl.modal.showModal();
};

const renderDelayTimer = function () {};

const renderDelayTimerInModal = function () {};

delayModalEl.yesBtn.addEventListener('click', renderDelayTimerInModal);
delayModalEl.noBtn.addEventListener('click', () => delayModalEl.modal.close());
