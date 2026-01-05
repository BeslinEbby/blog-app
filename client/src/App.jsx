import React from 'react'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import {ToastContainer} from "react-toastify"

const App = () => {
  return (
    <>
    <ToastContainer/>
      <AuthProvider>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App