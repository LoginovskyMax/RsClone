import { useState } from 'react'
import React, { Routes, Route, useNavigate } from 'react-router-dom'
import './App.scss'
import LoginPage from './Pages/LoginPage'
import MainPage from './Pages/MainPage'
import MemoryGame from './Pages/MemoryGame'

function App () {
  const navigate = useNavigate()
  const getData = () => {
    fetch('https://localhost:8000')
      .then(async response => await response.json())
      .then(data => {
        console.log(data)
      })
  }
  return (
    <div className="App">
      <h1>Vite + React</h1>
      <button onClick={() => { navigate('/') }} >Login</button>
      <button onClick={() => { navigate('/main') }} >Main</button>
      <button onClick={getData}>Fetch</button>
      <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path='/main' element={<MainPage/>}/>
        <Route path='/memorygame' element={<MemoryGame/>}/>
      </Routes>
    </div>
  )
}

export default App
