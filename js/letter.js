export class LetterState {
  constructor() {
    this.isOpen = false;
    this.isTyped = false;
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  setTyped(val) {
    this.isTyped = val;
  }
}
