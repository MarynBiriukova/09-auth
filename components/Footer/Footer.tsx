"use client"
import css from './Footer.module.css'
import { useState, useEffect } from 'react';



const Footer = () => {

  const [year, setYear] = useState('2026');

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);
  return (
    <footer className={css.footer}>
  <div className={css.content}>
    <p> © {year} NoteHub. All rights reserved.</p>
    <div className={css.wrap}>
      <p>Developer: your name</p>
      <p>
        Contact us:
        <a href="mailto:student@notehub.app">student@notehub.app</a>
      </p>
    </div>
  </div>
</footer>


  );
}

export default Footer;