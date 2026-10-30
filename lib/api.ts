import axios, { type AxiosResponse } from 'axios';
import type {NewNoteData, Note } from '../types/note';

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

//axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
//axios.defaults.headers.common['Authorization'] = `Bearer ${myKey}`;

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    'Authorization': `Bearer ${myKey}`,
    'accept': 'application/json',
  }
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number; 
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

  //let url = tag ? `/notes/filter/${tag}` : '/notes'
  //if (query) {
  //  url += '/query'
  //}

 /* const options = {
    method: 'GET',
    url: '/notes',
    params: queryParams,
    headers: {
      accept: 'application/json',
    }
    };
    
    const response: AxiosResponse<FetchNotesResponse> = await axios.request<FetchNotesResponse>(options);
  */
  
  const response = await api.get<FetchNotesResponse>('/notes', {
    params: queryParams,
  });
  return response.data;
};

/************************************************** 
export const getPosts = async (tagName?: string, search?: string) => {
  let url = tagName ? `/posts/tag/${tagName}` : '/posts'
  if (search) {
    url += '/search'
  }
  const { data } = await axios.get<PostListResponse>(url, { params: { q: search } })
  return data
}

************************************************** */


export const fetchNoteById = async (id: string): Promise<Note> => {

 /*   const queryParams: Record<string, string> = {
        page: String(page),
        perPage: '12',
    }; 
    
    if (query && query.trim() !== '') {
    queryParams.search = query;
  }*/

/*  const options = {
    method: 'GET',
    url: `/notes/${id}`,
    //params: queryParams,
    headers: {
      accept: 'application/json',
    }
    };*/
    
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