import { countdownDisplay } from './timerControl';

const setTimerBtn = document.getElementById('set-timer-btn');

export const timerValues = {
  hours: 0,
  minutes: 0,
  seconds: 0,
};

const setTimer = function () {
  const timeInput = prompt(
    "set timer separated with ':' (Example: 1:20:00)"
  ).split(':');
  setTimerValues(...timeInput);
  displayTimerValues();
};

export const setTimerValues = function (hour, min, sec) {
  timerValues.hours = hour;
  timerValues.minutes = min;
  timerValues.seconds = sec;
};

export const displayTimerValues = function () {
  countdownDisplay.innerText = `${timerValues.hours
    .toString()
    .padStart(2, '0')}:${timerValues.minutes
    .toString()
    .padStart(2, '0')}:${timerValues.seconds.toString().padStart(2, '0')}`;
};

setTimerBtn.addEventListener('click', setTimer);
