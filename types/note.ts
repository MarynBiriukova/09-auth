export interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    tag: string;
    //completed: boolean;
}


export interface NewNoteData {
  title: string;
    content: string;
    tag: string;
}

/******************************************************* */
/*    
export interface NoteListResponse {
  notes: NoteResponse[]
  total: number
}

export interface NoteResponse {
  id: string
  title: string
  content: string
  categoryId: string
  userId: string
}*/