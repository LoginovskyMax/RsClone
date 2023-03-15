export const games = {};

export class Game {
  constructor(gameName, playersCount = 2) {
    this.gameName = gameName;
    this.players = [];
    this.playersCount = playersCount;
    this.isStarted = false; // is Game started
    this.winner = null;
  }
}
