import React from "react";

import type { Board } from "./Board";
import { CellComponent } from "./CellComponent";
import styles from "./Field.module.scss";

interface IProps {
  board: Board;
  setBoard: React.Dispatch<React.SetStateAction<Board>>;
  shipsReady: boolean;
  isEnemy: boolean;
  canShoot: boolean;
  shoot?: (x:number,y:number)=>void
  setShip?:(x:number,y:number)=>void
}

export const FieldComp = ({
  board,
  setBoard,
  shipsReady,
  isEnemy,
  canShoot,
  shoot,
  setShip
}: IProps) => {
  const classes = [styles.board];

  const updateBoard = () => {
    const newBoard = board.getCopy();
    setBoard(newBoard);
  };

  // const ClickHandler = () => {
    
  // }

  const addMark = (x: number, y: number) => {
    if (!shipsReady && !isEnemy) {
      board.createShip(x, y);
      setShip && setShip(x,y)
    } else if (canShoot && isEnemy) {
      shoot && shoot(x, y);
    }

    updateBoard();
  };

  if (canShoot && isEnemy) {
    classes.push(styles.can_shoot);
  }

  return (
    <div className={classes.join(" ")}>
      {board.cells.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((cell) => (
            <CellComponent key={cell.id} cell={cell} addMark={addMark} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};
