import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../lib/api';

import css from './NoteList.module.css'
import type { Note } from '../../types/note';

import Link from 'next/link';

interface NoteListProps{
    notes: Note[];
}
    
function NoteList({ notes }: NoteListProps) {
    
    const queryClient = useQueryClient(); 

    const deleteNoteMutation = useMutation({
        mutationFn: (id: string) => deleteNote(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'], });
        }, 
       /* onError: (error) =>
        { помилка при видаленні Note },*/
        });
        
    return (
        <ul className={css.list}>
            {/* Набір елементів списку нотаток */}
            {notes.map((note) => (
                <li className={css.listItem} key = {note.id}>
                    <h2 className={css.title}>{note.title}</h2>
                    <p className={css.content}>{note.content}</p>
                    <div className={css.footer}>
                        <span className={css.tag}>{note.tag}</span>
                        <Link href={`/notes/${note.id}`} className={css.link}>View details</Link>
                        <button
                            type='button'
                            className={css.button}
                            disabled = {deleteNoteMutation.isPending} 
                            onClick = {() => deleteNoteMutation.mutate(note.id)}

                        >Delete</button>
                    </div>
                </li>))}
  
        </ul>

    );
}

export default NoteList 
