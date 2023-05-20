import KeyBindManager from "./KeyBindManager";
import Button from "./Button";

const AMOUNT_OF_NUMBER_BUTTONS = 10;
const BUTTON_ELEMENTS = Array.from(
  document.getElementById("keypad").children
) as HTMLButtonElement[];

class CalculatorButtons {
  buttons: Button[];

  constructor() {
    this.buttons = BUTTON_ELEMENTS.map(elem => new Button(elem));
    this.buttons.sort(this.sortByText);
    new KeyBindManager(this.buttons);
  }

  getNumberButtons(): Button[] {
    const indexOfOne = this.buttons.findIndex(btn => btn.elem.textContent === "0");
    const numberButtons = this.buttons.splice(indexOfOne, AMOUNT_OF_NUMBER_BUTTONS);
    return numberButtons;
  }

  getOperatorButtons(): Button[] {
    const operatorButtons = this.buttons.filter(btn =>
      this.isOperator(btn.elem.textContent)
    );
    this.buttons = this.buttons.filter(btn => !operatorButtons.includes(btn));
    return operatorButtons;
  }

  private isOperator(textContent: string): boolean {
    const operatorSymbols = ["+", "-", "x", "/", "="];
    if (operatorSymbols.includes(textContent)) {
      return true;
    }
    return false;
  }

  private sortByText(firstComparison: Button, secondComparison: Button) {
    const fText = firstComparison.elem.textContent;
    const sText = secondComparison.elem.textContent;

    if (fText < sText) {
      return -1;
    }
    return 1;
  }
}

export default CalculatorButtons;
