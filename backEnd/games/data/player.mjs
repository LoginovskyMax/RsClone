export class Player {
  constructor(userName) {
    this.userName = userName;
    this.isReady = false;
    this.moves = 0;
    this.isLead = false;
    this.isOnline = true;
    this.points = 0;
    this.misMoves = 0;
  }
}
