import { Figure } from "..";
import { ITEM_SIZE } from "../../constants";
import type { Coordinates } from "../../movement";
import type { IFigureNewGetter } from "../IFigureNewGetter";

export class RevertZ extends Figure implements IFigureNewGetter {
  constructor(offsetY?: number | Coordinates[], offsetX?: number) {
    super();

    this.initialCoordinates =
      offsetY instanceof Array
        ? offsetY
        : [
            [ITEM_SIZE, -ITEM_SIZE],
            [ITEM_SIZE, 0],
            [0, 0],
            [0, ITEM_SIZE],
          ];

    this.color = "#7b5e57";

    this.coordinates =
      offsetY instanceof Array
        ? offsetY
        : this.initialCoordinates.map(([x, y]) => [
            (offsetX || 0) + x,
            (offsetY || 0) + y,
          ]);
  }

  getNewFigure(
    offsetY?: number | Coordinates[] | undefined,
    offsetX?: number | undefined
  ): Figure {
    this.color = this.color ?? "#fff";

    return new RevertZ(offsetY, offsetX);
  }
}