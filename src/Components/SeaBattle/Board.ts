import { Ship, Miss, Damage } from "./Ship";

interface Mark {
  logo: number;
  color: string;
  id: number;
  name: string;
}

export class Cell {
  board: Board;

  x: number;

  y: number;

  mark: Mark;

  id: number;

  constructor(board: Board, x: number, y: number, mark: Mark) {
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
    for (let i = 0; i < 10; i+=1) {
      const row: Cell[] = [];

      for (let j = 0; j < 10; j+=1) {
        row.push(
          new Cell(this, j, i, {
            logo: 0,
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
}
