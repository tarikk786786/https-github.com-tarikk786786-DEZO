/**
 * AWWWARDS-style 3D animated background for DEZO
 * Inspired by: https://github.com/syednoor058/AWWWARDS-Standard_Portfolio-Website
 * 
 * Uses R3F (React Three Fiber) + drei Float + GSAP for entrance animation.
 * Renders a premium organic 3D torus-knot with metallic material and 
 * floating particle field. Disabled/simplified on mobile for performance.
 */
import React, { useRef, useEffect, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, Lightformer } from '@react-three/drei';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import * as THREE from 'three';

/* ─────────── Constants ─────────── */
const MOBILE_BREAKPOINT = 853;
const PARTICLE_COUNT_DESKTOP = 120;
const PARTICLE_COUNT_MOBILE = 40;
const REDUCED_MOTION = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

/* ─────────── Organic Torus Knot ─────────── */
const OrganicShape: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  // GSAP entrance animation
  useGSAP(() => {
    if (REDUCED_MOTION || !groupRef.current) return;
    const tl = gsap.timeline();
    tl.from(groupRef.current.position, {
      y: 5,
      duration: 2.8,
      ease: 'circ.out',
    });
    tl.from(
      groupRef.current.rotation,
      {
        z: Math.PI * 0.3,
        duration: 3,
        ease: 'power3.out',
      },
      '<0.2'
    );
    tl.from(
      groupRef.current.scale,
      {
        x: 0,
        y: 0,
        z: 0,
        duration: 2.2,
        ease: 'elastic.out(1, 0.4)',
      },
      '<0.1'
    );
  }, []);

  // Slow continuous rotation
  useFrame((_, delta) => {
    if (REDUCED_MOTION || !meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.06;
    meshRef.current.rotation.y += delta * 0.08;
    meshRef.current.rotation.z += delta * 0.03;
  });

  const scale = isMobile ? 0.7 : 1;

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6} floatingRange={[-0.15, 0.15]}>
        <mesh ref={meshRef} scale={scale} castShadow>
          <torusKnotGeometry args={[1.2, 0.35, 200, 32, 2, 3]} />
          <meshStandardMaterial
            color="#3B82C4"
            metalness={0.9}
            roughness={0.15}
            emissive="#1D4ED8"
            emissiveIntensity={0.15}
            envMapIntensity={1.5}
          />
        </mesh>
      </Float>
    </group>
  );
};

/* ─────────── Floating Particles ─────────── */
const Particles: React.FC<{ count: number }> = ({ count }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
      ] as [number, number, number],
      speed: Math.random() * 0.3 + 0.1,
      phase: Math.random() * Math.PI * 2,
      scale: Math.random() * 0.03 + 0.01,
    }));
  }, [count]);

  useFrame(({ clock }) => {
    if (REDUCED_MOTION || !meshRef.current) return;
    const t = clock.getElapsedTime();
    particles.forEach((p, i) => {
      dummy.position.set(
        p.position[0] + Math.sin(t * p.speed + p.phase) * 0.5,
        p.position[1] + Math.cos(t * p.speed * 0.8 + p.phase) * 0.4,
        p.position[2] + Math.sin(t * p.speed * 0.6 + p.phase * 2) * 0.3
      );
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#60A5FA" transparent opacity={0.5} />
    </instancedMesh>
  );
};

/* ─────────── Orbital Ring ─────────── */
const OrbitalRing: React.FC = () => {
  const ringRef = useRef<THREE.Mesh>(null!);

  useGSAP(() => {
    if (REDUCED_MOTION || !ringRef.current) return;
    gsap.from(ringRef.current.rotation, {
      x: 0,
      y: 0,
      duration: 3,
      ease: 'power2.out',
      delay: 0.8,
    });
    gsap.from(ringRef.current.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 2.5,
      ease: 'elastic.out(1, 0.5)',
      delay: 0.4,
    });
  }, []);

  useFrame((_, delta) => {
    if (REDUCED_MOTION || !ringRef.current) return;
    ringRef.current.rotation.z += delta * 0.04;
    ringRef.current.rotation.x += delta * 0.02;
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI * 0.35, 0, Math.PI * 0.1]}>
      <torusGeometry args={[2.4, 0.015, 16, 100]} />
      <meshBasicMaterial color="#60A5FA" transparent opacity={0.25} />
    </mesh>
  );
};

/* ─────────── Scene Setup ─────────── */
const Scene: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const particleCount = isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#E8EDF5" />
      <pointLight position={[-3, -3, 2]} intensity={0.5} color="#3B82C4" />
      <pointLight position={[3, 2, -3]} intensity={0.3} color="#F59E6B" />

      <OrganicShape isMobile={isMobile} />
      <Particles count={particleCount} />
      {!isMobile && <OrbitalRing />}

      <Environment resolution={256}>
        <Lightformer
          form="ring"
          intensity={1.5}
          rotation-x={Math.PI / 2}
          position={[0, 4, 0]}
          scale={[6, 6, 1]}
          color="#E8EDF5"
        />
        <Lightformer
          form="rect"
          intensity={0.8}
          position={[-3, 2, -4]}
          scale={[4, 2, 1]}
          color="#3B82C4"
        />
        <Lightformer
          form="rect"
          intensity={0.4}
          position={[4, -2, 3]}
          scale={[3, 2, 1]}
          color="#F59E6B"
        />
      </Environment>
    </>
  );
};

/* ─────────── Cursor-following glow (desktop only) ─────────── */
const CursorGlow: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    let raf: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.08;
      pos.current.y += (target.current.y - pos.current.y) * 0.08;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.current.x - 150}px, ${pos.current.y - 150}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,196,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
        willChange: 'transform',
      }}
    />
  );
};

/* ─────────── Main Export ─────────── */
export const AwwwardsBackground: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  // Skip heavy 3D on reduced motion
  if (REDUCED_MOTION) {
    return (
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div
          style={{
            position: 'absolute',
            top: '20%',
            right: '10%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,196,0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>
    );
  }

  return (
    <>
      {/* 3D Canvas */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          opacity: isMobile ? 0.4 : 0.7,
        }}
      >
        <Canvas
          camera={{
            position: isMobile ? [0, 0, 6] : [0, 0, 5.5],
            fov: isMobile ? 55 : 50,
            near: 0.1,
            far: 100,
          }}
          gl={{
            antialias: !isMobile,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <Scene isMobile={isMobile} />
          </Suspense>
        </Canvas>
      </div>

      {/* Cursor glow — desktop only */}
      {!isMobile && <CursorGlow />}
    </>
  );
};

export default AwwwardsBackground;
