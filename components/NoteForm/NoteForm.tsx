'use client';

import css from './NoteForm.module.css'

import { useMutation, useQueryClient } from '@tanstack/react-query' 
import { useRef } from 'react';
import { createNote } from '../../lib/api'
import type { NewNoteData } from '../../types/note';
import { useNoteDraftStore } from '@/lib/store/noteStore';
import { useRouter } from 'next/navigation';



interface NoteFormProps {
  onClose: () => void;
}


export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  
  const mutation = useMutation({ 
    mutationFn: (newNoteData: NewNoteData) => createNote(newNoteData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'], }); 
      //onSuccess();
    },
    onError: (error) => { console.error('Error create Note:', error); },
  });

/*  const handleInputChange = () => {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    setDraft({
      title: (formData.get('title') as string) || '',
      content: (formData.get('content') as string) || '',
      tag: (formData.get('tag') as string) || 'Todo',
    });
  };*/
  
  const handleFormAction = (formData: FormData) => {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const tag = formData.get('tag') as string;

    if (!title || title.length < 3 || title.length > 50) {
      alert('Title must be between 3 and 50 characters!');
      return;
    }

    if (content && content.length > 500) {
      alert('Content cannot exceed 500 characters!');
      return;
    }

    mutation.mutate(
      { title, content, tag },
      {
        onSuccess: () => {
          //actions.resetForm(); // Очищення полів форми
          formRef.current?.reset();
          clearDraft(); //очищаємо чернетку в Z після успішного створення
          //onClose();           // Закриття форми
          router.push('/notes/filter/all');
        },
      }
    );
  };

     
return(
  <form ref={formRef}
    action={handleFormAction}
    
    className={css.form}>
                
  <div className={css.formGroup}>
    <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
        name="title"
        defaultValue={draft.title}
        onChange={(e) => setDraft({ ...draft, title: e.target.value})}
              required
              minLength={3}
              maxLength={50}
              className={css.input}
              disabled={mutation.isPending}
     />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="content">Content</label>
                    <textarea
                        
      id="content"
        name="content"
        defaultValue={draft.content}
        onChange={(e) => setDraft({ ...draft, content: e.target.value})}
                        maxLength={500}
                        rows={8}
              className={css.textarea}
              disabled={mutation.isPending}
    />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="tag">Tag</label>
                    <select
                    id="tag"
        name="tag"
        defaultValue={draft.tag || 'Todo'}
        onChange={(e) => setDraft({ ...draft, tag: e.target.value})}
              required
              className={css.select}
              disabled={mutation.isPending}
                >
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </select>
  </div>

          <div className={css.actions}>
            
            
              <button
                type="button"
                className={css.cancelButton}
                onClick={() => router.back()}
                disabled={mutation.isPending}
              >
                Cancel
              </button>
            
    <button
                    type="submit"
                    className={css.submitButton}
                    disabled={mutation.isPending}
    >
      Create note
    </button>
  </div>
        </form>
  );
}