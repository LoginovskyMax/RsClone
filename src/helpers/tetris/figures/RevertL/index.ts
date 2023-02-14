import { Figure } from "..";
import { ITEM_SIZE } from "../../constants";
import type { Coordinates } from "../../movement";

export class RevertL extends Figure {
  constructor(offsetY?: number | Coordinates[], offsetX?: number) {
    super();

    this.initialCoordinates =
      offsetY instanceof Array
        ? offsetY
        : [
            [0, -ITEM_SIZE],
            [0, 0],
            [0, ITEM_SIZE],
            [-ITEM_SIZE, ITEM_SIZE],
          ];

    this.color = "#6d6d6d";

    this.coordinates =
      offsetY instanceof Array
        ? offsetY
        : this.initialCoordinates.map(([x, y]) => [
            (offsetX || 0) + x,
            (offsetY || 0) + y,
          ]);
  }
}
