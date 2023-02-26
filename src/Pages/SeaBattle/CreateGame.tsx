import { useEffect } from "react";
import * as reactRouterDom from "react-router-dom";

import Button from "../../Components/common/Button";
import { CreateGamesList } from "../../Components/MultiGames/CreateGamesList";
import useUserStore from "../../store";
import languageStore from "../../store/language";
import useStatusStore from "../../store/load-status";

import styles from "./SeaBattle.module.scss";
import { webSocketController } from "./web-socket/WebSoket";

export const CreateGame = () => {
  const params = reactRouterDom.useParams();
  const { gameName } = params;
  const navigate = reactRouterDom.useNavigate();
  const { userName: user, banned } = useUserStore();
  const { setStatus } = useStatusStore();
  const location = reactRouterDom.useLocation();
  const { isEn } = languageStore();

  const startGame = () => {
    if (webSocketController.getGameId() !== "") {
      const gameId = webSocketController.getGameId();
      navigate(`/SeaBattle/${gameId}`);
    }
  };

  const createGame = () => {
    if (banned) {
      setStatus({
        isLoading: false,
        message: isEn ? "Вы забанены!" : "You are banned!",
      });
      navigate("/");

      return;
    }

    const request = {
      type: "create",
      data: null,
    };
    webSocketController.send(JSON.stringify(request));
    setTimeout(startGame, 500);
  };

  const joinGame = (id: string) => {
    if (banned) {
      setStatus({
        isLoading: false,
        message: isEn ? "Вы забанены!" : "You are banned!",
      });
    }

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
      <h2 className={styles.main_gameName}>{gameName}</h2>
      <h3 className={styles.main_score}>
        {isEn
          ? "Создайте новую игру или присоединитесь к существующей"
          : "Create a new game or join an existing one"}
      </h3>
      <Button onClick={() => createGame()}>
        {isEn ? "Создать игру" : "Create game"}
      </Button>
      <CreateGamesList gameName={gameName} joinGame={joinGame} />
    </div>
  );
};
