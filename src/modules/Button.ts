class Button {
  elem: HTMLButtonElement;

  constructor(htmlButton: HTMLButtonElement) {
    this.elem = htmlButton;
  }

  get id() {
    return this.elem.id;
  }

  get textContent() {
    return this.elem.textContent;
  }

  keyBind(key: string) {
    document.addEventListener("keydown", e => {
      if (e.key === "/") {
        e.preventDefault();
      }

      if (key === e.key) {
        this.elem.click();
      }
    });
  }
}

export default Button;
