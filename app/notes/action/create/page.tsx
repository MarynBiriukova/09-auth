
import { Metadata } from "next";
//import NoteForm from "@/components/NoteForm/NoteForm";
import css from './CreateNote.module.css';
import NoteFormClientWrapper from "./NoteFormClientWrapper";

export const metadata: Metadata = {
  title: 'Create New Note',
  description: 'Create and save a new note.',
  openGraph: {
    title: 'Create New Note',
    description: 'Create and save a new note.',
    url: 'https://08-zustand-puce-theta.vercel.app/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub is a simple and efficient application designed for managing personal notes. ',
      }
    ]
  }
};

export default function CreateNote() {
    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
               { < NoteFormClientWrapper/>}
            </div>
        </main>
    );
}