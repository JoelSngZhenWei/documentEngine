"use client"
import { createContext, useContext, useEffect, useState } from "react"
import { fetchMe } from "@/lib/user-api"
import { User } from "@/schemas/user"

const AuthContext = createContext<{
    user: User | null
    setUser: (user: User | null) => void
  }>({
    user: null,
    setUser: () => {}
  })
  
  export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
  
    useEffect(() => {
      fetchMe().then(res => setUser(res))
    }, [])
  
    return (
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    )
  }
  
  export function useAuth() {
    return useContext(AuthContext)
  }
  