import { mainTimerSetup } from './timerSetup';
import { totalTimeDisplay } from './domElements';
import { convertTimeToSeconds, renderTotalTime } from './timerHelpers';
import {
  storageObj,
  saveToLocalStorage,
  loadLocalStorage,
} from './dataStorage';

export const counterValues = {
  totalTimeInSeconds: 0,
  timeToAddInSeconds: 0,
  isNewTimeAdded: false,
};

const updateTotalTimeInSeconds = function () {
  counterValues.totalTimeInSeconds += counterValues.timeToAddInSeconds;
  counterValues.isNewTimeAdded = true;

  saveToLocalStorage('total-time-counter', counterValues);
};

export const updateTotalTimeCounter = function () {
  counterValues.timeToAddInSeconds = convertTimeToSeconds(mainTimerSetup);
  updateTotalTimeInSeconds();
  renderTotalTime(counterValues.totalTimeInSeconds, totalTimeDisplay);
};

const initializeCounter = function () {
  loadLocalStorage('total-time-counter', storageObj.counter);
  if (!storageObj.counter.value) return;
  Object.assign(counterValues, storageObj.counter.value);
  renderTotalTime(counterValues.totalTimeInSeconds, totalTimeDisplay);
};
initializeCounter();
