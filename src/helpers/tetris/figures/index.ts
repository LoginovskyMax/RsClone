import { ITEM_SIZE } from "../constants";
import type { Coordinates } from "../movement";
import { move, Moves, rotate } from "../movement";

import type { IFigureNewGetter } from "./IFigureNewGetter";

export class Figure implements IFigureNewGetter {
  getNewFigure(
    _offsetY?: number | Coordinates[] | undefined,
    _offsetX?: number | undefined
  ): Figure {
    return this;
  }

  coordinates: Coordinates[] = [];

  color = "";

  initialCoordinates: Coordinates[] = [];

  removeLine(line: number) {
    const initialLength = this.coordinates.length;

    this.coordinates = this.coordinates
      .filter(([x]) => x !== line)
      .map(([x, y]) => (x <= line ? [x + ITEM_SIZE, y] : [x, y]));

    return initialLength - this.coordinates.length;
  }

  static allFigures: Figure[];

  static removeFilled() {
    const filledLines = Figure.allFigures
      .map((figure) => figure.coordinates)
      .flat()
      .sort((a, b) => a[0] - b[0])
      .reduce(
        (acc, curr) => ({ ...acc, [curr[0]]: (acc[curr[0]] || 0) + 1 }),
        {} as Record<number, number>
      );

    const linesToRemove = Object.entries(filledLines)
      .filter(([, value]) => value === 15)
      .map(([x]) => Number.parseInt(x, 10));

    return linesToRemove.reduce(
      (acc, line) =>
        acc +
        this.allFigures.reduce(
          (figureAcc, curr) => figureAcc + curr.removeLine(line),
          0
        ),
      0
    );
  }

  getCoords() {
    return this.coordinates;
  }

  setInitialCoords(coords: Coordinates[]) {
    this.initialCoordinates = coords;
  }

  rotateRight = () => {
    this.coordinates = rotate(this, true);

    return this;
  };

  rotateLeft = () => {
    this.coordinates = rotate(this);

    return this;
  };

  moveRight = () => {
    this.coordinates = move(this, Moves.right);

    return this;
  };

  moveLeft = () => {
    this.coordinates = move(this, Moves.left);

    return this;
  };

  moveBottom = (isEndCallback: () => void) => {
    this.coordinates = move(this, Moves.bottom, isEndCallback);

    return this;
  };

  isCollided() {
    return Figure.allFigures.some((figure) =>
      figure.coordinates.some((coords) =>
        this.coordinates.some(
          (selfCoords) =>
            coords[0] === selfCoords[0] && coords[1] === selfCoords[1]
        )
      )
    );
  }

  static getNewFigure(_offsetY?: number | Coordinates[], _offsetX?: number) {
    return new Figure();
  }
}
