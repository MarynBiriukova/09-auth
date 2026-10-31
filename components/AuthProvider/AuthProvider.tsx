'use client'

import { checkSession, getMe } from '@/lib/api/clientApi'
import { useAuth } from '@/lib/store/authStore'
import { useEffect, useRef } from 'react'

interface Props {
  children: React.ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const setAuth = useAuth((state) => state.setAuth)
  const clearAuth = useAuth((state) => state.clearAuth)

  const hasRun = useRef(false)

  useEffect(() => {

    if (hasRun.current) return
    hasRun.current = true

    const fetchSession = async () => {
      try{
      const isAuth = await checkSession()
      if (isAuth) {
        const user = await getMe()
        setAuth(user)
      } else {
        clearAuth()
        }
      } catch (error) {
        console.error('Error auth or З`єднання з server')
        clearAuth()
      }
    }
    fetchSession()
  }, [clearAuth, setAuth])

  return children
}

export default AuthProvider