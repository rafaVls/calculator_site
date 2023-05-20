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
  private lastSymbol: string;
  private equation: Equation;
  private bigScreen: BigScreen;
  private smallScreen: SmallScreen;

  constructor() {
    this.lastSymbol = "";
    this.equation = new Equation();
    this.bigScreen = new BigScreen(BIG_SCREEN_ID);
    this.smallScreen = new SmallScreen(SMALL_SCREEN_ID);

    const calculatorButtons = new CalculatorButtons();
    const numberButtons = calculatorButtons.getNumberButtons();
    const operatorButtons = calculatorButtons.getOperatorButtons();

    const dotButton = calculatorButtons.buttons.find(btn => btn.id === DOT_BUTTON_ID);
    const resetButton = calculatorButtons.buttons.find(btn => btn.id === RESET_BUTTON_ID);
    const deleteButton = calculatorButtons.buttons.find(
      btn => btn.id === DELETE_BUTTON_ID
    );

    numberButtons.forEach(btn =>
      btn.elem.addEventListener("click", () => this.bigScreen.write(btn.textContent))
    );

    operatorButtons.forEach(btn =>
      btn.elem.addEventListener("click", () => this.operatorHandler(btn))
    );

    resetButton.elem.addEventListener("click", () => this.reset());
    dotButton.elem.addEventListener("click", () => this.bigScreen.insertDecimal());
    deleteButton.elem.addEventListener("click", () =>
      this.bigScreen.deleteLastCharacter()
    );
  }

  private operatorHandler(button: Button) {
    const btnText = button.textContent;

    if (btnText === "=") {
      this.equation.addToRow(this.bigScreen.text);
      const result = this.equation.getResult();

      this.reset();
      this.bigScreen.text = result;
      return;
    }

    if (this.bigScreen.text === "0" && !this.smallScreen.isEmpty()) {
      this.smallScreen.replaceLastSymbol(this.lastSymbol, btnText);

      if (this.lastSymbol === "+" || this.lastSymbol === "-") {
        this.equation.row--;
      }

      this.lastSymbol = btnText;
      this.equation.replaceOperator(this.lastSymbol);

      if (this.lastSymbol === "+" || this.lastSymbol === "-") {
        this.equation.addNewRow();
      }
      return;
    }

    if (this.bigScreen.text === "0") {
      return;
    }

    this.lastSymbol = btnText;
    if (this.lastSymbol === "+" || this.lastSymbol === "-") {
      this.equation.addToRow(this.bigScreen.text, this.lastSymbol);
      this.equation.addNewRow();
    } else {
      this.equation.addToRow(this.bigScreen.text, this.lastSymbol);
    }

    this.smallScreen.text += this.bigScreen.text + " " + this.lastSymbol + " ";
    this.bigScreen.text = "0";
  }

  private reset() {
    this.lastSymbol = "";
    this.equation.clearEquation();
    this.bigScreen.text = "0";
    this.smallScreen.text = "";
  }
}

export default CalculatorManager;
