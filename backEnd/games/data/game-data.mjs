export class SeaWarGameData {
  constructor(
    gameId,
    player,
    enemyName,
    isEnemyReady,
    isMainUser,
    isStarted,
    isLead,
    winner,
    yourField,
    enemyField,
    moves
  ) {
    this.gameId = gameId;
    this.player = player;
    this.enemyName = enemyName;
    this.isEnemyReady = isEnemyReady;
    this.isMainUser = isMainUser;
    this.isStarted = isStarted;
    this.isLead = isLead;
    this.winner = winner;
    this.yourField = yourField;
    this.enemyField = enemyField;
    this.moves = moves;
  }
}
