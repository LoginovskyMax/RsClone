import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Board } from "../../Components/SeaBattle/Board";
import { FieldComp } from "../../Components/SeaBattle/FieldComp";
import { InfoComp } from "../../Components/SeaBattle/InfoComp";
import useUserStore from "../../store";

const webSocket = new WebSocket('ws://localhost:8888')


import styles from "./SeaBattle.module.scss";

export const SeaBattle = () => {
  const params = useParams();
  const gameId = params.id;
  const navigate = useNavigate()
  const [myBoard, setMyBoard] = useState(new Board());
  const [enemyBoard, setEnemyBoard] = useState(new Board());
  const user = useUserStore((state) => state.user);
  const [enemyName, setEnemyName] = useState("");
  const [shipsReady, setShipsReady] = useState(false);
  const [canShoot, setCanShoot] = useState(false);

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
      event:"shoot",
      payload:{
        username:user,
        x,y,gameId
      }
    }
    webSocket.send(JSON.stringify(request))
  };

  const changeBoard = (
    board:Board,
    setBoard:React.Dispatch<React.SetStateAction<Board>>,
    x:number, y:number,hit:boolean) => {
    if(hit){
      board.damage(x,y)
    }else {
      board.miss(x,y)
    }
    const newBoard = board.getCopy()
    setBoard(newBoard)
  }

  webSocket.onmessage = resp => {
    const { type, payload } = JSON.parse(resp.data)
    const {userName , x, y , canStart, enemyName, succes} = payload

    switch (type) {
      case "connectToPlay": if (!succes){
        return navigate('/')
      }
      setEnemyName(enemyName)
      break
      case "readyToPlay": if(payload.userName === user && canStart){
        setCanShoot(true)
      }
      break
      case "afterShootByMe":if(userName !== user){
        const hit = myBoard.cells[y][x].mark.name === "ship"
        changeBoard(myBoard,setMyBoard,x,y,hit)
        const request = {
          event:"checkShoot",
          payload:{...payload, hit}
        }
        webSocket.send(JSON.stringify(request))
        if(!hit){
          setCanShoot(true)
        }
      }
      break
      case "hit": if(userName === user){
        changeBoard(enemyBoard,setEnemyBoard,x,y,payload.hit)
        payload.hit ? setCanShoot(true) : setCanShoot(false)
      }
    }
  }

  const ready = () => {
    const request = {
      event:"ready",
      payload:{username:user, gameId}
    }
    webSocket.send(JSON.stringify(request))
    setShipsReady(true)
  }

  useEffect(() => {
    const request = {
      event:"connect",
      payload:{username:user, gameId}
    }
    webSocket.send(JSON.stringify(request))
    restart();
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
          />
        </div>
        <div className={styles.main_conteiner}>
          <p>{enemyName || 'Enemy'}</p>
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
      <InfoComp ready={ready} canShoot={canShoot} shipsReady={shipsReady}/>
    </div>
  );
};
