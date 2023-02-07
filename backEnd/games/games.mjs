export const games = {};

export class Game {
  constructor(gameName, playersCount = 2) {
    this.gameName = gameName;
    this.players = [];
    this.playersCount = playersCount;
    this.isStarted = false; // is Game started
    this.winner = null; // userID
  }

  addPLayer(userID) {
    if (this.users.length < this.playersCount) {
      this.users.push(({}[userID] = {}));

      return this.users.length;
    }

    return -1;
  }
}
