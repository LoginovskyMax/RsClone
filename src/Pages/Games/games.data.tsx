export interface GameItem {
  name: string;
  fullName: string;
  image: string;
  descriptionRu: string;
  descriptionEn: string;
  rulesRu: string;
  rulesEn: string;
  raiting: number;
  comments: Array<CommentItem>;
  isComingSoon: boolean;
}

export interface CommentItem {
  userName: string;
  gameName: string;
  text: string;
  raiting: number;
  date: Date;
}
