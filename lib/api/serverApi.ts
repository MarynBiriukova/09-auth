// fetchNotes
//fetchNoteById
//getMe
//checkSession
import { type AxiosResponse } from 'axios';
import api from '@/lib/api/api';//, { ApiError }
import { cookies } from 'next/headers';
import type { Note } from '@/types/note'; 
//import { Cookie } from 'next/font/google';
//import { nextServer } from './nextServer';
//import axios, { type AxiosResponse } from 'axios';
//import { SessionResponse, UserResponse } from '@/types/user'
import { type User } from '@/types/user';

/*export interface UserResponse {
  id: string
  email: string
  username: string
  role: string
  createdAt: string
  updatedAt: string
}*/

export interface SessionResponse {
  success: boolean
}


interface FetchNotesResponse {
  notes: Note[];
  totalPages: number; 
}
// допоміжна ф-ція
const getServerHeader = async () => {
    const cookieStore = await cookies();

    return {
        Cookie: cookieStore.toString(),
    };
};

export const fetchNotes = async (query: string, page: number = 1, tag: string = ''): Promise<FetchNotesResponse> => {

    const queryParams: Record<string, string> = {
        page: String(page),
        perPage: '12',
    }; 
    
    if (query && query.trim() !== '') {
    queryParams.search = query;
  }

  if (tag && tag.trim() !== '' && tag.toLowerCase() !== 'all') {
      queryParams.tag = tag;
    }
    
    const headers = await getServerHeader();

  
  const response = await api.get<FetchNotesResponse>('/notes', {
      params: queryParams,
      headers: headers,
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {

    const headers = await getServerHeader();
    
    const response: AxiosResponse<Note> = await api.get<Note>(`/notes/${id}`,
        {headers : headers,}
    );
  return response.data;
};

export const getMe = async () => {

    const headers = await getServerHeader();
    
    const response = await api.get<User>(`/users/me`,
        {headers : headers,}
    );
  return response.data;
};

export const checkSession = async (): Promise<AxiosResponse<SessionResponse>> => {
  const headers = await getServerHeader();
  const response = await api.get<SessionResponse>('/auth/session', {
    headers: headers,
  });
  return response;
};
