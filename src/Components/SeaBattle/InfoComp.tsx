import Button from "../common/Button";

interface IProps {
  shipsReady: boolean;
  canShoot: boolean;
  ready:()=>void;
  start:string
}

export const InfoComp = ({
  shipsReady = false,
  canShoot = false,
  ready,
  start
}: IProps) => {
  if (!shipsReady) {
    return <Button onClick={() => ready()}>Корабли готовы</Button>;
  }
  if(start===''){
    return <p>Ожидание 2 игрока</p>
  }
  return <div>{canShoot ? <p>Стреляй</p> : <p>Выстрел соперника </p>}</div>;
};
