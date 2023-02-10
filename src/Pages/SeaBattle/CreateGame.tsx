import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../../Components/common/Button"
import styles from "./SeaBattle.module.scss";

export const CreateGame = () => {
    const navigate = useNavigate()
    const [inviteGame, setInviteGame] = useState(false)
    const [gameID, setGameID] = useState(0)

    const startGame = () => {
        if(gameID!==0){
            navigate(`/SeaBattle/${gameID}`)
        }
    }

  return (
    <div className={styles.main_create}>
        CreateGame
        <div className={styles.main_radio}>
            <label htmlFor="generate">Cоздать игру</label>
            <input type="radio" 
                   id="generate"
                   value= 'generate'
                   name="radio"
                   checked={!inviteGame}
                   onChange={()=>setInviteGame(false)}
                   />
            <label htmlFor="invite">Присоединится к игре</label>
            <input type="radio" 
                   id="invite"
                   value='invite'
                   name="radio"
                   onChange={()=>setInviteGame(true)}
                   />
        </div>
        {inviteGame ? <input placeholder="ID игры"
                                 type='number'
                                 onChange={(e)=>setGameID(parseFloat(e.target.value))}></input> 
                        : <Button onClick={(e)=> {
                            e.preventDefault()
                            setGameID(Date.now())
                        }}>Сгенерировать</Button>}
        {gameID!==0 && <p>ID для вашей игры: {gameID}</p>}
        <Button onClick={startGame}>Начать</Button>
    </div>
  )
}
