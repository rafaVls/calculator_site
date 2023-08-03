export type Listener = (ev: MouseEvent | undefined) => void;

export interface IButton {
  textContent: string;
  readonly id: string;
  setClickListener(listener: Listener): void;
  //keyBind(key: string): void;
}
