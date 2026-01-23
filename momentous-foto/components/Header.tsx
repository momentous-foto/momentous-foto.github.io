'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact Us' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A]/95 backdrop-blur-sm border-b border-[#6B6B6B]/20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-100">
          <div className="w-auto h-12 flex items-center justify-center">
            <img
              src="/images/logo/momentous-foto.png"
              alt="Momentous Foto"
              className="h-full w-auto object-contain"
            />
          </div>
        </Link>

        <nav className={`
          ${mobileMenuOpen ? 'flex' : 'hidden'}
          md:flex
          fixed md:static
          top-20 md:top-0
          left-0 md:left-auto
          right-0 md:right-auto
          flex-col md:flex-row
          items-center
          gap-6 md:gap-8
          bg-[#1A1A1A] md:bg-transparent
          p-8 md:p-0
          border-b md:border-b-0
          border-[#6B6B6B]/20
        `}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#CACACA] hover:text-white transition-colors duration-200 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://instagram.com/momentous.foto"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-[#CACACA] hover:text-white transition-colors duration-200"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a
            href="https://www.threads.com/@momentous.foto"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Threads"
            className="text-[#CACACA] hover:text-white transition-colors duration-200"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19.5 7.5c-.4-2.5-2.4-4.5-5.3-4.5H9.8C6.6 3 4 5.6 4 8.8v6.4C4 18.4 6.6 21 9.8 21h4.4c3.2 0 5.8-2.6 5.8-5.8 0-2.3-1.3-4.2-3.2-5.1"/>
              <path d="M15 12c0 2.5-1.6 4-4 4-1.9 0-3.5-1.3-3.5-3"/>
              <path d="M15 12c0-2.2-1.4-3.8-3.6-3.8-1.7 0-3.2.9-3.2 2.4"/>
            </svg>
          </a>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-[#CACACA] transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-[#CACACA] transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-[#CACACA] transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>
    </header>
  );
}
