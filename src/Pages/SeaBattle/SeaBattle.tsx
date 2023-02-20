import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../Components/common/Button";
import { Board } from "../../Components/SeaBattle/Board";
import { FieldComp } from "../../Components/SeaBattle/FieldComp";
import { InfoComp } from "../../Components/SeaBattle/InfoComp";
import { checkUserToken } from "../../controller/Auth";
import useUserStore from "../../store";
import useStatusStore from "../../store/load-status";

import styles from "./SeaBattle.module.scss";
import type { GameData } from "./web-socket/websocketData";
import type { wsGameData } from "./web-socket/WebSoket";
import { webSocketController } from "./web-socket/WebSoket";

const SEABATTLE_MOBILE_MOVE_TIMEOUT = 1500;

export const SeaBattle = () => {
  const params = useParams();
  const gameId = params.id;
  const navigate = useNavigate();
  const [myBoard, setMyBoard] = useState(new Board());
  const [enemyBoard, setEnemyBoard] = useState(new Board());
  const user = useUserStore((state) => state.userName);
  const { setStatus } = useStatusStore();
  const [enemyName, setEnemyName] = useState<string | null>("");
  const [shipsReady, setShipsReady] = useState(false);
  const [canShoot, setCanShoot] = useState(false);
  const [start, setStart] = useState("");
  const [gameData, setGameData] = useState<wsGameData>();
  const [otherData, setOtherData] = useState<GameData>();
  const [serverError, setServerError] = useState("");
  const [shootNow, setShootNow] = useState(false);

  const restart = () => {
    const newBoard = new Board();
    const newEnemyBoard = new Board();
    newBoard.initCells();
    newEnemyBoard.initCells();
    setMyBoard(newBoard);
    setEnemyBoard(newEnemyBoard);
  };

  const shoot = (x: number, y: number) => {
    const request = {
      type: "move",
      data: { gameId, x, y },
    };
    webSocketController.send(JSON.stringify(request));
  };

  const setShip = (x: number, y: number) => {
    const request = {
      type: "set",
      data: { gameId, x, y },
    };
    webSocketController.send(JSON.stringify(request));
  };

  const findCells = (
    data: number[][],
    board: Board,
    setBoard: React.Dispatch<React.SetStateAction<Board>>
  ) => {
    data.forEach((arr, x) => {
      arr.forEach((number, y) => {
        if (number === -1) {
          board.miss(x, y);
        }

        if (number === -2) {
          board.damage(x, y);
        }

        if (number === 2) {
          board.createShip(x, y);
        }

        if (number === 1) {
          board.empty(x, y);
        }
      });
    });
    const newBoard = board.getCopy();
    setBoard(newBoard);
  };

  const ready = () => {
    const request = {
      type: "ready",
      data: { gameId },
    };
    webSocketController.send(JSON.stringify(request));
  };

  const startGame = () => {
    const request = {
      type: "start",
      data: { gameId },
    };
    webSocketController.send(JSON.stringify(request));
  };

  const joinGame = () => {
    const request = {
      type: "join",
      data: { gameId },
    };
    webSocketController.send(JSON.stringify(request));
  };

  const exitGame = () => {
    const request = {
      type: "leave",
      data: { gameId },
    };
    webSocketController.send(JSON.stringify(request));
    navigate("/room/SeaBattle");
  };

  useEffect(() => {
    if (gameData) {
      const { type } = gameData;

      switch (type) {
        case "message":
          setServerError(gameData.message as string);
          break;
        case "game-data":
          setOtherData(gameData.data as GameData);
          findCells(
            (gameData.data as GameData).enemyField,
            enemyBoard,
            setEnemyBoard
          );
          findCells((gameData.data as GameData).yourField, myBoard, setMyBoard);
          setEnemyName((gameData.data as GameData).enemyName as string);
          if (
            (gameData.data as GameData).player &&
            !(gameData.data as GameData).winner
          )
            setCanShoot(!!(gameData.data as GameData).player?.isLead);
          setServerError("");
          break;

        default:
          setServerError("");
      }
    }
  }, [gameData]);

  useEffect(() => {
    setShipsReady(!!otherData?.player?.isReady);
    setStart(otherData?.isStarted && !otherData.winner ? "start" : "");
    setCanShoot(!!otherData?.player?.isLead && !otherData?.winner);

    if (otherData?.winner) {
      setStatus({
        isLoading: false,
        message:
          otherData?.winner.player.userName === user
            ? "Вы победили!"
            : "Вы проиграли",
      });
    }

    setTimeout(() => {
      setShootNow(!!otherData?.player?.isLead);
    }, SEABATTLE_MOBILE_MOVE_TIMEOUT);
  }, [otherData]);

  useEffect(() => {
    webSocketController.addMessageListener(setGameData);
    checkUserToken().then((userData) => {
      if (userData.userName) {
        webSocketController.setUser(userData.userName);
        webSocketController.setGameId(gameId || "");
        webSocketController.connect().then(() => {
          restart();
          joinGame();
          webSocketController.addMessageListener(setGameData);
        });
      } else {
        navigate("/");
      }
    });

    return () => webSocketController.deleteAllCallbacks();
  }, []);

  return (
    <div className={styles.global}>
      <h2 className={styles.main_gameName}>SeaBattle</h2>
      <h3 className={styles.main_score}>
        Score: <strong>{otherData?.player?.points}</strong>
      </h3>
      <div
        className={`${styles.main} ${
          shootNow ? styles.main_forShoot : styles.main_forView
        }`}
      >
        <div className={styles.main_conteiner}>
          <p className={styles.main_myName}>{user || "User"}</p>
          <FieldComp
            board={myBoard}
            isEnemy={false}
            setBoard={setMyBoard}
            canShoot={false}
            shipsReady={shipsReady}
            setShip={setShip}
          />
        </div>
        <div className={styles.main_conteiner}>
          <p className={styles.main_enemyName}>{enemyName || "Enemy"}</p>
          <FieldComp
            board={enemyBoard}
            isEnemy
            setBoard={setEnemyBoard}
            canShoot={canShoot}
            shipsReady={shipsReady}
            shoot={shoot}
          />
        </div>
      </div>
      <InfoComp
        ready={ready}
        canShoot={canShoot}
        shipsReady={shipsReady}
        start={start}
        winner={otherData?.winner}
        mainUser={otherData?.isMainUser}
      />
      {serverError !== "" && <p>{serverError}</p>}
      {otherData && otherData.isMainUser && !otherData.winner && !start && (
        <Button
          onClick={() => {
            if (otherData.isEnemyReady) startGame();
          }}
          disabled={!otherData.isEnemyReady}
        >
          Старт
        </Button>
      )}
      <Button onClick={exitGame}>Выйти</Button>
    </div>
  );
};
