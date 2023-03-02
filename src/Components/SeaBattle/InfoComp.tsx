import type { Winner } from "../../Pages/SeaBattle/web-socket/websocketData";
import useUserStore from "../../store";
import languageStore from "../../store/language";
import Button from "../common/Button";

import styles from "./Field.module.scss";

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
      <p className={styles.text}>
        {isEn ? "Ожидание 2 игрока" : "Waiting for the 2-nd player"}
      </p>
    ) : (
      <p className={styles.text}>
        {isEn ? "Ожидание старта игры" : "Waiting for the start"}
      </p>
    );

    if (winner) {
      message =
        winner.player.userName === userName ? (
          <p className={styles.text}>
            {isEn ? "Вы победили! Ходов:" : "You win! Moves:"} {winner.moves}
          </p>
        ) : (
          <p className={styles.text}>
            {isEn ? "Вы проиграли :(" : "You lose :("}
          </p>
        );
    }

    return message;
  }

  return (
    <div>
      {canShoot ? (
        <p className={styles.text}>{isEn ? "Ваш выстрел" : "Your shoot"}</p>
      ) : (
        <p className={styles.text}>
          {isEn ? "Выстрел соперника" : "Enemy shoot"}
        </p>
      )}
    </div>
  );
};
