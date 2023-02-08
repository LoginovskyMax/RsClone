import React from 'react'
import { Board } from './Board'
import { CellComponent } from './CellComponent'
import styles from './Field.module.scss' 


interface IProps {
board:Board
setBoard:React.Dispatch<React.SetStateAction<Board>>
shipsReady:boolean 
isEnemy:boolean 
canShoot:boolean 
shoot?:Function
}

export const FieldComp = ({board, setBoard , shipsReady , isEnemy , canShoot , shoot}:IProps) => {
const classes = [styles.board]

const addMark = (x:number,y:number)=>{
  if(!shipsReady && !isEnemy){
    board.createShip(x,y)
  } else if(canShoot && isEnemy){
    shoot && shoot(x,y)
  }
  updateBoard()
}

const updateBoard = () => {
  const newBoard = board.getCopy()
  setBoard(newBoard)
}

if(canShoot){
  classes.push(styles.can_shoot)
}
  return (
    <div className={classes.join(' ')}>
      {board.cells.map((row,i)=><React.Fragment key={i}>
         {row.map((cell,j)=><CellComponent key={cell.id} cell={cell} addMark={addMark}></CellComponent>)}
      </React.Fragment>)}
    </div>
  )
}
