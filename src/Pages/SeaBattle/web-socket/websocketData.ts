export interface Winner {
  player: SeaWarPLayer;
  moves: number;
}

export interface Ship {
  size: number;
  cors: Array<Array<number>>;
}

export interface SeaWarPLayer {
  isLead: boolean;
  isReady: boolean;
  moves: number;
  ships: Array<Ship>;
  userName: string;
  points: number;
  misMoves: number;
}

export interface GameData {
  gameId: string;
  isStarted?: boolean;
  isMainUser?: boolean;
  player?: SeaWarPLayer;
  enemyName?: string | null;
  isEnemyReady: boolean;
  enemyField: Array<Array<number>>;
  yourField: Array<Array<number>>;
  winner: Winner;
}
