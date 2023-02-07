import styles from './Cell.module.scss' 
import mine from '../../assets/seaBattle/mine.png'
import { Cell } from './Board'

interface IProps{
    cell:Cell
    addMark:Function
}

export const CellComponent = ({cell, addMark}:IProps) => {
    const classes = [styles.cell]
    classes.push(styles[cell.mark.color])
  return (
    <div className={classes.join(' ')} onClick={()=>addMark(cell.x,cell.y)}>
      {cell?.mark?.name === 'miss' && <img src={mine} width='20'/>}
    </div>
  )
}
