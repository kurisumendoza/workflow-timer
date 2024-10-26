import {
  counterValues,
  totalTimeDisplay,
  renderTotalTime,
} from './timerCounter';

const editCounterModal = document.getElementById('edit-timer-counter-modal');
const totalTimeDisplayInModal = document.getElementById(
  'modal-total-time-display'
);
const deleteLastEntryBtn = document.getElementById('counter-modal-revert-btn');
const closeEditCounterModalBtn = document.getElementById(
  'counter-modal-close-btn'
);
const resetTotalTimeBtn = document.getElementById('counter-modal-reset-btn');
const resetConfirmationModal = document.getElementById('counter-reset-modal');
const yesResetConfirmationBtn = document.getElementById(
  'counter-reset-yes-btn'
);
const noResetConfirmationBtn = document.getElementById('counter-reset-no-btn');

export const openEditCounterModal = function () {
  editCounterModal.showModal();
  renderTotalTimeInModal();
};

const renderTotalTimeInModal = function () {
  totalTimeDisplayInModal.innerText = totalTimeDisplay.innerText;
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
  resetConfirmationModal.close();
  editCounterModal.close();
};

deleteLastEntryBtn.addEventListener('click', deleteLastEntry);
closeEditCounterModalBtn.addEventListener('click', () =>
  editCounterModal.close()
);
resetTotalTimeBtn.addEventListener('click', () =>
  resetConfirmationModal.showModal()
);
yesResetConfirmationBtn.addEventListener('click', resetTotalTimeCounter);
noResetConfirmationBtn.addEventListener('click', () =>
  resetConfirmationModal.close()
);
