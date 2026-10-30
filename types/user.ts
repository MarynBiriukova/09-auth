/*export interface UserResponse {
  id: string
  email: string
  username: string
  role: string
  createdAt: string
  updatedAt: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  username: string
  password: string
}

export interface SessionResponse {
  success: boolean
}*/

export interface User {
  email: string
  username: string
  avatar: string
}