import type { Winner } from "../../Pages/SeaBattle/web-socket/websocketData";
import Button from "../common/Button";
import languageStore from "../../store/language";

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
  const { isEn } = languageStore()
  if (!shipsReady) {
    return (
      <Button onClick={() => ready()} disabled={count < 20}>
        {isEn ? "Корабли готовы" : "Ships are ready"}
      </Button>
    );
  }

  if (start === "") {
    return mainUser 
    ? <p> {isEn ? "Ожидание 2го игрока" : "Waiting for the second player"}</p> 
    : <p> {isEn ? "Ожидание старта игры..." : "Waiting for starting..."}</p>;
  }

  if (winner) {
    return (
      <p>
        {isEn ? "Победил :" : "Winner :"} {winner.userName} {isEn ? "Ходов :" : "Mooves :"} {winner.moves}
      </p>
    );
  }

  return <div>{canShoot 
    ? <p>{isEn ? "Ваш выстрел" : "Your shoot"}</p> 
    : <p>{isEn ? "Выстрел соперника" : "Enemy shoot"}</p>}</div>;
};
