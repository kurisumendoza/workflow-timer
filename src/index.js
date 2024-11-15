import './styles/main.css';
import {
  startTimer,
  pauseTimer,
  resetTimer,
  nextTimer,
  stopTimer,
} from './scripts/timerControl.js';
import { mainContainer, loader } from './scripts/domElements.js';

window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('loader-hidden');
  }, 3000);
  mainContainer.style.visibility = 'visible';
  document.body.removeChild(loader);
});
