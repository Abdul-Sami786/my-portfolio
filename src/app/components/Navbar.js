"use client";
import Link from 'next/link';
import { useState } from 'react';
import './Navbar.css'; // if using separate file

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <div className="brand">My Portfolio</div>

        <div className={`nav-toggle ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </div>

        <ul className={`nav-links ${menuOpen ? 'show' : ''}`}>
          <li><Link href="#hero">Home</Link></li>
          <li><Link href="#about">About</Link></li>
          <li><Link href="#skills">Skills</Link></li>
          <li><Link href="#projects">Projects</Link></li>
          <li><Link href="#contact">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}
