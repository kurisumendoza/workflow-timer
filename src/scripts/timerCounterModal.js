import { counterValues, renderTotalTime } from './timerCounter';
import { totalTimeDisplay, counterModalEl } from './domElements';

export const openEditCounterModal = function () {
  counterModalEl.modal.showModal();
  renderTotalTimeInModal();
};

const renderTotalTimeInModal = function () {
  counterModalEl.totalDisplay.innerText = totalTimeDisplay.innerText;
};

const deleteLastEntry = function () {
  if (!counterValues.isNewTimeAdded) return;
  counterValues.totalTimeInSeconds -= counterValues.timeToAddInSeconds;
  counterValues.isNewTimeAdded = false;
  renderTotalTime();
  renderTotalTimeInModal();
};

const resetTotalTimeCounter = function () {
  counterValues.totalTimeInSeconds = 0;
  counterValues.timeToAddInSeconds = 0;
  counterValues.isNewTimeAdded = false;
  renderTotalTime();
  renderTotalTimeInModal();
  counterModalEl.confirmResetModal.close();
  counterModalEl.modal.close();
};

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
