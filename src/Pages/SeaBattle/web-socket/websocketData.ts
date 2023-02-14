export interface Winner {
  userName: string;
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
