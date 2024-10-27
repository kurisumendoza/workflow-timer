import { countdownDisplay, setupModalEl } from './domElements';
import { mainTimerSetup } from './timerSetup';

export class TimerSetupModal {
  constructor(defaultTime, warningMsg, mainDisplay, modalDisplay) {
    this.defaultTime = defaultTime;
    this.warningMsg = warningMsg;
    this.mainDisplay = mainDisplay;
    this.modalDisplay = modalDisplay;
    this.setModalDisplayValue();
  }

  openSetTimerModal() {
    setupModalEl.modal.showModal();
  }

  closeSetTimerModal() {
    !this.warningMsg.hidden && (this.warningMsg.hidden = true);
    setupModalEl.modal.close();
    this.defaultTime = '';
    this.setModalDisplayValue();
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

  setTimerConfirm(timer) {
    if (Number(this.defaultTime) > 240000) {
      this.warningMsg.hidden && (this.warningMsg.hidden = false);
      return;
    }
    timer.renderSetTimer(this.mainDisplay, this.modalDisplay);
    this.closeSetTimerModal();
  }
}

export const mainTimerSetupModal = new TimerSetupModal(
  '',
  setupModalEl.warningMsg,
  countdownDisplay,
  setupModalEl.setupDisplay
);

setupModalEl.deleteInputBtn.addEventListener('click', () =>
  mainTimerSetupModal.setTimerDeleteInput()
);
setupModalEl.cancelBtn.addEventListener('click', () =>
  mainTimerSetupModal.closeSetTimerModal()
);
setupModalEl.confirmBtn.addEventListener('click', () =>
  mainTimerSetupModal.setTimerConfirm(mainTimerSetup)
);
setupModalEl.modal.addEventListener('click', (e) => {
  mainTimerSetupModal.setTimerByButtonInput(e);
});
