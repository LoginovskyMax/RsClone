import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../../Components/common/Button"
import styles from "./SeaBattle.module.scss";
import useUserStore from "../../store";
import { IGameData } from "../../Components/SeaBattle/Interfaces";

const webSocket = new WebSocket('ws://rsgames.online:8001/game/SeaWar')

export const CreateGame = () => {
    const navigate = useNavigate()
    const [inviteGame, setInviteGame] = useState(false)
    const [gameID, setGameID] = useState(0)
    const [token, setToken] = useState('')
    const [testUser, setUser] = useState('')
    const user = useUserStore((state) => state.user);


    webSocket.onmessage = (resp:MessageEvent<string>) => {
        const type:string = JSON.parse(resp.data).type
        const payload:IGameData = JSON.parse(resp.data).data
        const {gameId} = payload
        console.log(type,payload)
        switch (type) {
            case "message": 
              // return navigate('/') 
              console.log(payload)
            break
            case "game-data":
                setGameID(gameId)
            break 
          }
        
    }

    const startGame = () => {
        if(gameID!==0){
            navigate(`/SeaBattle/${gameID}`)
        }
    }
    const createGame = (create:boolean) => {
        let request:{type:string, data:{gameId:number}|null}
        if(create){
            request = {
                type:"create",
                data:null
              }
        }else{
            request = {
                type:"join",
                data:{gameId:gameID}
              }
        }
        webSocket.send(JSON.stringify(request))
    }

    useEffect(() => {
        if(token){
            const request = {
                type:"ws-connect",
                data:{
                 player:testUser,
                 token}
              }
              webSocket.send(JSON.stringify(request))
        }
      }, [token]);

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
                        : <Button onClick={()=>createGame(true)}>Создать игру</Button>}
        {gameID!==0 && <p>ID для вашей игры: {gameID}</p>}
        <input type="text" placeholder="token" onChange={(e)=>setToken(e.target.value)}/>
        <input type="text" placeholder="test user" onChange={(e)=>setUser(e.target.value)}/>
        <Button onClick={startGame}>Начать</Button>
    </div>
  )
}
