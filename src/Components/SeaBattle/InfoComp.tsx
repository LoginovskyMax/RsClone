import type { Winner } from "../../Pages/SeaBattle/web-socket/websocketData";
import useUserStore from "../../store";
import languageStore from "../../store/language";
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
  const { isEn } = languageStore();

  if (!shipsReady && !mainUser) {
    return (
      <Button onClick={() => ready()} disabled={shipsReady}>
        {isEn ? " Корабли готовы" : "Ships are ready"}
      </Button>
    );
  }

  if (start === "") {
    let message = mainUser ? (
      <p>{isEn ? "Ожидание 2 игрока" : "Ready for the second player"}</p>
    ) : (
      <p>{isEn ? "Ожидание старта игры" : "Ready for the start"}</p>
    );

    if (winner) {
      message =
        winner.player.userName === userName ? (
          <p>
            {isEn ? "Вы победили! Ходов:" : "You win! Moves:}"} {winner.moves}
          </p>
        ) : (
          <p>{isEn ? "Вы проиграли :(" : "You lose("}</p>
        );
    }

    return message;
  }

  return (
    <div>
      {canShoot ? (
        <p>{isEn ? "Ваш выстрел" : "Your shoot"}</p>
      ) : (
        <p>{isEn ? "Выстрел соперника" : "Enemy shoot"}</p>
      )}
    </div>
  );
};
