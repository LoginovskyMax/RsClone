export interface ICard {
  id: number;
  name: string;
  hasPair: boolean;
  img: string;
}

export interface IProps {
  card: ICard;
  onPress: (id: number) => void;
  countTry: number;
  pairs: number;
  clickCount: React.Dispatch<React.SetStateAction<number>>;
  startGame: boolean;
  inGame: boolean;
}
