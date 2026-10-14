'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/lib/motion/useReducedMotion';

export function DezoLabCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isReducedMotion = useReducedMotion();
  const [activeNodesCount, setActiveNodesCount] = useState(48);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 480);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 480;
    };

    window.addEventListener('resize', handleResize);

    // Node particle system representing digital networks & high-assurance systems
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      latency: number;
    }

    const nodeCount = isReducedMotion ? 20 : 48;
    setActiveNodesCount(nodeCount);

    const nodes: Node[] = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: isReducedMotion ? 0 : (Math.random() - 0.5) * 0.8,
      vy: isReducedMotion ? 0 : (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1.5,
      latency: Math.floor(Math.random() * 12 + 4),
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.25;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and update nodes
      for (const node of nodes) {
        if (!isReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#38BDF8';
        ctx.shadowColor = '#2563EB';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (!isReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isReducedMotion]);

  return (
    <div className="relative w-full rounded-dezo-xl overflow-hidden bg-dezo-surface border border-dezo-border">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-dezo-bg/80 border border-dezo-border backdrop-blur-md text-xs font-mono text-dezo-text-muted">
        <span className="w-2 h-2 rounded-full bg-dezo-success animate-pulse" />
        <span>System Status: Optimal · {activeNodesCount} Active Nodes</span>
      </div>
      <canvas ref={canvasRef} className="w-full block" />
    </div>
  );
}
