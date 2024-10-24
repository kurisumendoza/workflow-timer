import { timerValues } from './timerSetup';

let totalTimeInSeconds = 0;

const totalTimeDisplay = document.getElementById('total-time');

export const totalTimeCounter = function () {
  totalTimeInSeconds +=
    Number(timerValues.hours) * 3600 +
    Number(timerValues.minutes) * 60 +
    Number(timerValues.seconds);
};

const calculateTotalTime = function () {
  const hours = Math.floor(totalTimeInSeconds / 3600);
  const minutes = Math.floor((totalTimeInSeconds - hours * 3600) / 60);
  const seconds = totalTimeInSeconds - hours * 3600 - minutes * 60;

  return { hours, minutes, seconds };
};

export const displayTotalTime = function () {
  const time = calculateTotalTime();

  totalTimeDisplay.innerText = `${time.hours
    .toString()
    .padStart(2, '0')}:${time.minutes
    .toString()
    .padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`;
};
