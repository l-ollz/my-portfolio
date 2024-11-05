'use client'; // これをファイルの最上部に追加

import './global.css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Navbar } from './components/nav';
import styled from 'styled-components';

const cx = (...classes) => classes.filter(Boolean).join(' ');

const NAVBAR_HEIGHT = 68;
const Container = styled.div`
  max-width: 1032px;
  margin-inline: auto;
`;
const FlexContainer = styled.div`
  display: flex;
  margin-inline: auto;
  width: 600px;
  gap: 24px;
`;

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
          <Container>
            <h2
              id="about"
              className="text-center font-medium text-2xl mt-4 mb-2 tracking-tighter"
            >
              about me
            </h2>
            <FlexContainer>
              <div className="w-full">
                <img src="/icon.png" alt="icon" width={253} height={253} />
              </div>
              <div>
                <p>
                  北海道出身の26歳エンジニア。弘前大学を卒業後、現在はフロントエンドエンジニアとして活動。大学時代に独学でWEBについて学びWEB制作会社でのアルバイトからキャリアをスタートし現在に至ります。多岐にわたるプロジェクトに参加し、フロントエンド開発を中心に、バックエンドや運用保守など幅広く業務を経験してきました。
                </p>
                <p>
                  A 26-year-old engineer from Hokkaido, Japan. After graduating
                  from Hirosaki University, he currently works as a front-end
                  engineer. He taught himself about the web when he was in
                  college and started his career as a part-timer at a web
                  production company. I have participated in a wide variety of
                  projects, and have experienced a wide range of work including
                  front-end development, back-end, and operation and
                  maintenance.
                </p>
              </div>
            </FlexContainer>
          </Container>
        </main>
      </body>
    </html>
  );
}
