'use client';

import { useRouter } from "next/navigation";
import NoteForm from "@/components/NoteForm/NoteForm";

export default function NoteFormClientWrapper() {

const router = useRouter();

    return <NoteForm onClose={() => router.back()} />;
        
    }
