import { mainTimerSetup } from './timerSetup';
import { totalTimeDisplay } from './domElements';

export const counterValues = {
  totalTimeInSeconds: 0,
  timeToAddInSeconds: 0,
  isNewTimeAdded: false,
};

const convertTimeToAddToSeconds = function () {
  counterValues.timeToAddInSeconds =
    Number(mainTimerSetup.hours) * 3600 +
    Number(mainTimerSetup.minutes) * 60 +
    Number(mainTimerSetup.seconds);
};

const updateTotalTimeInSeconds = function () {
  counterValues.totalTimeInSeconds += counterValues.timeToAddInSeconds;
  counterValues.isNewTimeAdded = true;
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
