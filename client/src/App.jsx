import React from 'react'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import {ToastContainer} from "react-toastify"
import Home from './pages/Home'
import Login from './pages/Login'
import MyPosts from './pages/MyPosts'

const App = () => {
  return (
    <>
    <ToastContainer/>
      <AuthProvider>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/myposts' element={<MyPosts/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App