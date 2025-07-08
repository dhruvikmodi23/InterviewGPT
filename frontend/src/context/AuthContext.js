// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentUser, logout as apiLogout } from '../api/auth'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      const currentUser = getCurrentUser()
      setUser(currentUser)
      setLoading(false)
    }
    initializeAuth()
  }, [])

  const login = (userData) => {
    setUser(userData)
  }

  const logout = () => {
    apiLogout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)