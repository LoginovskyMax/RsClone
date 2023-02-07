import { useEffect, useState } from "react";
import { Board } from "../../Components/SeaBattle/Board";
import styles from "./SeaBattle.module.scss";
import useUserStore from "../../store";
import { FieldComp } from "../../Components/SeaBattle/FieldComp";


export const SeaBattle = () => {
  const [myBoard, setMyBoard] = useState(new Board())
  const [enemyBoard, setEnemyBoard] = useState(new Board())
  const user = useUserStore((state) => state.user);
  const [enemyName, setEnemyName] = useState('')
  const [shipsReady, setShipsReady] = useState(false)
  const [canShoot, setCanShoot] = useState(false)

  const restart = () => {
    const newBoard = new Board()
    const newEnemyBoard = new Board()
    newBoard.initCells()
    newEnemyBoard.initCells()
    setMyBoard(newBoard)
    setEnemyBoard(newEnemyBoard)
  }

  const shoot = (x:number,y:number) => {

  }

  useEffect(()=>{
     restart()
  },[])
  return (
    <div className={styles.global}>
       <h2> SeaBattle </h2>
       <div className={styles.main}>
       <div className={styles.main_conteiner}>
            <p>{user || 'User'}</p>
            <FieldComp board={myBoard} 
                   isEnemy={false} 
                   setBoard = {setMyBoard}
                   canShoot = {false}
                   shipsReady={shipsReady}/>
       </div>
       <div className={styles.main_conteiner}>
            <p>Enemy name</p>
            <FieldComp board={enemyBoard} 
                   isEnemy={true} 
                   setBoard = {setEnemyBoard}
                   canShoot = {canShoot}
                   shipsReady={shipsReady}
                   shoot={shoot}/>
       </div>
       </div>
      
        
    </div>
  )
}
