/* eslint-disable */
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Button from "../../Components/common/Button"
import styles from "./SeaBattle.module.scss";
import useUserStore from "../../store";
import { webSocketController, wsGameData } from './web-socket/WebSoket';

export const CreateGame = () => {
    const navigate = useNavigate()
    const [inviteGame, setInviteGame] = useState(false)
    const [token, setToken] = useState('')
    const [testUser, setUser] = useState('')
    const [gameId, setGameId] = useState('')
    const user = useUserStore((state) => state.user);

    // вот тут стейт, в который будет прилетать все данные по webSocket
    // сообщения, данные игры и т.п.
    const [gameData, setGameData] = useState<wsGameData>();
    const location = useLocation();

    useEffect(() => {
        // подклюаемся к сокету
       
        // передаем сеттер нашего стейта слушателю сообщений
        // чтобы на каждое сообщение менял стейт с данными
        

        // подключаемся к игре, если есть квери параметры с id игры
        const queryParams = new URLSearchParams(location.search);
        const gameId = queryParams.get("gameId");
        if (gameId) {
            webSocketController.send(
                JSON.stringify({ type: "join", data: { gameId }})
            )
        }
        
        // убиваем все слушатели при выходе со страницы
        return () => webSocketController.deleteAllCallbacks();
    }, [])

    useEffect(() => {
        // Здесь слушаем изменения и выполняем все операции
        console.log("Message resieved");
        console.log(gameData)
        // в общем тут вся логика работы с web soket'ом
    }, [gameData])

    const startGame = () => {
        if(webSocketController.getGameId() !== ''){
            const gameId = webSocketController.getGameId()
            navigate(`/SeaBattle/${ gameId }`)
        }
    }

    
    const createGame = (create:boolean) => {
        let request:{type:string, data:{gameId:string}|null}
        if(create){
            request = {
                type:"create",
                data:null
              }
        }else{
            request = {
                type:"join",
                data:{ gameId }
              }
        }
        console.log(request);
        webSocketController.send(JSON.stringify(request))
    }

    useEffect(() => {
    if(token){
        webSocketController.setUser(testUser)
        webSocketController.setToken(token)
        webSocketController.connect(); 
     
        console.log('connect');
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
                                 onChange={(e)=>{ 
                                    setGameId(e.target.value);
                                }}></input> 
            <Button  onClick={()=>createGame(false)}>Войти</Button>
        </div>
                        : <Button onClick={()=>createGame(true)}>Создать игру</Button>}
         {gameId!=='' && <p>ID для вашей игры: {gameId}</p>}
        <input type="text" placeholder="token" onChange={(e)=>setToken(e.target.value)}/>
        <input type="text" placeholder="test user" onChange={(e)=>setUser(e.target.value)}/>
        <Button onClick={startGame}>Начать</Button>
    </div>
  )
}
