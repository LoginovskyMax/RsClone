import { SEAWAR } from "../variables.mjs";

import { Player } from "./player.mjs";

export class SeaWarPlayer extends Player {
  constructor(userName) {
    super(userName);
    this.gameMatrix = new Array(10)
      .fill(0)
      .map((_) => new Array(10).fill(SEAWAR.CLEAN));
    this.ships = [];
  }
}
