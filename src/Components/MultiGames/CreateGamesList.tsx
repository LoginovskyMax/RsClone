import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

import languageStore from "../../store/language";
import useStatusStore from "../../store/load-status";

import styles from "./CreateGamesList.module.scss";

interface IGames {
  gameId: string;
  maxPlayers: number;
  name: string;
  player: string;
  playersInGame: number;
}
interface IProps {
  gameName: string | undefined;
  joinGame: (id: string) => void;
}

export const CreateGamesList = ({ gameName, joinGame }: IProps) => {
  const [gamesArr, setGamesArr] = useState<IGames[]>([]);
  const { setStatus } = useStatusStore();
  const { isEn } = languageStore();

  const getGames = () => {
    fetch(`https://rsgames.online:8888/games/list?name=${gameName}`)
      .then<IGames[]>((response) => response.json())
      .then((data) => setGamesArr(data))
      .catch(({ message }) => setStatus({ isLoading: false, message }));
  };

  useEffect(() => {
    getGames();
  }, []);

  return (
    <div className={styles.main}>
      <h2 className={styles.main_header}>
        {isEn ? "Список доступных игр" : "List of create games"}
        <FontAwesomeIcon
          icon={faRefresh}
          onClick={getGames}
          className={styles.main_icon}
        />
      </h2>
      <div className={styles.main_gamesWrapper}>
        {gamesArr.length !== 0 ? (
          gamesArr.map((game) => (
            <div
              key={game.gameId}
              className={styles.main_item}
              onClick={() => joinGame(game.gameId)}
            >
              <p className={styles.main_userName}>{game.player}</p>
              <div className={styles.main_usersCount}>
                <div className={styles.main_usersIcon} />
                {game.playersInGame} / {game.maxPlayers}
              </div>
            </div>
          ))
        ) : (
          <p className={styles.main_noGames}>
            {isEn ? "Созданных игр пока нет" : "Not avalaible games"}
          </p>
        )}
      </div>
    </div>
  );
};
