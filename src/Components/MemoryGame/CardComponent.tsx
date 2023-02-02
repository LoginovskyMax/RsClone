import React, { useEffect, useRef, useState } from 'react'

interface props {
  card: {
    id: number
    name: string
    hasPair: boolean
  }
  onPress: (id: number) => void
  countTry: number
  pairs: number
  clickCount: React.Dispatch<React.SetStateAction<number>>
  startGame: boolean
  inGame: boolean
}

export default function CardComponent ({ card, onPress, countTry, pairs, clickCount, startGame, inGame }: props) {
  const [isOpen, setIsOpen] = useState(false)
  const canClick = useRef(false)
  const handler = () => {
    if (inGame) {
      if (canClick.current && pairs < 2) {
        setIsOpen(true)
        onPress(card.id)
        canClick.current = false
      }
    }
  }
  useEffect(() => {
    if (!card.hasPair && countTry !== 0) {
      setTimeout(() => {
        setIsOpen(false)
        canClick.current = true
        clickCount(0)
      }, 1000)
    }
  }, [countTry])

  useEffect(() => {
    if (startGame) {
      setIsOpen(true)
      canClick.current = false
    }
    if (!startGame) {
      setIsOpen(false)
      canClick.current = true
    }
  }, [startGame])

  return (
    <div className={isOpen ? 'card card-open' : 'card'} onClick={handler} >
        <div className={isOpen ? 'card-open__shirt' : 'card__shirt'}></div>
        <div className={isOpen ? 'card-open__face' : 'card__face'}>{card.name} {card.hasPair.toString()}</div>
    </div>
  )
}
