
'use client'

import { createContext, useContext, useEffect, useMemo, ReactNode } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { User } from '@supabase/supabase-js'



interface UserRoles {
  isAdmin: boolean
  isManager: boolean
  isPlayer: boolean
  isAuthenticated: boolean
}

interface AuthContextType extends UserRoles {
  user: User | null

  loading: boolean
  signIn: (provider: 'github' | 'google') => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<void>
  signUpWithEmail: (email: string, password: string, username: string) => Promise<void>
  signOut: () => Promise<void>
  checkAccess: (allowedRoles: string[]) => boolean
  
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth()
  const { user, loading } = auth


  // Vérification des rôles basée sur les metadata de l'utilisateur
  const roles = useMemo(() => {
    if (!user) {
      return {
        isAdmin: false,
        isManager: false,
        isPlayer: false,
        isAuthenticated: false
      }
    }

    const userRole = user.user_metadata?.role || 'PLAYER'
    
    return {
      isAdmin: userRole === 'ADMIN',
      isManager: userRole === 'MANAGER',
      isPlayer: userRole === 'PLAYER',
      isAuthenticated: true
    }
  }, [user])

  // => vérifie l'accès
  const checkAccess = (allowedRoles: string[]): boolean => {
    if (!user) return false
    const userRole = user.user_metadata?.role || 'PLAYER'
    return allowedRoles.includes(userRole)
  }


  const value = {
    ...auth,
    ...roles,
  
    checkAccess
  }

  // loader
  // if (loading) {
  //   return <div>tatete...</div> 
  // }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

// HOC pour protéger les routes
export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles: string[] = []
) {
  return function WithAuthComponent(props: P) {
    const { checkAccess, loading, isAuthenticated } = useAuthContext()

    if (loading) {
      return <div>Loading...</div>
    }

    if (!isAuthenticated) {

        
    
      return <div>Please login to access this page</div>
    }

    if (allowedRoles.length > 0 && !checkAccess(allowedRoles)) {
      return <div>You don't have permission to access this page</div>
    }

    return <WrappedComponent {...props} />
  }
}