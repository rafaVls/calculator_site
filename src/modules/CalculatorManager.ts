import Button from "./Button";
import Equation from "./Equation";
import CalculatorButtons from "./CalculatorButtons";
import { BigScreen, SmallScreen } from "./Screen";

const BIG_SCREEN_ID = "big-text";
const SMALL_SCREEN_ID = "small-text";

const RESET_BUTTON_ID = "RESET";
const DELETE_BUTTON_ID = "DEL";
const DOT_BUTTON_ID = "DOT";

class CalculatorManager {
  private _lastSymbol: string;
  private _equation: Equation;
  private _bigScreen: BigScreen;
  private _smallScreen: SmallScreen;

  constructor() {
    this._lastSymbol = "";
    this._equation = new Equation();
    this._bigScreen = new BigScreen(BIG_SCREEN_ID);
    this._smallScreen = new SmallScreen(SMALL_SCREEN_ID);

    const calculatorButtons = new CalculatorButtons();
    const numberButtons = calculatorButtons.getNumberButtons();
    const operatorButtons = calculatorButtons.getOperatorButtons();
    const dotButton = calculatorButtons.getButton(DOT_BUTTON_ID);
    const resetButton = calculatorButtons.getButton(RESET_BUTTON_ID);
    const deleteButton = calculatorButtons.getButton(DELETE_BUTTON_ID);

    numberButtons.forEach(btn =>
      btn.setClickListener(() => this._bigScreen.write(btn.textContent))
    );
    operatorButtons.forEach(btn =>
      btn.setClickListener(() => this._operatorHandler(btn))
    );
    resetButton.setClickListener(() => this.reset());
    dotButton.setClickListener(() => this._bigScreen.insertDecimal());
    deleteButton.setClickListener(() => this._bigScreen.deleteLastCharacter());
  }

  private _operatorHandler(button: Button) {
    const btnText = button.textContent;

    if (btnText === "=") {
      this._equation.push(this._bigScreen.text);
      const result = this._equation.getResult();

      this.reset();
      this._bigScreen.text = result;
      return;
    }

    if (this._bigScreen.text === "0" && !this._smallScreen.isEmpty) {
      this._smallScreen.replaceLastSymbol(this._lastSymbol, btnText);

      if (this._lastSymbol === "+" || this._lastSymbol === "-") {
        this._equation.row--;
      }

      this._lastSymbol = btnText;
      this._equation.replaceLastSymbol(this._lastSymbol);

      if (this._lastSymbol === "+" || this._lastSymbol === "-") {
        this._equation.addNewRow();
      }
      return;
    }

    if (this._bigScreen.text === "0") {
      return;
    }

    this._lastSymbol = btnText;
    if (this._lastSymbol === "+" || this._lastSymbol === "-") {
      this._equation.push(this._bigScreen.text, this._lastSymbol);
      this._equation.addNewRow();
    } else {
      this._equation.push(this._bigScreen.text, this._lastSymbol);
    }

    this._smallScreen.text += this._bigScreen.text + " " + this._lastSymbol + " ";
    this._bigScreen.text = "0";
  }

  private reset() {
    this._lastSymbol = "";
    this._equation.clearEquation();
    this._bigScreen.text = "0";
    this._smallScreen.text = "";
  }
}

export default CalculatorManager;
