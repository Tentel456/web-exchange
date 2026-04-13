"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("RU");

  return (
    <header className="py-4 px-4 mt-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-4xl font-medium text-[#00cbff] font-unbounded">
            NOVEX
          </Link>

          {/* Burger Menu */}
          <button
            className="md:hidden flex flex-col gap-1.5 z-[1100]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={`w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-10">
            <ul className="flex gap-10 items-center">
              <li className="relative group">
                <Link href="/p2p" className="flex items-center gap-2 text-lg hover:text-primary transition">
                  Торговля
                  <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                <div className="absolute top-full left-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link
                    href="/p2p"
                    className="block px-4 py-2 bg-gradient-to-r from-[#00ccff] to-black rounded-md text-white hover:opacity-90"
                  >
                    P2P
                  </Link>
                </div>
              </li>
              <li>
                <Link href="#" className="text-lg hover:text-primary transition">
                  Поддержка
                </Link>
              </li>
            </ul>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 text-lg"
              >
                {currentLang}
                <svg className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {isLangOpen && (
                <ul className="absolute top-full left-0 mt-2 w-16 bg-[rgba(10,25,40,0.98)] rounded-md shadow-lg">
                  <li
                    className="px-3 py-2 hover:bg-white/10 cursor-pointer"
                    onClick={() => { setCurrentLang("RU"); setIsLangOpen(false); }}
                  >
                    RU
                  </li>
                  <li
                    className="px-3 py-2 hover:bg-white/10 cursor-pointer"
                    onClick={() => { setCurrentLang("EN"); setIsLangOpen(false); }}
                  >
                    EN
                  </li>
                </ul>
              )}
            </div>

            {/* Login Button */}
            <Link
              href="/auth"
              className="px-4 py-2 border border-transparent bg-gradient-to-r from-[#3fc2e3] to-[#245aa6] bg-clip-padding rounded-md relative overflow-hidden"
              style={{
                background: 'transparent',
                border: '1.3px solid transparent',
                backgroundImage: 'linear-gradient(black, black), linear-gradient(147.72deg, #3fc2e3 51.54%, #245aa6 80.65%)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
              }}
            >
              Войти
            </Link>
          </nav>

          {/* Mobile Menu */}
          <nav
            className={`fixed top-0 right-0 h-screen w-64 bg-[#0a181c] z-[1000] transition-transform duration-300 ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            } md:hidden flex flex-col items-end p-8 pt-24`}
          >
            <ul className="flex flex-col gap-8 items-center w-full">
              <li>
                <Link href="/p2p" className="text-2xl" onClick={() => setIsMenuOpen(false)}>
                  Торговля
                </Link>
              </li>
              <li>
                <Link href="#" className="text-2xl" onClick={() => setIsMenuOpen(false)}>
                  Поддержка
                </Link>
              </li>
            </ul>

            <div className="mt-8 flex flex-col gap-4 items-center w-full">
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-1 text-xl"
                >
                  {currentLang}
                  <svg className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <Link
                href="/auth"
                className="w-full text-center px-4 py-2 border border-primary rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Войти
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
