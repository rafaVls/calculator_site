import Button from "./Button";

class KeyBindManager {
  private _btns: Button[];

  constructor(calculatorButtons: Button[]) {
    this._btns = calculatorButtons;
    this.setupKeyBinds();
  }

  setupKeyBinds() {
    this._btns.forEach(btn => {
      switch (btn.textContent) {
        case "x":
          btn.keyBind("x");
          btn.keyBind("*");
          break;
        case "=":
          btn.keyBind("=");
          btn.keyBind("Enter");
          break;
        case "DEL":
          btn.keyBind("Backspace");
          break;
        case "RESET":
          btn.keyBind("Escape");
          break;
        default:
          btn.keyBind(btn.textContent);
          break;
      }
    });
  }
}

export default KeyBindManager;
