import type { Winner } from "../../Pages/SeaBattle/web-socket/websocketData";
import Button from "../common/Button";

interface IProps {
  shipsReady: boolean;
  canShoot: boolean;
  ready: () => void;
  start: string;
  count: number;
  winner?: Winner;
  mainUser?: boolean;
}

export const InfoComp = ({
  shipsReady = false,
  canShoot = false,
  ready,
  start,
  count,
  winner,
  mainUser,
}: IProps) => {
  if (!shipsReady) {
    return (
      <Button onClick={() => ready()} disabled={count < 20}>
        Корабли готовы
      </Button>
    );
  }

  if (start === "") {
    return mainUser ? <p>Ожидание 2 игрока</p> : <p>Ожидание старта игры</p>;
  }

  if (winner) {
    return (
      <p>
        Победил : {winner.userName} Ходов: {winner.moves}
      </p>
    );
  }

  return <div>{canShoot ? <p>Стреляй</p> : <p>Выстрел соперника </p>}</div>;
};
