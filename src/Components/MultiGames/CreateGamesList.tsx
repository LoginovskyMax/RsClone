import { useState, useEffect } from "react";
import styles from './CreateGamesList.module.scss'

interface IGames {
gameId:string
maxPlayers:number
name:string
player:string
playersInGame:number
}
interface IProps {
    gameName:string
    joinGame:(id:string)=>void
}

export const CreateGamesList = ({gameName, joinGame}:IProps) => {
  const [gamesArr, setGamesArr] = useState<IGames[]>([])

  const getGames = () => {
    fetch(`https://rsgames.online:8888/games/list?name=${gameName}`)
      .then<IGames[]>(response=>response.json())
      .then(data=>{
        setGamesArr(data)
      })
      .catch((err)=>console.log(err))
  }

  useEffect(()=>{
    getGames()
  },[])
  return (
    <div className={styles.main}>
        <h2>Список доступных игр </h2>
       
        {gamesArr.map((game)=><div key={game.gameId} 
                                   className={styles.main_item}
                                   onClick={()=>joinGame(game.gameId)}>
        <p>Создал : {game.player}</p>
        <p>В игре : {game.maxPlayers} / {game.playersInGame}</p>
       </div>)}
     
       <button onClick={getGames}>Refresh</button>
    </div>
  )
}
