class Equation {
  private _equation: Array<Array<string>>;
  private _row: number;

  constructor() {
    this.clearEquation();
  }

  get row() {
    return this._row;
  }

  set row(value: number) {
    this._row = value;
  }

  push(...text: string[]) {
    this._equation[this._row].push(...text);
  }

  addNewRow() {
    this._row++;
    this._equation[this._row] = new Array();
  }

  replaceLastSymbol(newOperation: string) {
    const lastItem = this._equation[this._row].length - 1;
    this._equation[this._row][lastItem] = newOperation;
  }

  getResult() {
    let j: number, k: number;
    let total = 0;
    let rowTotal = 0;

    const n = this._equation.length;
    for (j = 0; j < n; j++) {
      const m = this._equation[j].length;
      for (k = 1; k < m; k += 2) {
        const operation = this._equation[j][k];
        if (k === 1) {
          const leftOperand = Number(this._equation[j][k - 1]);
          const rightOperand = Number(this._equation[j][k + 1]);

          switch (operation) {
            case "x":
              rowTotal = leftOperand * rightOperand;
              break;
            case "/":
              rowTotal = leftOperand / rightOperand;
              break;
            default:
              rowTotal = leftOperand;
          }
          continue;
        }

        switch (operation) {
          case "x":
            rowTotal *= Number(this._equation[j][k + 1]);
            break;
          case "/":
            rowTotal /= Number(this._equation[j][k + 1]);
            break;
        }
      }

      if (m === 1) {
        rowTotal = Number(this._equation[j][k - 1]); // last row, should only contain (1) number
      }

      if (j === 0) {
        total = rowTotal;
        continue;
      }

      const prevRow = j - 1;
      const prevRowLastColumn = this._equation[prevRow].length - 1;
      const prevRowOperation = this._equation[prevRow][prevRowLastColumn];
      if (prevRowOperation === "+") {
        total += rowTotal;
      }

      if (prevRowOperation === "-") {
        total -= rowTotal;
      }
    }
    return total.toString();
  }

  clearEquation() {
    this._equation = new Array();
    this._row = 0;
    this._equation[this._row] = new Array();
  }
}

export default Equation;
