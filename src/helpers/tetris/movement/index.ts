// eslint-disable-next-line import/no-extraneous-dependencies
import { Matrix } from "ml-matrix";

import { PLAY_ZONE_WIDTH, PLAY_ZONE_HEIGHT, ITEM_SIZE } from "../constants";
import type { Figure } from "../figures";
import {
  createFigure,
  isFiguresCollided,
  updateCoordinatesInNullishPoint,
} from "../figures";

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
  ArrowUp = "ArrowUp",
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
      return isWeak;
  }
};

export const rotate = (
  figure: Figure,
  staticFigures: Figure[],
  isClockwise?: boolean
): Figure => {
  const diff = new Matrix(figure.coordinates).add(
    new Matrix(figure.coordinatesInNullishPoint).neg()
  );
  const oldOffset = new Matrix(figure.coordinates).add(diff.clone().neg());
  const rotation = isClockwise ? rotationRightMatrix : rotationLeftMatrix;

  const newCoords = new Matrix(oldOffset).mmul(rotation).add(diff);

  const newCoordinatesInNullishPoint = new Matrix(
    figure.coordinatesInNullishPoint
  )
    .mmul(rotation)
    .to2DArray();

  const figureWithNewCoordinatesInNullishPoint =
    updateCoordinatesInNullishPoint(newCoordinatesInNullishPoint, figure);

  const newFigure = {
    ...figureWithNewCoordinatesInNullishPoint,
    coordinates: newCoords.to2DArray(),
  };

  const isCollided =
    checkBorder(newCoords.clone(), Moves.bottom, true) ||
    checkBorder(newCoords.clone(), Moves.left, true) ||
    checkBorder(newCoords.clone(), Moves.right, true) ||
    isFiguresCollided(staticFigures, newFigure);

  if (isCollided) {
    return figure;
  }

  return newFigure;
};

const coordinatesMapperByMoveType: Record<
  Moves,
  (figure: Coordinates) => Coordinates
> = {
  [Moves.bottom]: ([first, last]) => [first + ITEM_SIZE, last],
  [Moves.right]: ([first, last]) => [first, last + ITEM_SIZE],
  [Moves.left]: ([first, last]) => [first, last - ITEM_SIZE],
};

export const move = (
  figure: Figure,
  staticFigures: Figure[],
  moveTo: Moves,
  isEndCallback?: () => void
): Figure => {
  const coords = figure.coordinates;
  const matrix = new Matrix(coords);
  const isBorderCollided = checkBorder(matrix, moveTo);

  if (isBorderCollided) {
    if (isEndCallback) {
      isEndCallback();
    }

    return figure;
  }

  const newCoords = coords.map(coordinatesMapperByMoveType[moveTo]);

  if (
    isFiguresCollided(
      staticFigures,
      createFigure(figure.type, {
        initialCoordinate: newCoords,
      })
    )
  ) {
    if (isEndCallback) {
      isEndCallback();
    }

    return figure;
  }

  return {
    ...figure,
    coordinates: newCoords,
  };
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
