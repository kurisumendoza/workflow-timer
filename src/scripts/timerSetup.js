import { countdownDisplay } from './timerControl';
import { openSetTimerModal } from './timerSetupModal';

const setTimerBtn = document.getElementById('set-timer-btn');

export const timerValues = {
  hours: 0,
  minutes: 0,
  seconds: 0,
};

const setTimer = function () {
  openSetTimerModal();
};

export const renderSetTimer = function (input) {
  const timeInput = input.split(':');
  setTimerValues(...timeInput);
  renderTimerValues();
};

export const setTimerValues = function (hour, min, sec) {
  timerValues.hours = hour;
  timerValues.minutes = min;
  timerValues.seconds = sec;
};

export const renderTimerValues = function () {
  countdownDisplay.innerText = `${timerValues.hours
    .toString()
    .padStart(2, '0')}:${timerValues.minutes
    .toString()
    .padStart(2, '0')}:${timerValues.seconds.toString().padStart(2, '0')}`;
};

setTimerBtn.addEventListener('click', setTimer);
