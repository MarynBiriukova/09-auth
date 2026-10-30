//register
//login
//logout
//checkSession
//getMe
//updateMe

import axios, { type AxiosResponse } from 'axios';
import type { NewNoteData, Note } from '../../types/note';
import api, { ApiError } from '@/lib/api/api';
import { User } from '@/types/user'
//import type {
//  SessionResponse, LoginRequest, UserResponse,
//  RegisterRequest
// } from '../../types/user';

export interface UserResponse {
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
  name?: string
  password: string
}

export interface RegisterResponse{
  user: User
  accessToken: string
  refreshToken: string
}

export interface SessionResponse {
  success: boolean
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number; 
}

export interface UpdateProfileRequest{
  username: string
  email: string
}


export const fetchNotes = async (query: string, page: number = 1, tag: string = ''): Promise<FetchNotesResponse> => {

    const queryParams: Record<string, string> = {
        page: String(page),
        perPage: '12',
    }; 
    
    if (query && query.trim() !== '') {
    queryParams.search = query;
  }

  if (tag && tag.trim() !== '' && tag.toLowerCase() !== 'all') {
    //const formattedTag = tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
    queryParams.tag = tag;
  }

  
  const response = await api.get<FetchNotesResponse>('/notes', {
    params: queryParams,
  });
  return response.data;
};


export const fetchNoteById = async (id: string): Promise<Note> => {

    
    const response: AxiosResponse<Note> = await api.get<Note>(`/notes/${id}`);
  return response.data;
};


export const deleteNote = async (id: string): Promise<Note> => {
  const res = await api.delete<Note>(`/notes/${id}`)
  return res.data
}

export const createNote = async (newNoteData: NewNoteData): Promise<Note> => {
  const res = await api.post<Note>('/notes', newNoteData);
  return res.data;
}

export const logout = async () => {
  const { data } = await api.post<SessionResponse>(`/auth/logout`)
  return data
}

export const login = async (user: LoginRequest) => {
  const { data } = await api.post<UserResponse>(`/auth/login`, user)
  return data
}

export const register = async (user: RegisterRequest): Promise<RegisterResponse> => {
  const { data } = await api.post<RegisterResponse>(`/auth/register`, user, {
    withCredentials: true,
  })
  return data
}

export const checkSession = async () => {
  const { data } = await api.get<SessionResponse>(`/auth/session`)
  return data.success
}

export const getMe = async () => {
  const { data } = await api.get<UserResponse>(`/users/me`)
  return data
}

export const updateMe = async (userData: UpdateProfileRequest): Promise<UserResponse> => {
  const { data } = await api.patch<UserResponse>(`/users/me`, userData)
  return data
}