import fire from "../../assets/seaBattle/fire.png";
import mine from "../../assets/seaBattle/mine.png";

import type { Cell } from "./Board";
import styles from "./Cell.module.scss";

interface IProps {
  cell: Cell;
  addMark: (x: number, y: number) => void;
}

export const CellComponent = ({ cell, addMark }: IProps) => {
  const classes = [styles.cell];
  classes.push(styles[cell.mark.color]);

  return (
    <div className={classes.join(" ")} onClick={() => addMark(cell.x, cell.y)}>
      {cell.mark.name === "miss" && <img src={mine} width="13" alt="mine" />}
      {cell.mark.name === "damage" && <img src={fire} width="16" alt="mine" />}
    </div>
  );
};
