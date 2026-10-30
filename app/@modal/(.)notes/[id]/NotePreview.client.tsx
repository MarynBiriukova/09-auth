'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import { useRouter } from 'next/navigation';
import css from './NotePreview.module.css'; 
//import type { Note } from '@/types/note';

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {

  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <div>
          <p>Loading note details...</p>
        </div>
      </Modal>
    );
  }

  if (isError || !note) {
    return (
      <Modal onClose={handleClose}>
        <div>
        <p>
          The note data could not be loaded, or the note has been deleted.
          </p>
          <button onClick={handleClose} className={css.backBtn || ''}>
            Go Back
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <article className={css.container || ''} >

        <h2 className={css.title || ''} >
          {note.title}
        </h2>

        {note.tag && (
          <span className={css.tag || ''} >
            {note.tag}
          </span>
        )}

        <p className={css.content || ''} >
          {note.content}
        </p>

        <div 
          className={css.meta || ''} >
          <span>Create: {new Date(note.createdAt).toLocaleDateString()}</span>
        </div>

        <div>
          <button
            onClick={handleClose}
            className={css.backBtn || ''}>
            Close
          </button>
        </div>

      </article>
    </Modal>
  );
}