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
    setModalDisplayValue();
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
    setModalDisplayValue();
  }

  setTimerDeleteInput() {
    !this.warningMsg.hidden && (this.warningMsg.hidden = true);
    this.defaultTime = this.defaultTime.slice(0, -1);
    setModalDisplayValue();
  }

  setTimerConfirm(timer) {
    if (this.defaultTime > 240000) {
      this.warningMsg.hidden && (this.warningMsg.hidden = false);
      return;
    }
    timer.renderSetTimer(this.mainDisplay, this.modalDisplay);
    closeSetTimerModal();
  }
}
