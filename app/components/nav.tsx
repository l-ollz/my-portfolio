'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaTwitter, FaGithub, FaInstagram } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi'; // ハンバーガーと閉じるアイコン
import { Link as ScrollLink } from 'react-scroll'; // 追加

const navItems = {
  '/': { name: 'home' },
  // '/work': { name: 'work' },
  '/blog': { name: 'blog' },
  '/#about': { name: 'about' },
  // '/guestbook': { name: 'guestbook' },
};

const socialLinks = [
  { href: 'https://www.twitter.com/jank_lollz404', icon: FaTwitter },
  { href: 'https://github.com/l-ollz', icon: FaGithub },
  { href: 'https://www.instagram.com/ryogo404', icon: FaInstagram },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // ハンバーガーメニューの状態管理

  const toggleMenu = () => setIsOpen(!isOpen);

  // ナビゲーションバーの高さに応じたオフセットを設定
  const navbarHeight = 68;

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
            R.H
          </Link>
        </div>

        {/* ナビゲーションメニュー（PC表示） */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8 text-xl">
            {Object.entries(navItems).map(([path, { name }]) => (
              <li key={path}>
                {path.startsWith('#') ? (
                  <ScrollLink
                    to={path.substring(1)}
                    smooth={true}
                    duration={500}
                    offset={-navbarHeight} // オフセットを設定
                    className="hover:text-gray-300 transition-colors cursor-pointer"
                  >
                    {name}
                  </ScrollLink>
                ) : (
                  <Link
                    href={path}
                    className="hover:text-gray-300 transition-colors"
                  >
                    {name}
                  </Link>
                )}
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
      <div
        className={`${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } md:hidden overflow-hidden transition-all duration-500 ease-in-out bg-[#111010] px-6`}
      >
        <ul className="flex flex-col space-y-4 text-2xl">
          {Object.entries(navItems).map(([path, { name }]) => (
            <li key={path}>
              {path.startsWith('#') ? (
                <ScrollLink
                  to={path.substring(1)}
                  smooth={true}
                  duration={500}
                  offset={-navbarHeight} // オフセットを設定
                  className="hover:text-gray-300 transition-colors cursor-pointer"
                  onClick={toggleMenu}
                >
                  {name}
                </ScrollLink>
              ) : (
                <Link
                  href={path}
                  className="hover:text-gray-300 transition-colors"
                  onClick={toggleMenu}
                >
                  {name}
                </Link>
              )}
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
    </header>
  );
}
