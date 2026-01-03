import React from 'react'
import { AuthProvider } from './context/AuthContext'

const App = () => {
  return (
    <div>
      <AuthProvider></AuthProvider>
    </div>
  )
}

export default App