import { useState } from 'react'
import React, { Routes, Route, useNavigate } from 'react-router-dom'
import './App.scss'
import LoginPage from './Pages/LoginPage'
import MainPage from './Pages/MainPage'

function App () {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()
  return (
    <div className="App">
      <h1>Vite + React</h1>
      <button onClick={() => { navigate('/') }} >Login</button>
      <button onClick={() => { navigate('/main') }} >Main</button>
      <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path='/main' element={<MainPage/>}/>
      </Routes>
    </div>
  )
}

export default App
