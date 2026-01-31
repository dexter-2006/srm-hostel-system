import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('srmHostelUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password, role) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const userData = {
          id: role === 'admin' ? 'admin_001' : 'student_001',
          email,
          role,
          name: role === 'admin' ? 'Admin User' : 'Student User',
          hostel: role === 'student' ? 'KARRI' : null,
          block: role === 'student' ? 'Block A' : null,
          room: role === 'student' ? '205' : null,
          avatar: `https://ui-avatars.com/api/?name=${role === 'admin' ? 'Admin' : 'Student'}&background=003F87&color=fff`
        }
        
        setUser(userData)
        localStorage.setItem('srmHostelUser', JSON.stringify(userData))
        resolve(userData)
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('srmHostelUser')
  }

  const value = {
    user,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}