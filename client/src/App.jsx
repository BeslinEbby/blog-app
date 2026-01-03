import React from 'react'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'

const App = () => {
  return (
    <>
      <AuthProvider>
        <Header/>
      </AuthProvider>
    </>
  )
}

export default App