import { useEffect, useState } from "react";

import { getAllGamesFromBackEnd } from "../../controller/GamesComments";
import languageStore from "../../store/language";
import useStatusStore from "../../store/load-status";

import GameComp from "./GameComp/GameComp";
import type { GameItem } from "./games.data";

import "./Style.scss";

const Games = () => {
  const [gamesArr, setGamesArr] = useState<Array<GameItem>>([]);
  const { setStatus } = useStatusStore();
  const { isLoading } = useStatusStore();
  const { isEn } = languageStore();

  useEffect(() => {
    setStatus({ isLoading: true, message: "" });
    getAllGamesFromBackEnd()
      .then((games) => {
        setGamesArr(games);
        setStatus({ isLoading: false, message: "" });
      })
      .catch(({ message }) => {
        setStatus({ isLoading: false, message });
      });
  }, []);

  return (
    <div className="games">
      <h2 className="games__title">{isEn ? "Игры" : "Games"}</h2>
      <div className="games__list">
        {gamesArr.length > 0 &&
          gamesArr.map((game) => <GameComp key={game.name} gameItem={game} />)}
      </div>
      {!isLoading && gamesArr.length === 0 && (
        <div className="games__no-games">
          <p>{isEn ? "Игр пока нет!" : "There is no games!"}</p>
        </div>
      )}
    </div>
  );
};

export default Games;
