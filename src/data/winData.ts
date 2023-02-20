export interface WinnerReq {
  game: string;
  points: number;
}

export interface WinnerRes {
  _id: string;
  userName: string;
  gameName: string;
  points: number;
  date: string;
  position?: number;
}

export enum WinErrorMessages {
  notAuthorized = "User not authorized",
  gameNotFound = "Game not found",
  failed = "Failed to add winner",
}
