import { useEffect } from "react";
import { useLocation, useNavigate, useParams} from "react-router-dom";

import Button from "../../Components/common/Button";
import { CreateGamesList } from "../../Components/MultiGames/CreateGamesList";
import useUserStore from "../../store";

import styles from "./SeaBattle.module.scss";
import { webSocketController } from "./web-socket/WebSoket";

export const CreateGame = () => {
  const params = useParams();
  const { gameName } = params;
  const navigate = useNavigate();
  const user = useUserStore((state) => state.userName);
  const location = useLocation();

  const startGame = () => {
    if (webSocketController.getGameId() !== "") {
      const gameId = webSocketController.getGameId();
      navigate(`/SeaBattle/${gameId}`);
    }
  };

  const createGame = () => {
    const request = {
      type: "create",
      data: null,
    };
    webSocketController.send(JSON.stringify(request));
    setTimeout(startGame, 500);
  };

  const joinGame = (id: string) => {
    const request = {
      type: "join",
      data: { gameId: id },
    };
    webSocketController.send(JSON.stringify(request));

    setTimeout(startGame, 500);
  };

  useEffect(() => {
    if (user !== null) {
      webSocketController.setUser(user);
      webSocketController.connect();
    } else {
      navigate("/");
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
  }, [user]);

  return (
    <div className={styles.main_create}>
      <h2>{gameName}</h2>
      <h3>Создайте новую игру или присоединитесь к существующей</h3>
      <Button onClick={() => createGame()}>Создать игру</Button>
      <p className={styles.main_text}>Кликните по игре из списка ниже &darr;</p>
      <CreateGamesList gameName={gameName} joinGame={joinGame} />
    </div>
  );
};
