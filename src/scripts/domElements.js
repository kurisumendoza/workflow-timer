export const countdownDisplay = document.getElementById('countdown-display');
export const delayTimerDisplay = document.getElementById(
  'delay-countdown-display'
);
export const totalTimeDisplay = document.getElementById('total-time');

export const timerControls = {
  startBtn: document.getElementById('start'),
  pauseBtn: document.getElementById('pause'),
  resetBtn: document.getElementById('reset'),
  nextBtn: document.getElementById('next'),
  stopBtn: document.getElementById('stop'),
  setTimerBtn: document.getElementById('set-timer-btn'),
  setDelayBtn: document.getElementById('set-delay-btn'),
  editTotalTimeBtn: document.getElementById('edit-timer-counter-btn'),
};

export const setupModalEl = {
  modal: document.getElementById('set-timer-modal'),
  setupDisplay: document.getElementById('set-timer-modal-display'),
  delayDisplay: document.getElementById('delay-timer-modal-display'),
  deleteInputBtn: document.getElementById('delete'),
  warningMsg: document.getElementById('warning'),
  cancelBtn: document.getElementById('cancel'),
  confirmBtn: document.getElementById('confirm'),
};

export const counterModalEl = {
  modal: document.getElementById('edit-timer-counter-modal'),
  totalDisplay: document.getElementById('modal-total-time-display'),
  deleteLastBtn: document.getElementById('counter-modal-revert-btn'),
  closeBtn: document.getElementById('counter-modal-close-btn'),
  resetBtn: document.getElementById('counter-modal-reset-btn'),
  confirmResetModal: document.getElementById('counter-reset-modal'),
  resetYesBtn: document.getElementById('counter-reset-yes-btn'),
  resetNoBtn: document.getElementById('counter-reset-no-btn'),
};
