import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ChatRoom from './components/ChatRoom'
import Login from './components/Login'
import Signup from './components/Signup'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chatroom" element={<ChatRoom />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App