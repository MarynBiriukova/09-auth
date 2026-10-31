import { create } from 'zustand'
import { UserResponse } from '@/lib/api/clientApi'

/*interface UserResponse {
  id: string
  email: string
  username: string
  role: string
  avatar?: string
  createdAt: string
  updatedAt: string
}*/

interface AuthStore {
  isAuthenticated: boolean
  user: UserResponse | null
  setAuth: (user: UserResponse) => void
  clearAuth: () => void
}

export const useAuth = create<AuthStore>()((set) => {
  return {
    isAuthenticated: false,
    user: null,
    setAuth: (user: UserResponse) => set({ user, isAuthenticated: true }),
    clearAuth: () => set({ isAuthenticated: false, user: null }),
  }
})