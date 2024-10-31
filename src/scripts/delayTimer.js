import Timer from 'easytimer.js';
import { TimerSetup } from './timerSetup';
import { TimerSetupModal } from './timerSetupModal';
import { delayTimerDisplay, setupModalEl } from './domElements';

const delayTimer = new Timer();
const delayTimerSetup = new TimerSetup(0, 0, 0);
export const delayTimerSetupModal = new TimerSetupModal(
  '',
  setupModalEl.warningMsg,
  delayTimerSetup,
  delayTimerDisplay,
  setupModalEl.delayDisplay
);

export const renderDelayTimer = function () {};

const renderDelayTimerInModal = function () {};

// TODO Display Delay Timer in UI by utilizing the TimerSetup class
