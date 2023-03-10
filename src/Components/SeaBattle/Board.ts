import { Ship, Miss, Damage, Mark } from "./Ship";
// eslint disable max-classes-per-file
interface Marked {
  color: string;
  id: number;
  name: string;
}

export class Cell {
  board: Board;

  x: number;

  y: number;

  mark: Marked;

  id: number;

  constructor(board: Board, x: number, y: number, mark: Marked) {
    this.board = board;
    this.x = x;
    this.y = y;
    this.mark = mark;
    this.id = Math.random() * 10;
  }
}

export class Board {
  cells: Cell[][] = [];

  initCells() {
    for (let i = 0; i < 10; i += 1) {
      const row: Cell[] = [];

      for (let j = 0; j < 10; j += 1) {
        row.push(
          new Cell(this, j, i, {
            color: "",
            id: 0,
            name: "",
          })
        );
      }

      this.cells.push(row);
    }
  }

  getCopy() {
    const newBoard = new Board();
    newBoard.cells = this.cells;

    return newBoard;
  }

  getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  createShip(x: number, y: number) {
    new Ship(this.getCell(x, y));
  }

  miss(x: number, y: number) {
    new Miss(this.getCell(x, y));
  }

  damage(x: number, y: number) {
    new Damage(this.getCell(x, y));
  }

  empty(x: number, y: number) {
    new Mark(this.getCell(x, y));
  }
}
