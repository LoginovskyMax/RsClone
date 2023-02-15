import type { Coordinates } from "../movement";

import type { Figure } from ".";

export interface IFigureNewGetter {
  getNewFigure(offsetY?: number | Coordinates[], offsetX?: number): Figure;
  coordinates: Coordinates[];
  initialCoordinates: Coordinates[];
  setInitialCoords(coords: Array<Coordinates>): void;
}
