import { SEAWAR } from "../variables.mjs";

export class SeaWarPlayer {
  constructor(userName) {
    this.userName = userName;
    this.isReady = false;
    this.moves = 0;
    this.gameMatrix = new Array(10).fill(new Array(10).fill(SEAWAR.CLEAN));
  }
}
