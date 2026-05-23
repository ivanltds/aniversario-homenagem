export class LetterState {
  constructor() {
    this.isOpen = false;
    this.isTyped = false;
    this.flowState = 'flower'; // 'flower' | 'letter' | 'transitioning' | 'hero'
  }

  open() {
    this.isOpen = true;
    this.setFlowState('letter');
  }

  close() {
    this.isOpen = false;
  }

  setTyped(val) {
    this.isTyped = val;
  }

  setFlowState(state) {
    const validStates = ['flower', 'letter', 'transitioning', 'hero'];
    if (validStates.includes(state)) {
      this.flowState = state;
    }
  }

  getFlowState() {
    return this.flowState;
  }
}
