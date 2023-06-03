class Button {
  private _elem: HTMLButtonElement;

  constructor(htmlButton: HTMLButtonElement) {
    this._elem = htmlButton;
  }

  get id() {
    return this._elem.id;
  }

  get textContent() {
    return this._elem.textContent;
  }

  set textContent(text: string) {
    this._elem.textContent = text;
  }

  setClickListener(listener: (ev: MouseEvent) => void) {
    this._elem.addEventListener("click", listener);
  }

  keyBind(key: string) {
    document.addEventListener("keydown", e => {
      if (e.key === "/") {
        e.preventDefault();
      }

      if (key === e.key) {
        this._elem.click();
      }
    });
  }
}

export default Button;
