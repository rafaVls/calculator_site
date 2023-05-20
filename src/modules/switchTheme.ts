function switchTheme(currentTheme: string, nextTheme: string, toggleElem: HTMLElement) {
  toggleElem.classList.replace(currentTheme, nextTheme);
  document.body.classList.replace(currentTheme, nextTheme);
}

export default switchTheme;
