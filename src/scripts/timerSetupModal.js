import { renderSetTimer } from './timerSetup';

const setTimerModal = document.getElementById('set-timer-modal');
const setTimerModalDisplay = document.getElementById('set-timer-modal-display');
const setTimerDeleteInputBtn = document.getElementById('delete');
const setTimerWarningMessage = document.getElementById('warning');
const setTimerCancelBtn = document.getElementById('cancel');
const setTimerConfirmBtn = document.getElementById('confirm');

let defaultTimeSet = '';

export const openSetTimerModal = function () {
  setTimerModal.showModal();
};

const closeSetTimerModal = function () {
  !setTimerWarningMessage.hidden && (setTimerWarningMessage.hidden = true);
  setTimerModal.close();
  defaultTimeSet = '';
  setTimerModalDisplayValue();
};

const setTimerModalDisplayValue = function () {
  setTimerModalDisplay.innerText = defaultTimeSet
    .padStart(6, '0')
    .replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3');
};

const setTimerByButtonInput = function (e) {
  if (!e.target.dataset.number) return;
  if (defaultTimeSet.length >= 6) return;
  defaultTimeSet += e.target.dataset.number;
  setTimerModalDisplayValue();
};
setTimerModalDisplayValue();

const setTimerDeleteInput = function () {
  !setTimerWarningMessage.hidden && (setTimerWarningMessage.hidden = true);
  defaultTimeSet = defaultTimeSet.slice(0, -1);
  setTimerModalDisplayValue();
};

const setTimerConfirm = function () {
  if (defaultTimeSet > 240000) {
    setTimerWarningMessage.hidden && (setTimerWarningMessage.hidden = false);
    return;
  }
  renderSetTimer(setTimerModalDisplay.innerText);
  closeSetTimerModal();
};

setTimerDeleteInputBtn.addEventListener('click', setTimerDeleteInput);
setTimerCancelBtn.addEventListener('click', closeSetTimerModal);
setTimerConfirmBtn.addEventListener('click', setTimerConfirm);
setTimerModal.addEventListener('click', (e) => {
  setTimerByButtonInput(e);
});
