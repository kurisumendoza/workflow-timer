import { openSetTimerModal } from './timerSetupModal';

const setTimerBtn = document.getElementById('set-timer-btn');

export class TimerSetup {
  constructor(hours, minutes, seconds) {
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }

  renderSetTimer(mainDisplay, modalDisplay) {
    const timeInput = modalDisplay.innerText.split(':');
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
}

export const mainTimerSetup = new TimerSetup(0, 0, 0);

setTimerBtn.addEventListener('click', openSetTimerModal);
