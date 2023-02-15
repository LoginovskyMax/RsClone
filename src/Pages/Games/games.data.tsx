export interface GameItem {
  name: string;
  image: string;
  descriptionRu: string;
  descriptionEn: string;
  rulesRu: string;
  rulesEn: string;
  raiting: number;
  comments: Array<CommentItem>;
}

export interface CommentItem {
  userName: string;
  gameName: string;
  text: string;
  raiting: number;
  date: Date;
}
