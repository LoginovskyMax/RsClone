import React, { useEffect, useRef, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import CardComponent from '../Components/MemoryGame/CardComponent'

interface ICard {
  id: number
  name: string
  hasPair: boolean
}

const cardsArr = [
  { id: 1, name: 'Circle', hasPair: false },
  { id: 2, name: 'Circle', hasPair: false },
  { id: 3, name: 'Square', hasPair: false },
  { id: 4, name: 'Square', hasPair: false },
  { id: 5, name: 'Star', hasPair: false },
  { id: 6, name: 'Star', hasPair: false },
  { id: 7, name: 'Triangle', hasPair: false },
  { id: 8, name: 'Triangle', hasPair: false },
  { id: 9, name: '5', hasPair: false },
  { id: 10, name: '5', hasPair: false },
  { id: 11, name: '6', hasPair: false },
  { id: 12, name: '6', hasPair: false },
  { id: 13, name: '10', hasPair: false },
  { id: 14, name: '10', hasPair: false },
  { id: 15, name: '11', hasPair: false },
  { id: 16, name: '11', hasPair: false }
]
const randomArr = [...cardsArr].sort(() => Math.random() - 0.5)

export default function MemoryGame () {
  const navigate = useNavigate()
  const [cards, setCards] = useState(randomArr)
  const [inGame, setInGame] = useState(false)
  const [startGame, setStartGame] = useState(false)
  let [countTry, setCountTry] = useState(0)
  let [openCards, setOpenCards] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [level, setLevel] = useState(8)
  const pairs = useRef<ICard[]>([])
  const openPairs = useRef(0)

  const onPress = (id: number) => {
    setOpenCards(openCards += 1)
    const obj = cardsArr.find(item => item.id === id)
    if (obj != null) {
      pairs.current.push(obj)
    }
    if (pairs.current.length === 2) {
      if (pairs.current[0].name === pairs.current[1].name) {
        pairs.current[0].hasPair = true
        pairs.current[1].hasPair = true
        const arr = [...cards]
        arr.splice(cards.indexOf(pairs.current[0]), 1, pairs.current[0])
        arr.splice(cards.indexOf(pairs.current[1]), 1, pairs.current[1])
        setCards(arr)
        openPairs.current += 1
      }
      pairs.current = []
      setCountTry(countTry += 1)
    }
  }
  const startGameFunc = () => {
    setInGame(true)
    setStartGame(true)
    setTimeout(() => {
      setStartGame(false)
    }, 3000)
  }
  const restartGame = () => {
    setStartGame(true)
    const arr = [...cardsArr.slice(0, level).sort(() => Math.random() - 0.5)]
    arr.forEach(item => item.hasPair = false)
    setCards(arr)
    setCountTry(0)
    pairs.current = []
    openPairs.current = 0
    setOpenCards(0)
    setTimeout(() => {
      setStartGame(false)
    }, 3000)
  }

  const sendData = () => {
    const message = {
      id: 'UserID',
      game: 'MemoryGame',
      result: countTry
    }
    fetch('https://localhost:8000/saveProgress', {
      method: 'POST',
      body: JSON.stringify(message)
    })
  }

  useEffect(() => {
    if (openPairs.current === level / 2) {
      setShowModal(true)
    }
  }, [openPairs.current])

  useEffect(() => {
    const arr = cardsArr.slice(0, level)
    setCards(arr.sort(() => Math.random() - 0.5))
    restartGame()
    setInGame(false)
  }, [level])

  return (
    <div>
        <h2> Memory Game</h2>
        <div>
        <button onClick={startGameFunc} disabled={!!inGame}>Начать игру</button>
        <button onClick={restartGame}>Рестарт</button>
        <p>Сложность: </p>
        <select onChange={(e) => { setLevel(+(e.target.value)) }}>
            <option value="8">Легкий</option>
            <option value="12">Средний</option>
            <option value="16">Тяжелый</option>
        </select>
        </div>

        <p>Количество попыток: {countTry}</p>
        <div className='cards-conteiner'>
        {cards.map(item => <CardComponent key={item.id} card = {item}
                                                    onPress={onPress}
                                                    countTry={countTry}
                                                    pairs = {openCards}
                                                    clickCount ={setOpenCards}
                                                    startGame = {startGame}
                                                    inGame = {inGame}/>)}
        </div>
        {showModal &&
             <div className='modal-window'>
                <div className='modal-window__main'>
                    <p>Поздравляем с победой!!!</p>
                    <p>Ваш результат {countTry}</p>
                    <button onClick={() => { navigate('/main'); setShowModal(false) }}>На главную</button>
                    <button onClick={() => { restartGame(); setShowModal(false) }}>Начать заново</button>
                </div>
            </div>}
    </div>
  )
}
