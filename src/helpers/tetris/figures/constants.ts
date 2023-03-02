import { ITEM_SIZE } from "../constants";
import type { Coordinates } from "../movement";

import type { FigureType } from ".";

export const INITIAL_COORDINATES_BY_FIGURE_TYPE: Record<
  FigureType,
  Coordinates[]
> = {
  I: [
    [0, -ITEM_SIZE * 2],
    [0, -ITEM_SIZE],
    [0, 0],
    [0, ITEM_SIZE],
  ],
  L: [
    [0, -ITEM_SIZE],
    [0, 0],
    [0, ITEM_SIZE],
    [ITEM_SIZE, ITEM_SIZE],
  ],
  RevertL: [
    [0, -ITEM_SIZE],
    [0, 0],
    [0, ITEM_SIZE],
    [-ITEM_SIZE, ITEM_SIZE],
  ],
  RevertZ: [
    [ITEM_SIZE, -ITEM_SIZE],
    [ITEM_SIZE, 0],
    [0, 0],
    [0, ITEM_SIZE],
  ],
  Square: [
    [0, -ITEM_SIZE],
    [0, 0],
    [ITEM_SIZE, -ITEM_SIZE],
    [ITEM_SIZE, 0],
  ],
  T: [
    [0, -ITEM_SIZE],
    [0, 0],
    [ITEM_SIZE, 0],
    [0, ITEM_SIZE],
  ],
  Z: [
    [0, -ITEM_SIZE],
    [0, 0],
    [ITEM_SIZE, 0],
    [ITEM_SIZE, ITEM_SIZE],
  ],
};

export const COLOR_BY_FIGURE_TYPE: Record<FigureType, string> = {
  I: "#ff5f52",
  L: "#85bb5c",
  RevertL: "#6d6d6d",
  RevertZ: "#7b5e57",
  Square: "#5f5fc4",
  T: "#ffd95a",
  Z: "#ff9d3f",
};
