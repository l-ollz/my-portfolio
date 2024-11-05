'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';

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

export default function Page() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Three.js のセットアップ
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    camera.position.z = 50;

    // グリッドとドットマテリアルの設定
    const gridMaterial = new THREE.LineBasicMaterial({ color: 0x00ffcc });
    const gridGeometry = new THREE.BufferGeometry();
    const gridPoints: number[] = []; // number[] 型で宣言

    // グリッド作成
    for (let i = -50; i <= 50; i += 5) {
      gridPoints.push(-50, 0, i, 50, 0, i);
      gridPoints.push(i, 0, -50, i, 0, 50);
    }
    gridGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(gridPoints, 3)
    );

    const grid = new THREE.LineSegments(gridGeometry, gridMaterial);
    scene.add(grid);

    // ドット（ノイズ）作成 - useEffect 内でランダムデータを生成
    const dotGeometry = new THREE.BufferGeometry();
    const dotCount = 1000;
    const positions = new Float32Array(dotCount * 3);

    for (let i = 0; i < dotCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }

    dotGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    const dotMaterial = new THREE.PointsMaterial({
      color: 0xff00ff,
      size: 0.5,
    });
    const dots = new THREE.Points(dotGeometry, dotMaterial);
    scene.add(dots);

    // アニメーションループ
    const animate = () => {
      requestAnimationFrame(animate);

      // カメラのゆっくりとした移動
      camera.position.z -= 0.1;
      camera.position.x = Math.sin(Date.now() * 0.001) * 30;
      camera.lookAt(0, 0, 0);

      // グリッドの回転
      grid.rotation.z += 0.001;

      // レンダリング
      renderer.render(scene, camera);
    };

    animate();

    // ウィンドウリサイズ対応
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // クリーンアップ
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <div
        ref={canvasRef}
        style={{
          position: 'absolute',
          zIndex: -1,
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
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
              A 26-year-old engineer from Hokkaido, Japan. After graduating from
              Hirosaki University, he currently works as a front-end engineer.
              He taught himself about the web when he was in college and started
              his career as a part-timer at a web production company. I have
              participated in a wide variety of projects, and have experienced a
              wide range of work including front-end development, back-end, and
              operation and maintenance.
            </p>
          </div>
        </FlexContainer>
      </Container>
    </>
  );
}
