import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../Components/common/Button";
import { Board } from "../../Components/SeaBattle/Board";
import { FieldComp } from "../../Components/SeaBattle/FieldComp";
import { InfoComp } from "../../Components/SeaBattle/InfoComp";
import { IGameData, IRequest } from "../../Components/SeaBattle/Interfaces";
import useUserStore from "../../store";

const webSocket = new WebSocket('ws://rsgames.online:8001/game/SeaWar')

const initialState = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0]
]


import styles from "./SeaBattle.module.scss";

export const SeaBattle = () => {
  const params = useParams();
  const gameId = params.id;
  const navigate = useNavigate()
  const [myBoard, setMyBoard] = useState(new Board());
  const [enemyBoard, setEnemyBoard] = useState(new Board());
  const user = useUserStore((state) => state.user);
  const [enemyName, setEnemyName] = useState<string|null>("");
  const [shipsReady, setShipsReady] = useState(false);
  const [canShoot, setCanShoot] = useState(false);
  const [actualMy, setActulMy] = useState<number[][]>(initialState)
  const [actualEnemy, setActulEnemy] = useState<number[][]>(initialState)

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
      type:"ready",
      data:{
        gameId,x,y,
      }
    }
    webSocket.send(JSON.stringify(request))
  };
  const setShip = (x: number, y: number) => {
    const request = {
      type:"set",
      data:{
        gameId,x,y,
      }
    }
    webSocket.send(JSON.stringify(request))
  };

  // const changeBoard = (
  //   board:Board,
  //   setBoard:React.Dispatch<React.SetStateAction<Board>>,
  //   x:number, y:number,hit:boolean) => {
  //   if(hit){
  //     board.damage(x,y)
  //   }else {   
  //     board.miss(x,y)
  //   }
  //   const newBoard = board.getCopy()
  //   setBoard(newBoard)
  // }

  const findCells = (
     data:number[][],
     board:Board,
     setBoard:React.Dispatch<React.SetStateAction<Board>>,
     actual:number[][],
     setActual:React.Dispatch<React.SetStateAction<number[][]>>,
     myShoot:boolean) => {
    data.forEach((arr,x)=>{
      arr.forEach((number,y)=>{
          if(number===-1){
            board.miss(x,y)
          }
          if(number===-2){
            board.damage(x,y)
          }
          if(number===-2 && number!==actual[x][y]){
            myShoot ? setCanShoot(true) : setCanShoot(false)
          }
          if(number===-1 && number!==actual[x][y]){
            !myShoot ? setCanShoot(true) : setCanShoot(false)
          }
      })
    })
    const newBoard = board.getCopy()
    setBoard(newBoard)
    setActual(data)
  }

  webSocket.onmessage = (resp:MessageEvent<string>) => {
    const type:string = JSON.parse(resp.data).type
    const payload:IGameData = JSON.parse(resp.data).data
    const {player , enemyName, gameId, enemyField, yourField} = payload
    console.log(type,payload)
    switch (type) {
      case "message": 
        // return navigate('/') 
        console.log(payload)
      break
      case "game-data":
        findCells(enemyField,enemyBoard,setEnemyBoard,actualEnemy,setActulEnemy,true) 
        findCells(yourField,myBoard,setMyBoard,actualMy,setActulMy,false) 
        setEnemyName(enemyName)
      break 
    }
  }

  const ready = () => {
    const request = {
      type:"ready",
      data:{gameId}
    }
    webSocket.send(JSON.stringify(request))
    setShipsReady(true)
  }

  const startGame = ()=>{
    const request = {
      type:"start",
      data:{gameId}
    }
    webSocket.send(JSON.stringify(request))
    setShipsReady(true)
  }

  useEffect(() => {
    // const request = {
    //   type:"ws-connect",
    //   data:{player:user, gameId}
    // }
    // webSocket.send(JSON.stringify(request))
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
            setShip={setShip}
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
      <Button onClick={startGame}>Старт</Button>
    </div>
  );
};
