import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Chatbox from './components/Chatbox'
import { loadUser } from './features/actions/userActions'
import { useDispatch } from 'react-redux'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    console.log("enviroment change")
    dispatch(loadUser())

  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/chatbox" element={<Chatbox />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App