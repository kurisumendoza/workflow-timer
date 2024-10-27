import { countdownDisplay, setupModalEl } from './domElements';
import { mainTimerSetup } from './timerSetup';
import { openDelayConfirmationModal } from './delayTimer';

let defaultTimeSet = '';

export const openSetTimerModal = function () {
  setupModalEl.modal.showModal();
};

const closeSetTimerModal = function () {
  !setupModalEl.warningMsg.hidden && (setupModalEl.warningMsg.hidden = true);
  setupModalEl.modal.close();
  defaultTimeSet = '';
  setTimerModalDisplayValue();
};

const setTimerModalDisplayValue = function () {
  setupModalEl.setupDisplay.innerText = defaultTimeSet
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
  !setupModalEl.warningMsg.hidden && (setupModalEl.warningMsg.hidden = true);
  defaultTimeSet = defaultTimeSet.slice(0, -1);
  setTimerModalDisplayValue();
};

const setTimerConfirm = function () {
  if (defaultTimeSet > 240000) {
    setupModalEl.warningMsg.hidden && (setupModalEl.warningMsg.hidden = false);
    return;
  }
  mainTimerSetup.renderSetTimer(countdownDisplay, setupModalEl.setupDisplay);
  closeSetTimerModal();
};

setupModalEl.deleteInputBtn.addEventListener('click', setTimerDeleteInput);
setupModalEl.cancelBtn.addEventListener('click', closeSetTimerModal);
setupModalEl.confirmBtn.addEventListener('click', setTimerConfirm);
setupModalEl.modal.addEventListener('click', (e) => {
  setTimerByButtonInput(e);
});
setupModalEl.delayBtn.addEventListener('click', openDelayConfirmationModal);
