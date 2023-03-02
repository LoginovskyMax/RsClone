import { ITEM_SIZE } from "../constants";
import type { Coordinates } from "../movement";

import {
  COLOR_BY_FIGURE_TYPE,
  INITIAL_COORDINATES_BY_FIGURE_TYPE,
} from "./constants";

export type Figure = {
  coordinates: Coordinates[];
  color: string;
  coordinatesInNullishPoint: Coordinates[];
  type: FigureType;
};

export type FigureType =
  | "I"
  | "L"
  | "Z"
  | "RevertL"
  | "RevertZ"
  | "Square"
  | "T";

export const createFigure = (
  type: FigureType,
  {
    offsetX,
    offsetY,
    initialCoordinate,
  }: { offsetX?: number; offsetY?: number; initialCoordinate?: Coordinates[] }
): Figure => ({
  color: COLOR_BY_FIGURE_TYPE[type],
  coordinates:
    initialCoordinate ??
    INITIAL_COORDINATES_BY_FIGURE_TYPE[type].map(([x, y]) => [
      (offsetX || 0) + x,
      (offsetY || 0) + y,
    ]),
  coordinatesInNullishPoint:
    initialCoordinate ?? INITIAL_COORDINATES_BY_FIGURE_TYPE[type],
  type,
});

export const removeLineFromFigure = (line: number, figure: Figure) => {
  const initialLength = figure.coordinates.length;

  const newCoordinates = figure.coordinates
    .filter(([x]) => x !== line)
    .map(([x, y]) => (x <= line ? [x + ITEM_SIZE, y] : [x, y]));

  return {
    newFigure: {
      ...figure,
      coordinates: newCoordinates,
    },
    score: initialLength - newCoordinates.length,
  };
};

export const updateCoordinatesInNullishPoint = (
  newCoordinatesInNullishPoint: Coordinates[],
  figure: Figure
): Figure => ({
  ...figure,
  coordinatesInNullishPoint: newCoordinatesInNullishPoint,
});

export const removeFilledLines = (staticFigures: Figure[]) => {
  const filledLines = staticFigures
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

  const result = linesToRemove.reduce<{
    newStaticFigures: Figure[];
    totalScore: number;
  }>(
    (acc, line) => {
      const newStaticFigures = acc.newStaticFigures.reduce<{
        figures: Figure[];
        score: number;
      }>(
        (figuresAcc, curr) => {
          const figureWithoutLine = removeLineFromFigure(line, curr);

          return {
            figures: [...figuresAcc.figures, figureWithoutLine.newFigure],
            score: figuresAcc.score + figureWithoutLine.score,
          };
        },
        {
          figures: [],
          score: 0,
        }
      );

      return {
        newStaticFigures: [...newStaticFigures.figures],
        totalScore: acc.totalScore + newStaticFigures.score,
      };
    },
    {
      newStaticFigures: [...staticFigures],
      totalScore: 0,
    }
  );

  return result;
};

export const isFiguresCollided = (
  staticFigures: Figure[],
  currentFigure: Figure
) =>
  staticFigures.some((figure) =>
    figure.coordinates.some((coords) =>
      currentFigure.coordinates.some(
        (selfCoords) =>
          coords[0] === selfCoords[0] && coords[1] === selfCoords[1]
      )
    )
  );
