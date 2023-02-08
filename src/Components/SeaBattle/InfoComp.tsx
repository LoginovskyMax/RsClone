import Button from "../common/Button"

interface IProps {
    shipsReady:boolean
    canShoot:boolean
    ready:Function
}

export const InfoCpmp = ({shipsReady = false , canShoot = false, ready}:IProps) => {
    
  if(!shipsReady){
    return <Button onClick={()=>ready()}>Корабли готовы</Button>
  }
  return (
    <div >
        {canShoot ? <p>Стреляй</p> : <p>Выстрел соперника </p>}
    </div>
  )
}