class Screen {
  private _elem: HTMLElement;

  constructor(elementId: string) {
    this._elem = document.getElementById(elementId);
  }

  get text() {
    return this._elem.textContent;
  }

  set text(content: string) {
    this._elem.textContent = content;
  }

  get isEmpty() {
    return this.text.length < 1;
  }
}

class BigScreen extends Screen {
  write(text: string) {
    if (this.text === "0") {
      this.text = "";
    }
    this.text += text;
  }

  deleteLastCharacter() {
    if (this.text === "0") {
      return;
    }

    if (this.text.length === 1) {
      this.text = "0";
      return;
    }
    this.text = this.text.slice(0, -1);
  }

  insertDecimal() {
    if (this.text.includes(".")) {
      return;
    }
    this.text += ".";
  }
}

class SmallScreen extends Screen {
  replaceLastSymbol(toReplace: string, replaceWith: string) {
    const lastOccurrenceIndex = this.text.lastIndexOf(toReplace);
    const beginningToIndex = this.text.substring(0, lastOccurrenceIndex);
    const indexToEnd = this.text.substring(lastOccurrenceIndex + 1);
    this.text = beginningToIndex + replaceWith + indexToEnd;
  }
}

export { BigScreen, SmallScreen };
