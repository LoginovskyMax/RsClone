import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "../../Components/common/Button";
import { CreateGamesList } from "../../Components/MultiGames/CreateGamesList";
import useUserStore from "../../store";

import styles from "./SeaBattle.module.scss";
import { webSocketController } from "./web-socket/WebSoket";

export const CreateGame = () => {
  const navigate = useNavigate();
  const [inviteGame, setInviteGame] = useState(false);
  const user = useUserStore((state) => state.userName);
  const location = useLocation();

  const startGame = () => {
    if (webSocketController.getGameId() !== "") {
      const gameId = webSocketController.getGameId();
      navigate(`/SeaBattle/${gameId}`);
    }
  };

  const createGame = () => {
     const  request = {
        type: "create",
        data: null,
      };
    webSocketController.send(JSON.stringify(request));
  };

  const joinGame = (id:string) => {
    console.log(id);
    if(inviteGame){
      const request = {
        type: "join",
        data: { gameId:id },
      };
      webSocketController.send(JSON.stringify(request));
    }
  }

  useEffect(() => {
    console.log(user);
    if(user!==null){
      webSocketController.setUser(user)
      webSocketController.connect();
    }
   
    // подключаемся к игре, если есть квери параметры с id игры
    const queryParams = new URLSearchParams(location.search);
    const gameId = queryParams.get("gameId");

    if (gameId) {
      webSocketController.send(
        JSON.stringify({ type: "join", data: { gameId } })
      );
    }

    // убиваем все слушатели при выходе со страницы
    return () => webSocketController.deleteAllCallbacks();
  }, []);

  return (
    <div className={styles.main_create}>
      <h2>Создайте новую игру или присоединитесь к существующей</h2>
      <div className={styles.main_radio}>
        <label htmlFor="generate">Cоздать игру</label>
        <input
          type="radio"
          id="generate"
          value="generate"
          name="radio"
          checked={!inviteGame}
          onChange={() => setInviteGame(false)}
        />
        <label htmlFor="invite">Присоединится к игре</label>
        <input
          type="radio"
          id="invite"
          value="invite"
          name="radio"
          onChange={() => setInviteGame(true)}
        />
      </div>
      {!inviteGame && (
        <Button onClick={() => createGame()}>Создать игру</Button>
      )}
      {/* <input type="text" placeholder="token" onChange={(e)=>setToken(e.target.value)}/>
        <input type="text" placeholder="test user" onChange={(e)=>setUser(e.target.value)}/> */}
      <Button onClick={startGame}>Начать</Button>
      <div>creating games</div>
      <CreateGamesList gameName='SeaWar' joinGame={joinGame}></CreateGamesList>
    </div>
  );
};