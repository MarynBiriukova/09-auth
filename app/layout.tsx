import type { Metadata } from "next";
//import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider'
import { Roboto } from 'next/font/google'
import AuthProvider from '@/components/AuthProvider/AuthProvider'

/*
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
*/

const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'NoteHub is a simple and efficient application designed for managing personal notes.',
  openGraph: {
    title: 'NoteHub',
    description: 'NoteHub is a simple and efficient application designed for managing personal notes.',
    url: 'https://08-zustand-puce-theta.vercel.app',
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

export default function RootLayout({ children, modal, }: {
  children: React.ReactNode;
  modal: React.ReactNode;
  }) {
  return (
    <html lang="en">
      {/*className={`${geistSans.variable} ${geistMono.variable}`}*/}
      
      <body className={roboto.variable}>
        <TanStackProvider>
         <AuthProvider> 
        <Header/>
        
        <main>
            {children}
            {modal}
        </main>

          <Footer />
            <div id="modal-root"></div>
            </AuthProvider>
        </TanStackProvider>
        </body>
        
    </html>
  );
}
