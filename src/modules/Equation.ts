class Equation {
  private equation: Array<Array<string>>;
  private _row: number;

  constructor() {
    this.clearEquation();
  }

  set row(value: number) {
    this._row = value;
  }

  addToRow(...text: string[]) {
    this.equation[this._row].push(...text);
  }

  addNewRow() {
    this._row++;
    this.equation[this._row] = new Array();
  }

  replaceOperator(newOperation: string) {
    const lastItem = this.equation[this._row].length - 1;
    this.equation[this._row][lastItem] = newOperation;
  }

  getResult() {
    let j: number, k: number;
    let total = 0;
    let rowTotal = 0;

    const n = this.equation.length;
    for (j = 0; j < n; j++) {
      const m = this.equation[j].length;
      for (k = 1; k < m; k += 2) {
        const operation = this.equation[j][k];
        if (k === 1) {
          const leftOperand = Number(this.equation[j][k - 1]);
          const rightOperand = Number(this.equation[j][k + 1]);

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
            rowTotal *= Number(this.equation[j][k + 1]);
            break;
          case "/":
            rowTotal /= Number(this.equation[j][k + 1]);
            break;
        }
      }

      if (m === 1) {
        rowTotal = Number(this.equation[j][k - 1]); // last row, should only contain (1) number
      }

      if (j === 0) {
        total = rowTotal;
        continue;
      }

      const prevRow = j - 1;
      const prevRowLastColumn = this.equation[prevRow].length - 1;
      const prevRowOperation = this.equation[prevRow][prevRowLastColumn];
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
    this.equation = new Array();
    this._row = 0;
    this.equation[this._row] = new Array();
  }
}

export default Equation;
