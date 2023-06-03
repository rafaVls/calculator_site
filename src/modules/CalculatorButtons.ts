import KeyBindManager from "./KeyBindManager";
import Button from "./Button";

const AMOUNT_OF_NUMBER_BUTTONS = 10;
const BUTTON_ELEMENTS = Array.from(
  document.getElementById("keypad").children
) as HTMLButtonElement[];

class CalculatorButtons {
  private _buttons: Button[];

  constructor() {
    this._buttons = BUTTON_ELEMENTS.map(elem => new Button(elem));
    this._buttons.sort(this._sortByText);
    new KeyBindManager(this._buttons);
  }

  getNumberButtons(): Button[] {
    const indexOfOne = this._buttons.findIndex(btn => btn.textContent === "0");
    const numberButtons = this._buttons.splice(indexOfOne, AMOUNT_OF_NUMBER_BUTTONS);
    return numberButtons;
  }

  getOperatorButtons(): Button[] {
    const operatorButtons = this._buttons.filter(btn =>
      this._isOperator(btn.textContent)
    );
    this._buttons = this._buttons.filter(btn => !operatorButtons.includes(btn));
    return operatorButtons;
  }

  getButton(buttonID: string): Button {
    return this._buttons.find(btn => btn.id === buttonID);
  }

  private _isOperator(textContent: string): boolean {
    const operatorSymbols = ["+", "-", "x", "/", "="];
    if (operatorSymbols.includes(textContent)) {
      return true;
    }
    return false;
  }

  private _sortByText(firstComparison: Button, secondComparison: Button) {
    const fText = firstComparison.textContent;
    const sText = secondComparison.textContent;

    if (fText < sText) {
      return -1;
    }
    return 1;
  }
}

export default CalculatorButtons;
