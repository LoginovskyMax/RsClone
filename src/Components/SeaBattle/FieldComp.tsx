import React, { useCallback } from "react";

import type { Board } from "./Board";
import { CellComponent } from "./CellComponent";
import styles from "./Field.module.scss";

interface IProps {
  board: Board;
  setBoard: React.Dispatch<React.SetStateAction<Board>>;
  shipsReady: boolean;
  isEnemy: boolean;
  canShoot: boolean;
  shoot?: (x: number, y: number) => void;
  setShip?: (x: number, y: number) => void;
}
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export const FieldComp = ({
  board,
  setBoard,
  shipsReady,
  isEnemy,
  canShoot,
  shoot,
  setShip,
}: IProps) => {
  const classes = [styles.board];

  const updateBoard = useCallback(() => {
    const newBoard = board.getCopy();
    setBoard(newBoard);
  }, [board]);

  const addMark = (x: number, y: number) => {
    if (!shipsReady && !isEnemy) {
      if (board.getCell(x, y).mark.name === "ship") {
        board.empty(x, y);
      } else {
        board.createShip(x, y);
      }

      if (setShip) {
        setShip(x, y);
      }
    } else if (canShoot && isEnemy) {
      if (shoot) {
        shoot(x, y);
      }
    }

    updateBoard();
  };

  if (canShoot && isEnemy) {
    classes.push(styles.can_shoot);
  }

  return (
    <div>
      <div className={styles.letters}>
        {letters.map((letter) => (
          <div key={letter} className={styles.letters_item}>
            {letter}
          </div>
        ))}
      </div>
      <div className={styles.horizontal}>
        <div className={styles.numbers}>
          {numbers.map((number) => (
            <div key={number} className={styles.numbers_item}>
              {number}
            </div>
          ))}
        </div>
        <div className={classes.join(" ")}>
          {board.cells.map((row, i) => (
            <React.Fragment key={i}>
              {row.map((cell) => (
                <CellComponent key={cell.id} cell={cell} addMark={addMark} />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
