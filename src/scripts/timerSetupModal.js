import { countdownDisplay, setupModalEl } from './domElements';
import { mainTimerSetup } from './timerSetup';

export class TimerSetupModal {
  constructor(defaultTime, warningMsg, setup, mainDisplay, modalDisplay) {
    this.defaultTime = defaultTime;
    this.warningMsg = warningMsg;
    this.setup = setup;
    this.mainDisplay = mainDisplay;
    this.modalDisplay = modalDisplay;
    this.timerType = undefined;
    this.handleDelete = () => {};
    this.handleClose = () => {};
    this.handleConfirm = () => {};
    this.handleButtonInput = () => {};
    this.setModalDisplayValue();
  }

  openSetTimerModal() {
    setupModalEl.modal.showModal();
  }

  assignTimerType(timerType) {
    this.timerType = timerType;
    this.initializeTimerSetup();
  }

  closeSetTimerModal() {
    !this.warningMsg.hidden && (this.warningMsg.hidden = true);
    setupModalEl.modal.close();
    this.defaultTime = '';
    this.setModalDisplayValue();
    this.cleanEventListeners();
  }

  setModalDisplayValue() {
    this.modalDisplay.innerText = this.defaultTime
      .padStart(6, '0')
      .replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3');
  }

  setTimerByButtonInput(e) {
    if (!e.target.dataset.number) return;
    if (this.defaultTime.length >= 6) return;
    this.defaultTime += e.target.dataset.number;
    this.setModalDisplayValue();
  }

  setTimerDeleteInput() {
    !this.warningMsg.hidden && (this.warningMsg.hidden = true);
    this.defaultTime = this.defaultTime.slice(0, -1);
    this.setModalDisplayValue();
  }

  setTimerConfirm() {
    if (Number(this.defaultTime) > 240000) {
      this.warningMsg.hidden && (this.warningMsg.hidden = false);
      return;
    }
    this.setup.renderSetTimer(this.mainDisplay, this.modalDisplay);
    this.closeSetTimerModal();
  }

  initializeTimerSetup() {
    this.setupHandlers();
    this.setupEventListeners();
  }

  setupHandlers() {
    this.handleDelete = () => this.timerType.setTimerDeleteInput();
    this.handleClose = () => this.timerType.closeSetTimerModal();
    this.handleConfirm = () => this.timerType.setTimerConfirm();
    this.handleButtonInput = (e) => this.timerType.setTimerByButtonInput(e);
  }

  setupEventListeners() {
    setupModalEl.deleteInputBtn.addEventListener('click', this.handleDelete);
    setupModalEl.cancelBtn.addEventListener('click', this.handleClose);
    setupModalEl.confirmBtn.addEventListener('click', this.handleConfirm);
    setupModalEl.modal.addEventListener('click', this.handleButtonInput);
  }

  cleanEventListeners() {
    setupModalEl.deleteInputBtn.removeEventListener('click', this.handleDelete);
    setupModalEl.cancelBtn.removeEventListener('click', this.handleClose);
    setupModalEl.confirmBtn.removeEventListener('click', this.handleConfirm);
    setupModalEl.modal.removeEventListener('click', this.handleButtonInput);
  }
}

export const mainTimerSetupModal = new TimerSetupModal(
  '',
  setupModalEl.warningMsg,
  mainTimerSetup,
  countdownDisplay,
  setupModalEl.setupDisplay
);
