import CalculatorManager from "./modules/CalculatorManager";
import switchTheme from "./modules/switchTheme";

const THEMES_AMOUNT = 3;

const toggleCircle = document.getElementById("toggle");
const toggleContainer = document.getElementById("toggle-container");
const themeInputs = document.querySelectorAll("input[type='radio'][id]");

new CalculatorManager();

//  ========== [Handling theme switching] ==========
let themeNo = +document.body.className.split("-")[1];
toggleContainer.addEventListener("click", () => {
  const curClass = `theme-${themeNo}`;
  themeNo = themeNo % THEMES_AMOUNT;
  const nextClass = `theme-${++themeNo}`;

  switchTheme(curClass, nextClass, toggleCircle);
});

themeInputs.forEach(input => {
  input.addEventListener("change", () => {
    switchTheme(document.body.className, input.id, toggleCircle);
  });
});
