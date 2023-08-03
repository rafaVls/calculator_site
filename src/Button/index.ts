import { IButton, Listener } from "../types";

export default class Button implements IButton {
  private btnElement: HTMLButtonElement;

  constructor(btnElement: HTMLButtonElement) {
    this.btnElement = btnElement;
  }

  get id() {
    return this.btnElement.id;
  }

  get textContent() {
    return this.btnElement.textContent;
  }

  set textContent(text: string) {
    this.btnElement.textContent = text;
  }

  setClickListener(listener: Listener) {
    this.btnElement.addEventListener("click", listener);
  }
}

interface IButtons {
  find(buttonID: string): Button;
  setClickListener(listener: Listener): void;
}

export class NumberButtons implements IButtons {
  private nmbrButtons: Button[];

  constructor(btnElements: Button[]) {
    btnElements.forEach(btn => this.push(btn));
  }

  private push(button: Button) {
    if (!Number.isNaN(button.textContent)) {
      this.nmbrButtons.push(button);
    }
  }

  find(buttonID: string): Button {
    return this.nmbrButtons.find(btn => btn.id === buttonID);
  }

  setClickListener(listener: Listener) {
    this.nmbrButtons.forEach(btn => btn.setClickListener(listener));
  }
}

export class OperatorButtons implements IButtons {
  private oprtrButtons: Button[];
  private oprtrSymbols: string[];

  constructor(btnElements: Button[]) {
    btnElements.forEach(btn => this.push(btn));
    this.oprtrSymbols = ["+", "-", "x", "/", "="];
  }

  private push(button: Button) {
    if (this.oprtrSymbols.includes(button.textContent)) {
      this.oprtrButtons.push(button);
    }
  }

  find(buttonID: string): Button {
    return this.oprtrButtons.find(btn => btn.id === buttonID);
  }

  setClickListener(listener: Listener) {
    this.oprtrButtons.forEach(btn => btn.setClickListener(listener));
  }
}
