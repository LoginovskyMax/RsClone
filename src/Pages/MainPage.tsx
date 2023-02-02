import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function MainPage () {
  const navigate = useNavigate()
  return (
    <div>
      MainPage
      <button onClick={() => { navigate('/memorygame') }}>MemoryGame</button>
    </div>
  )
}
