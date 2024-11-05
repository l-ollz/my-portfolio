'use client'; // これをファイルの最上部に追加

import './global.css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Navbar } from './components/nav';

const cx = (...classes) => classes.filter(Boolean).join(' ');

const NAVBAR_HEIGHT = 68;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={cx(
        'dark text-white bg-[#111010] dark:text-white dark:bg-[#111010]',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <head></head>
      <body>
        <main>
          <Navbar />
          <div style={{ marginTop: `${NAVBAR_HEIGHT}px` }}>{children}</div>
        </main>
      </body>
    </html>
  );
}
