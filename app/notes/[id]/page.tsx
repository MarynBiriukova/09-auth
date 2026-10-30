import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';
import NoteDetailsClient from './NoteDetails.client';
import type { Note } from '../../../types/note'; 
import { Metadata } from 'next';


interface PageProps{
    params: Promise<{ id: string }>;
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);

    if (!note) {
      return { title: 'Note not found | NoteHub' };
    }
    return {
      title: `${note.title}`,
      description: `${note.content.slice(0, 30)}...`,
      openGraph: {
        title: `Note: ${note.title}`,
        description: note.content.slice(0, 30),
        url: 'https://08-zustand-puce-theta.vercel.app',
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: note.content.slice(0, 30),
          }
        ]
      }

    };
  } catch  {
    return {
      title: 'Note Detail | NoteHub',
      description: 'View your note details on NoteHub.',
    };
  }
}

export const instant = false;

export default async function NoteDetailsPage(
    { params }: PageProps) {
    const { id } = await params;
  const queryClient = new QueryClient();

  try{    
  await queryClient.prefetchQuery <Note>({
    queryKey: ['note', id] as const,
    queryFn: () => fetchNoteById(id) as unknown as Promise <Note>,
  });
  } catch (error) {
    console.error('Server prefetch failed during build:', error);
    }
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
  </HydrationBoundary>
  );
}
