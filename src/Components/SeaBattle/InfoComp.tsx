import type { Winner } from "../../Pages/SeaBattle/web-socket/websocketData";
import useUserStore from "../../store";
import Button from "../common/Button";

interface IProps {
  shipsReady: boolean;
  canShoot: boolean;
  ready: () => void;
  start: string;
  winner?: Winner;
  mainUser?: boolean;
}

export const InfoComp = ({
  shipsReady = false,
  canShoot = false,
  ready,
  start,
  winner,
  mainUser,
}: IProps) => {
  const { userName } = useUserStore();

  if (!shipsReady && !mainUser) {
    return (
      <Button onClick={() => ready()} disabled={shipsReady}>
        Корабли готовы
      </Button>
    );
  }

  if (start === "") {
    let message = mainUser ? (
      <p>Ожидание 2 игрока</p>
    ) : (
      <p>Ожидание старта игры</p>
    );

    if (winner) {
      console.log(winner);
      message =
        winner.player.userName === userName ? (
          <p>Вы победили! Ходов: {winner.moves}</p>
        ) : (
          <p>Вы проиграли :(</p>
        );
    }

    return message;
  }

  return <div>{canShoot ? <p>Стреляй</p> : <p>Выстрел соперника </p>}</div>;
};
