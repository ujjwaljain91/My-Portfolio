"use client";

import React, { useEffect, useRef } from "react";

interface GridNode {
  baseX: number;
  baseY: number;
  currentX: number;
  currentY: number;
  targetX: number;
  targetY: number;
}

interface InteractiveGridCanvasProps {
  gridSize?: number;
  distortionRadius?: number;
  maxDisplacement?: number;
  lerpFactor?: number;
  className?: string;
}

export default function InteractiveGridCanvas({
  gridSize = 80,
  distortionRadius = 240,
  maxDisplacement = 55,
  lerpFactor = 0.30,
  className = "absolute inset-0 z-0 pointer-events-none",
}: InteractiveGridCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // References stored outside React state to maintain 60-120fps with zero re-renders
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  const gridNodesRef = useRef<GridNode[][]>([]);
  const dimensionsRef = useRef<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Helper to build or resize grid matrix
    const initGrid = (width: number, height: number) => {
      dimensionsRef.current = { width, height };

      const cols = Math.ceil(width / gridSize) + 1;
      const rows = Math.ceil(height / gridSize) + 1;

      const nodes: GridNode[][] = [];

      for (let r = 0; r < rows; r++) {
        const rowNodes: GridNode[] = [];
        const baseY = r * gridSize;

        for (let c = 0; c < cols; c++) {
          const baseX = c * gridSize;
          rowNodes.push({
            baseX,
            baseY,
            currentX: baseX,
            currentY: baseY,
            targetX: baseX,
            targetY: baseY,
          });
        }
        nodes.push(rowNodes);
      }

      gridNodesRef.current = nodes;
    };

    // Resize handler for crisp Retina / High-DPI screens
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initGrid(width, height);
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Global mouse tracking relative to canvas bounding box
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();

      // Check if mouse is within reasonable bounds of canvas
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (
        e.clientX >= rect.left - distortionRadius &&
        e.clientX <= rect.right + distortionRadius &&
        e.clientY >= rect.top - distortionRadius &&
        e.clientY <= rect.bottom + distortionRadius
      ) {
        mouseRef.current = { x, y, active: true };
      } else {
        mouseRef.current.active = false;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    // Animation Render Loop (Physics + Lerp + Canvas Drawing)
    const render = () => {
      const { width, height } = dimensionsRef.current;
      const nodes = gridNodesRef.current;
      const mouse = mouseRef.current;

      // 1. Clear background
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);

      if (nodes.length === 0) {
        animationFrameId.current = requestAnimationFrame(render);
        return;
      }

      const rows = nodes.length;
      const cols = nodes[0].length;

      // 2. Physics update: Compute target displacement & lerp positions
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const node = nodes[r][c];

          if (mouse.active) {
            const dx = node.baseX - mouse.x;
            const dy = node.baseY - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < distortionRadius && dist > 0) {
              const normDist = dist / distortionRadius;
              // Smooth cosine radial bulge formula (1 at center, 0 at radius edge)
              const factor = 0.5 * (1 + Math.cos(Math.PI * normDist));
              const displacement = maxDisplacement * factor;

              const angle = Math.atan2(dy, dx);
              node.targetX = node.baseX + Math.cos(angle) * displacement;
              node.targetY = node.baseY + Math.sin(angle) * displacement;
            } else {
              node.targetX = node.baseX;
              node.targetY = node.baseY;
            }
          } else {
            node.targetX = node.baseX;
            node.targetY = node.baseY;
          }

          // Linear Interpolation (Lerp) for smooth physics return
          node.currentX += (node.targetX - node.currentX) * lerpFactor;
          node.currentY += (node.targetY - node.currentY) * lerpFactor;
        }
      }

      // 3. Draw Grid Lines
      ctx.strokeStyle = "rgba(229, 231, 235, 0.65)";
      ctx.lineWidth = 1;

      // Draw Horizontal Grid Lines
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        ctx.moveTo(nodes[r][0].currentX, nodes[r][0].currentY);
        for (let c = 1; c < cols; c++) {
          ctx.lineTo(nodes[r][c].currentX, nodes[r][c].currentY);
        }
        ctx.stroke();
      }

      // Draw Vertical Grid Lines
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        ctx.moveTo(nodes[0][c].currentX, nodes[0][c].currentY);
        for (let r = 1; r < rows; r++) {
          ctx.lineTo(nodes[r][c].currentX, nodes[r][c].currentY);
        }
        ctx.stroke();
      }

      // 4. Draw Interactive Intersection Dots
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const node = nodes[r][c];

          let dotRadius = 1.5;
          let dotColor = "rgba(209, 213, 219, 0.7)"; // Neutral subtle gray

          if (mouse.active) {
            const dx = node.currentX - mouse.x;
            const dy = node.currentY - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < distortionRadius) {
              const normDist = dist / distortionRadius;
              const factor = 1 - normDist; // 1 at mouse, 0 at edge
              dotRadius = 1.5 + 1.5 * factor; // scale up slightly (max 3px)

              // Interpolate color from gray-300 rgb(209, 213, 219) to slate-700 rgb(75, 85, 99)
              const rVal = Math.round(209 - (209 - 75) * factor);
              const gVal = Math.round(213 - (213 - 85) * factor);
              const bVal = Math.round(219 - (219 - 99) * factor);
              dotColor = `rgba(${rVal}, ${gVal}, ${bVal}, ${0.7 + 0.3 * factor})`;
            }
          }

          ctx.beginPath();
          ctx.arc(node.currentX, node.currentY, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = dotColor;
          ctx.fill();
        }
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);

    // Cleanup on unmount
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [gridSize, distortionRadius, maxDisplacement, lerpFactor]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
}
