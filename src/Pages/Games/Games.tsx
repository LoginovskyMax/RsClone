/* eslint-disable */
import { useEffect, useState } from "react";

import { getAllGamesFromBackEnd } from "../../controller/GamesComments";
import useStatusStore from "../../store/load-status";
import GameComp from './GameComp/GameComp';

import type { GameItem } from "./games.data";

const Games = () => {
  const [gamesArr, setGamesArr] = useState<Array<GameItem>>([]);
  const { setStatus } = useStatusStore();

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
      <h2>Games</h2>
      {
        gamesArr ?
        gamesArr.map((game) => <GameComp key={game.name} gameItem={game} />) : 
        <div className="games__no-games">There is no games!</div>
      }
    </div>
  );
}

export default Games;
