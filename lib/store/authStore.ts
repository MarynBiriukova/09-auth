import { create } from 'zustand'
//import { UserResponse } from '../../types/user'

interface UserResponse {
  id: string
  email: string
  username: string
  role: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

interface AuthStore {
  isAuth: boolean
  user: UserResponse | null
  setAuth: (user: UserResponse) => void
  clearAuth: () => void
}

export const useAuth = create<AuthStore>()((set) => {
  return {
    isAuth: false,
    user: null,
    setAuth: (user: UserResponse) => set({ user, isAuth: true }),
    clearAuth: () => set({ isAuth: false, user: null }),
  }
})