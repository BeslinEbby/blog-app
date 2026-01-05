import React from 'react'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

const App = () => {
  return (
    <>
      <AuthProvider>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App