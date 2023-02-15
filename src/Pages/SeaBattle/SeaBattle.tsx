/* eslint-disable */
import { useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../Components/common/Button";
import { Board } from "../../Components/SeaBattle/Board";
import { FieldComp } from "../../Components/SeaBattle/FieldComp";
import { InfoComp } from "../../Components/SeaBattle/InfoComp";
import useUserStore from "../../store";
import styles from "./SeaBattle.module.scss";
import { webSocketController, wsGameData  } from './web-socket/WebSoket';
import { GameData } from "./web-socket/websocketData";

export const SeaBattle = () => {
  const params = useParams();
  const gameId = params.id;
  const navigate = useNavigate()
  const [myBoard, setMyBoard] = useState(new Board());
  const [enemyBoard, setEnemyBoard] = useState(new Board());
  const user = useUserStore((state) => state.userName);
  const [enemyName, setEnemyName] = useState<string|null>("");
  const [shipsReady, setShipsReady] = useState(false);
  const [canShoot, setCanShoot] = useState(false);
  const [start, setStar] = useState('')
  const [gameData, setGameData] = useState<wsGameData>();
  const [otherData, setOtherData] = useState<GameData>()
  let [count, setCount] = useState(0)
  const [serverError, setServerError] = useState('')

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
      type:"move",
      data:{
        gameId,x,y,
      }
    }
    webSocketController.send(JSON.stringify(request))
  };

  const setShip = (x: number, y: number) => {
    setCount(count += 1)
    const request = {
      type:"set",
      data:{
        gameId,x,y,
      }
    }
    webSocketController.send(JSON.stringify(request))
  };

  const findCells = (
     data:number[][],
     board:Board,
     setBoard:React.Dispatch<React.SetStateAction<Board>>
    ) => {
    data.forEach((arr,x)=>{
      arr.forEach((number,y)=>{
          if(number===-1){
            board.miss(x,y)
          }
          if(number===-2){
            board.damage(x,y)
          }
      })
    })
    const newBoard = board.getCopy()
    setBoard(newBoard)
  }

  const ready = () => {
    const request = {
      type:"ready",
      data:{gameId}
    }
    webSocketController.send(JSON.stringify(request))
    setShipsReady(true)
  }

  const startGame = ()=>{
    const request = {
      type:"start",
      data:{gameId}
    }
    webSocketController.send(JSON.stringify(request))
    setStar('start')
    setCanShoot(true)
  }

  const exitGame = () => {
    const request = {
      type:"leave",
      data:{gameId}
    }
    webSocketController.send(JSON.stringify(request))
    navigate('/SeaBattle')
  }

  useEffect(() => {
    if(gameData){
      const  type  = gameData.type
      switch (type) {
        case "message": 
          const message = gameData.message
          setServerError(message as string)
          setShipsReady(false)
        break
        case "game-data":
          const data   = gameData.data
          setOtherData(data as GameData)
          const {enemyName, enemyField, yourField , player , winner} = (data as GameData)
          findCells(enemyField,enemyBoard,setEnemyBoard) 
          findCells(yourField,myBoard,setMyBoard) 
          setEnemyName(enemyName as string)
          if(player && !winner)setCanShoot(player?.isLead)
          setServerError('')
        break 
      }
    }
}, [gameData])

  useEffect(() => {
    webSocketController.addMessageListener(setGameData)
    restart();
    return () => webSocketController.deleteAllCallbacks();
  }, []);

  return (
    <div className={styles.global}>
      <h2> SeaBattle </h2>
      <div className={styles.main}>
        <div className={styles.main_conteiner}>
          <p>{user || "User"}</p>
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
          <p>{enemyName || 'Enemy'}</p>
          <FieldComp
            board={enemyBoard}
            isEnemy={true}
            setBoard={setEnemyBoard}
            canShoot={canShoot}
            shipsReady={shipsReady}
            shoot={shoot}
          />
        </div>
      </div>
      <InfoComp ready={ready} 
                canShoot={canShoot} 
                shipsReady={shipsReady} 
                start={start} 
                count={count} 
                winner={otherData?.winner}
                mainUser={otherData?.isMainUser}/>
      {serverError!=='' && <p>{serverError}</p>}
      {otherData && ((otherData.isMainUser && !start) && <Button onClick={startGame} 
                                                     disabled={!otherData.isEnemyReady}>Старт</Button>)}
      <Button onClick={exitGame}>Выйти</Button>
    </div>
  );
};
