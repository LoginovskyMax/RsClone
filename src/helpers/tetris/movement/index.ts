import { Matrix } from "ml-matrix";

import { PLAY_ZONE_WIDTH, PLAY_ZONE_HEIGHT, ITEM_SIZE } from "../constants";
import type { Figure } from "../figures";

export const rotationRightMatrix = new Matrix([
  [0, -1],
  [1, 0],
]);

export const rotationLeftMatrix = new Matrix([
  [0, 1],
  [-1, 0],
]);

export enum Moves {
  right,
  left,
  bottom,
}

export enum Keys {
  ArrowRight = "ArrowRight",
  ArrowLeft = "ArrowLeft",
  ArrowDown = "ArrowDown",
  r = "r",
  R = "R",
}

export type Coordinates = number[];

export type Movements = Record<Keys, () => void>;

export type Rotations = (key: string, movements: Movements) => () => void;

const checkBorder = (matrix: Matrix, moveTo: Moves, isWeak?: boolean) => {
  switch (moveTo) {
    case Moves.right:
      return isWeak
        ? matrix.maxColumn(1) + ITEM_SIZE > PLAY_ZONE_WIDTH
        : matrix.maxColumn(1) + ITEM_SIZE >= PLAY_ZONE_WIDTH;

    case Moves.left:
      return isWeak ? matrix.minColumn(1) < 0 : matrix.minColumn(1) <= 0;

    case Moves.bottom:
      return isWeak
        ? matrix.maxColumn(0) + ITEM_SIZE > PLAY_ZONE_HEIGHT
        : matrix.maxColumn(0) + ITEM_SIZE >= PLAY_ZONE_HEIGHT;

    default:
      return false;
  }
};

export const rotate = (figure: Figure, isClockwise?: boolean) => {
  const diff = new Matrix(figure.coordinates).add(
    new Matrix(figure.initialCoordinates).neg()
  );
  const oldOffset = new Matrix(new Matrix(figure.initialCoordinates));
  const rotation = isClockwise ? rotationRightMatrix : rotationLeftMatrix;

  const newCoords = new Matrix(oldOffset).mmul(rotation).add(diff);

  const isCollided =
    checkBorder(newCoords.clone(), Moves.bottom, true) ||
    checkBorder(newCoords.clone(), Moves.left, true) ||
    checkBorder(newCoords.clone(), Moves.right, true) ||
    new figure.constructor(newCoords.to2DArray()).isCollided();

  if (isCollided) {
    return figure.coordinates;
  }

  figure.setInitialCoords(
    new Matrix(figure.initialCoordinates).mmul(rotation).to2DArray()
  );

  return newCoords.to2DArray();
};

export const move = (
  figure: Figure,
  moveTo: Moves,
  isEndCallback?: () => void
) => {
  const coords = figure.coordinates;
  const matrix = new Matrix(coords);
  const isBorderCollided = checkBorder(matrix, moveTo);
  let newCoords;

  switch (moveTo) {
    case Moves.right:
      if (isBorderCollided) {
        return coords;
      }

      newCoords = coords.map(([first, last]) => [first, last + ITEM_SIZE]);

      if (new figure.constructor(newCoords).isCollided()) {
        return coords;
      }

      return newCoords;

    case Moves.left:
      if (isBorderCollided) {
        return coords;
      }

      newCoords = coords.map(([first, last]) => [first, last - ITEM_SIZE]);

      if (new figure.constructor(newCoords).isCollided()) {
        return coords;
      }

      return newCoords;

    case Moves.bottom:
      if (isBorderCollided) {
        if (isEndCallback) {
          isEndCallback();
        }

        return coords;
      }

      newCoords = coords.map(([first, last]) => [first + ITEM_SIZE, last]);

      if (new figure.constructor(newCoords).isCollided()) {
        if (isEndCallback) {
          isEndCallback();
        }

        return coords;
      }

      return newCoords;

    default:
      return coords;
  }
};

export const isValidKey = (key: string): key is Keys => {
  if (key in Keys) {
    return true;
  }

  return false;
};

export const rotations: Rotations = (key, movements) => {
  if (!isValidKey(key)) {
    return () => {};
  }

  return movements[key];
};
