import { updateTotalTimeInSeconds, counterValues } from './timerCounter';
import { totalTimeDisplay, counterModalEl } from './domElements';
import { saveToLocalStorage, resetLocalStorage } from './dataStorage';
import { renderTotalTime } from './timerHelpers';

export const openEditCounterModal = function () {
  counterModalEl.modal.showModal();
  renderTotalTimeInModal();
};

const renderTotalTimeInModal = function () {
  counterModalEl.totalDisplay.innerText = totalTimeDisplay.innerText;
};

const addNewEntry = function () {
  if (counterValues.addEntryLimit) return;
  updateTotalTimeInSeconds();
  counterValues.addEntryLimit = true;
  renderTotalTime(counterValues.totalTimeInSeconds, totalTimeDisplay);
  renderTotalTimeInModal();
  saveToLocalStorage('total-time-counter', counterValues);
};

const deleteLastEntry = function () {
  if (!counterValues.isNewTimeAdded) return;
  counterValues.totalTimeInSeconds -= counterValues.timeToAddInSeconds;
  counterValues.isNewTimeAdded = false;
  counterValues.addEntryLimit = false;
  renderTotalTime(counterValues.totalTimeInSeconds, totalTimeDisplay);
  renderTotalTimeInModal();
  saveToLocalStorage('total-time-counter', counterValues);
};

const resetTotalTimeCounter = function () {
  counterValues.totalTimeInSeconds = 0;
  counterValues.timeToAddInSeconds = 0;
  counterValues.isNewTimeAdded = false;
  renderTotalTime(counterValues.totalTimeInSeconds, totalTimeDisplay);
  renderTotalTimeInModal();
  counterModalEl.confirmResetModal.close();
  counterModalEl.modal.close();
  resetLocalStorage('total-time-counter');
};

counterModalEl.addNewBtn.addEventListener('click', addNewEntry);
counterModalEl.deleteLastBtn.addEventListener('click', deleteLastEntry);
counterModalEl.closeBtn.addEventListener('click', () =>
  counterModalEl.modal.close()
);
counterModalEl.resetBtn.addEventListener('click', () =>
  counterModalEl.confirmResetModal.showModal()
);
counterModalEl.resetYesBtn.addEventListener('click', resetTotalTimeCounter);
counterModalEl.resetNoBtn.addEventListener('click', () =>
  counterModalEl.confirmResetModal.close()
);
