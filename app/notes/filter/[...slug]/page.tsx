import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '../../../../lib/api';
import Notes from './Notes.client';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const rawFilter = slug?.[0] || 'all';
  const formatFilter = rawFilter.charAt(0).toUpperCase() + rawFilter.slice(1);

  const pageTitle = formatFilter === "All" ? 'Notes - All Tags' : `Notes - ${formatFilter}`;

  return {
    title: pageTitle,
    description: `Browse notes tagged with ${rawFilter}. NoteHub allows you to filter and view notes based on tags for better organization.`,
    openGraph: {
        title: pageTitle,
        description: `Browse notes tagged with ${rawFilter}. NoteHub allows you to filter and view notes based on tags for better organization.`,
        url: 'https://08-zustand-puce-theta.vercel.app',
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: `Browse notes tagged with ${rawFilter}. NoteHub allows you to filter and view notes based on tags for better organization.`,
          }
        ]
      }
  }
}


export const instant = false;
  
export default async function NotesPage({ params }: PageProps) {
  const resolveParams = await params;
  const slug = resolveParams?.slug || [];

  const tag = slug[0] || ''; 

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', { page: 1, search: '', tag }] as const,
    queryFn: () => fetchNotes('', 1, tag),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes tag={tag} key={tag} />
  </HydrationBoundary>
  );
}


