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
    const [gameID, setGameID] = useState('')
    const [token, setToken] = useState('')
    const [testUser, setUser] = useState('')
    const user = useUserStore((state) => state.user);


    webSocket.onmessage = (resp:MessageEvent<string>) => {
        const type:string = JSON.parse(resp.data).type
        const data:{type:string,data:IGameData} = JSON.parse(resp.data)
     
        switch (type) {
            case "message": 
              // return navigate('/') 
              console.log(data)
            break
            case "game-data":
                const { gameId }  = data.data
                console.log(gameId);
                setGameID(gameId)
            break 
          }
        
    }

    const startGame = () => {
        if(gameID!==''){
            navigate(`/SeaBattle/${gameID}`)
        }
    }

    
    const createGame = (create:boolean) => {
        let request:{type:string, data:{gameId:string}|{}}
        if(create){
            request = {
                type:"create",
                data:{}
              }
        }else{
            request = {
                type:"join",
                data:{gameId:gameID}
              }
        }
        console.log(request);
        webSocket.send(JSON.stringify(request))
    }

    useEffect(() => {
        if(token){
            const request = {
                type:"ws-connect",
                data:{
                 player:testUser,
                 token:token}
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
        {inviteGame ? <div>
            <input placeholder="ID игры"
                                 type='text'
                                 onChange={(e)=>setGameID(e.target.value)}></input> 
            <Button  onClick={()=>createGame(false)}>Войти</Button>
        </div>
                        : <Button onClick={()=>createGame(true)}>Создать игру</Button>}
        {gameID!=='' && <p>ID для вашей игры: {gameID}</p>}
        <input type="text" placeholder="token" onChange={(e)=>setToken(e.target.value)}/>
        <input type="text" placeholder="test user" onChange={(e)=>setUser(e.target.value)}/>
        <Button onClick={startGame}>Начать</Button>
    </div>
  )
}
