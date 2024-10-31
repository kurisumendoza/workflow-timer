import {
  storageObj,
  saveToLocalStorage,
  loadLocalStorage,
} from './dataStorage';
import { countdownDisplay } from './domElements';
import { convertTimeToSeconds, renderTotalTime } from './timerHelpers';

export class TimerSetup {
  constructor(hours, minutes, seconds) {
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }

  renderSetTimer(mainDisplay, modalDisplay) {
    const timeInput = modalDisplay.innerText.split(':');
    saveToLocalStorage(`${mainDisplay.id}-storage`, timeInput);
    this.setTimerValues(...timeInput);
    this.renderTimerValues(mainDisplay);
  }

  setTimerValues(hour, min, sec) {
    this.hours = hour;
    this.minutes = min;
    this.seconds = sec;
  }

  renderTimerValues(mainDisplay) {
    const time = convertTimeToSeconds(this);
    renderTotalTime(time, mainDisplay);
  }

  initializeSetup(mainDisplay, storage) {
    loadLocalStorage(`${mainDisplay.id}-storage`, storage);
    if (!storage.value) return;
    this.setTimerValues(...storage.value);
    this.renderTimerValues(mainDisplay);
  }
}

export const mainTimerSetup = new TimerSetup(0, 0, 0);

mainTimerSetup.initializeSetup(countdownDisplay, storageObj.mainTimer);
