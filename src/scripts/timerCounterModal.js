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

export const openEditCounterModal = function () {
  editCounterModal.showModal();
  renderTotalTimeInModal();
};

const renderTotalTimeInModal = function () {
  totalTimeDisplayInModal.innerText = totalTimeDisplay.innerText;
};

const deleteLastEntry = function () {
  counterValues.totalTimeInSeconds -= counterValues.timeToAddInSeconds;
  renderTotalTime();
  renderTotalTimeInModal();
};

deleteLastEntryBtn.addEventListener('click', deleteLastEntry);
closeEditCounterModalBtn.addEventListener('click', () =>
  editCounterModal.close()
);
