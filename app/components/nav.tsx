'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi'; // ハンバーガーと閉じるアイコン

const navItems = {
  '/': { name: 'home' },
  '/work': { name: 'work' },
  '/kairanban': { name: 'kairanban' },
  '/guestbook': { name: 'guestbook' },
};

const socialLinks = [
  { href: 'https://www.twitter.com/AdhamDannaway', icon: FaTwitter },
  { href: 'https://au.linkedin.com/in/adhamdannaway', icon: FaLinkedin },
  { href: 'https://www.facebook.com/ilikeadham', icon: FaFacebook },
  { href: 'https://www.instagram.com/adham.dannaway', icon: FaInstagram },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // ハンバーガーメニューの状態管理

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="w-full fixed top-0 bg-[#111010] text-white py-4 px-6 z-50">
      <div className="container mx-auto flex items-center justify-between max-w-6xl">
        {/* 左側：ハンバーガーメニューとロゴ */}
        <div className="flex items-center space-x-4">
          <button
            className="md:hidden text-3xl focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>

          <Link href="/" className="logo text-3xl font-bold">
            LOGO
          </Link>
        </div>

        {/* ナビゲーションメニュー（PC表示） */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8 text-xl">
            {Object.entries(navItems).map(([path, { name }]) => (
              <li key={path}>
                <Link
                  href={path}
                  className="hover:text-gray-300 transition-colors"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* SNSリンク（PC表示） */}
        <ul className="hidden md:flex space-x-4">
          {socialLinks.map(({ href, icon: Icon }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors"
              >
                <Icon size={28} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* ハンバーガーメニュー展開時のメニュー */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-[#111010] text-white px-6 py-4 space-y-4">
          <ul className="flex flex-col space-y-4 text-xl">
            {Object.entries(navItems).map(([path, { name }]) => (
              <li key={path}>
                <Link
                  href={path}
                  className="hover:text-gray-300 transition-colors"
                  onClick={toggleMenu} // メニュークリックで閉じる
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="flex space-x-4 mt-6 justify-center">
            {socialLinks.map(({ href, icon: Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400 transition-colors"
                >
                  <Icon size={28} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
