import { timerValues } from './timerSetup';
import { openEditCounterModal } from './timerCounterModal';

export const counterValues = {
  totalTimeInSeconds: 0,
  timeToAddInSeconds: 0,
};

export const totalTimeDisplay = document.getElementById('total-time');
const editTotalTimeBtn = document.getElementById('edit-timer-counter-btn');

const convertTimeToAddToSeconds = function () {
  counterValues.timeToAddInSeconds =
    Number(timerValues.hours) * 3600 +
    Number(timerValues.minutes) * 60 +
    Number(timerValues.seconds);
};

const updateTotalTimeInSeconds = function () {
  counterValues.totalTimeInSeconds += counterValues.timeToAddInSeconds;
};

const calculateTotalTime = function () {
  const hours = Math.floor(counterValues.totalTimeInSeconds / 3600);
  const minutes = Math.floor(
    (counterValues.totalTimeInSeconds - hours * 3600) / 60
  );
  const seconds =
    counterValues.totalTimeInSeconds - hours * 3600 - minutes * 60;

  return { hours, minutes, seconds };
};

export const renderTotalTime = function () {
  const time = calculateTotalTime();

  totalTimeDisplay.innerText = `${time.hours
    .toString()
    .padStart(2, '0')}:${time.minutes
    .toString()
    .padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`;
};

export const updateTotalTimeCounter = function () {
  convertTimeToAddToSeconds();
  updateTotalTimeInSeconds();
  renderTotalTime();
};

editTotalTimeBtn.addEventListener('click', openEditCounterModal);
