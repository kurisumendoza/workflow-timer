import {
  storageObj,
  saveToLocalStorage,
  loadLocalStorage,
} from './dataStorage';
import { countdownDisplay } from './domElements';

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
    mainDisplay.innerText = `${this.hours
      .toString()
      .padStart(2, '0')}:${this.minutes
      .toString()
      .padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`;
  }

  initializeSetup(mainDisplay, storage) {
    loadLocalStorage(`${mainDisplay.id}-storage`, storage);
    if (!storage) return;
    this.setTimerValues(...storage.value);
    this.renderTimerValues(mainDisplay);
    console.log(`${mainDisplay.id}-storage`);
  }
}

export const mainTimerSetup = new TimerSetup(0, 0, 0);

mainTimerSetup.initializeSetup(countdownDisplay, storageObj.mainTimer);
