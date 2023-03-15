export const BACKEND_GAMES_PATH = "/games/all/";

export interface GameComment {
  userName: string;
  gameName: string;
  text: string;
  raiting: number;
  date: Date;
}

export interface GameData {
  _id: string;
  name: string;
  fullName: string;
  image: string;
  descriptionRu: string;
  descriptionEn: string;
  rulesRu: string;
  rulesEn: string;
  raiting: number;
  comments: [GameComment];
  isComingSoon: boolean;
}
