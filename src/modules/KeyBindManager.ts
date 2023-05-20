import Button from "./Button";

class KeyBindManager {
  private btns: Button[];

  constructor(calculatorButtons: Button[]) {
    this.btns = calculatorButtons;
    this.setupKeyBinds();
  }

  setupKeyBinds() {
    this.btns.forEach(btn => {
      const tc = btn.elem.textContent;

      switch (tc) {
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
          btn.keyBind(tc);
          break;
      }
    });
  }
}

export default KeyBindManager;
