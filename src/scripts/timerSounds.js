import shortAlertSound from '../assets/sounds/main-alert.mp3';
import fullAlarmSound from '../assets/sounds/main-alarm.mp3';

const shortAlert = new Audio(shortAlertSound);
const fullAlarm = new Audio(fullAlarmSound);

export const playShortAlert = function () {
  shortAlert.play();
};

export const playFullAlarm = function () {
  fullAlarm.play();
};

export const stopFullAlarm = function () {
  fullAlarm.pause();
  fullAlarm.currentTime = 0;
};
