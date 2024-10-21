import { countdownDisplay } from './timerControl';

const setTimerBtn = document.getElementById('set-timer-btn');

export const timerValues = {
  hour: 0,
  min: 0,
  sec: 0,
};

const setTimer = function () {
  const timeInput = prompt(
    "set timer separated with ':' (Example: 1:20:00)"
  ).split(':');
  setTimerValues(...timeInput);
};

const setTimerValues = function (hour, min, sec) {
  timerValues.hour = hour;
  timerValues.min = min;
  timerValues.sec = sec;
  console.log(hour, min, sec);
  countdownDisplay.innerText = `${hour.padStart(2, '0')}:${min.padStart(
    2,
    '0'
  )}:${sec.padStart(2, '0')}`;
};

setTimerBtn.addEventListener('click', setTimer);
