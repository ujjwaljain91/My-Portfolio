"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pencil,
  Eraser,
  Minus,
  Square,
  Circle,
  Download,
  Undo2,
  Redo2,
  Trash2,
  Grid,
  Check,
  Pipette,
} from "lucide-react";

export type DrawingTool = "pen" | "eraser" | "line" | "rectangle" | "circle";

const COLOR_PALETTE = [
  { name: "Dark Slate", value: "#111827" },
  { name: "Royal Blue", value: "#2563EB" },
  { name: "Vibrant Red", value: "#EF4444" },
  { name: "Emerald Green", value: "#10B981" },
  { name: "Amber Yellow", value: "#F59E0B" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "White", value: "#FFFFFF" },
];

// Color Math Helper Functions
function hexToRgb(hex: string) {
  let c = hex.replace("#", "");
  if (c.length === 3) {
    c = c.split("").map((char) => char + char).join("");
  }
  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToHsv(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}

function hsvToRgb(h: number, s: number, v: number) {
  s /= 100;
  v /= 100;
  const i = Math.floor((h / 60) % 6);
  const f = h / 60 - Math.floor(h / 60);
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  let r = 0,
    g = 0,
    b = 0;

  switch (i) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = Math.max(0, Math.min(255, x)).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

// Full Interactive Color Picker Component (Matching Reference Image)
interface FullColorPickerProps {
  color: string;
  onChange: (newHex: string) => void;
}

function FullColorPicker({ color, onChange }: FullColorPickerProps) {
  const [hsv, setHsv] = useState(() => {
    const rgb = hexToRgb(color || "#111827");
    return rgbToHsv(rgb.r, rgb.g, rgb.b);
  });

  const pickerRef = useRef<HTMLDivElement | null>(null);
  const isDragging2D = useRef<boolean>(false);

  const rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
  const currentHex = rgbToHex(rgb.r, rgb.g, rgb.b);

  const updateFrom2D = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    const box = pickerRef.current;
    if (!box) return;
    const rect = box.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ("touches" in e) {
      if (e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, clientY - rect.top));

    const s = Math.round((x / rect.width) * 100);
    const v = Math.round((1 - y / rect.height) * 100);

    const newHsv = { ...hsv, s, v };
    setHsv(newHsv);
    const newRgb = hsvToRgb(newHsv.h, newHsv.s, newHsv.v);
    onChange(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  const handle2DMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging2D.current = true;
    updateFrom2D(e);
  };

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (isDragging2D.current) {
        updateFrom2D(e);
      }
    };
    const handlePointerUp = () => {
      isDragging2D.current = false;
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("touchmove", handlePointerMove);
    window.addEventListener("touchend", handlePointerUp);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);
    };
  }, [hsv]);

  const handleHueChange = (newHue: number) => {
    const newHsv = { ...hsv, h: newHue };
    setHsv(newHsv);
    const newRgb = hsvToRgb(newHsv.h, newHsv.s, newHsv.v);
    onChange(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  const handleRgbChange = (channel: "r" | "g" | "b", val: number) => {
    const currentRgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
    const newRgb = { ...currentRgb, [channel]: Math.max(0, Math.min(255, isNaN(val) ? 0 : val)) };
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setHsv(rgbToHsv(newRgb.r, newRgb.g, newRgb.b));
    onChange(newHex);
  };

  const handleEyedropper = async () => {
    if (typeof window !== "undefined" && "EyeDropper" in window) {
      try {
        // @ts-ignore
        const eyeDropper = new window.EyeDropper();
        const result = await eyeDropper.open();
        if (result?.sRGBHex) {
          const hex = result.sRGBHex;
          const r = hexToRgb(hex);
          setHsv(rgbToHsv(r.r, r.g, r.b));
          onChange(hex);
        }
      } catch (e) {
        // user cancelled eyedropper
      }
    }
  };

  return (
    <div className="w-[260px] bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden select-none p-3">
      {/* 1. 2D Saturation / Value Gradient Box */}
      <div
        ref={pickerRef}
        onMouseDown={handle2DMouseDown}
        onTouchStart={handle2DMouseDown}
        className="relative w-full h-[150px] rounded-xl cursor-crosshair overflow-hidden mb-3"
        style={{
          backgroundColor: `hsl(${hsv.h}, 100%, 50%)`,
        }}
      >
        {/* White horizontal gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to right, #FFFFFF, transparent)" }}
        />
        {/* Black vertical gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, #000000, transparent)" }}
        />

        {/* Target Handle Circle */}
        <div
          className="absolute w-4 h-4 -ml-2 -mt-2 rounded-full border-2 border-white shadow-[0_0_3px_rgba(0,0,0,0.8)] pointer-events-none"
          style={{
            left: `${hsv.s}%`,
            top: `${100 - hsv.v}%`,
            backgroundColor: currentHex,
          }}
        />
      </div>

      {/* 2. Eyedropper + Color Preview + Hue Rainbow Slider Row */}
      <div className="flex items-center gap-2 mb-3">
        {/* Eyedropper Button */}
        <button
          onClick={handleEyedropper}
          type="button"
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors shrink-0"
          title="Eyedropper tool"
        >
          <Pipette className="w-4 h-4" />
        </button>

        {/* Selected Color Circle Preview */}
        <div
          className="w-7 h-7 rounded-full border border-gray-300 shadow-2xs shrink-0"
          style={{ backgroundColor: currentHex }}
        />

        {/* Rainbow Hue Slider */}
        <div className="flex-1 relative flex items-center">
          <input
            type="range"
            min="0"
            max="360"
            value={hsv.h}
            onChange={(e) => handleHueChange(Number(e.target.value))}
            className="w-full h-3 rounded-full appearance-none cursor-pointer"
            style={{
              background:
                "linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)",
            }}
          />
        </div>
      </div>

      {/* 3. RGB Numerical Input Boxes Row */}
      <div className="grid grid-cols-3 gap-2 text-center mb-3">
        <div>
          <input
            type="number"
            min="0"
            max="255"
            value={rgb.r}
            onChange={(e) => handleRgbChange("r", Number(e.target.value))}
            className="w-full px-1 py-1 text-center text-xs font-mono font-medium border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mt-1">
            R
          </span>
        </div>
        <div>
          <input
            type="number"
            min="0"
            max="255"
            value={rgb.g}
            onChange={(e) => handleRgbChange("g", Number(e.target.value))}
            className="w-full px-1 py-1 text-center text-xs font-mono font-medium border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mt-1">
            G
          </span>
        </div>
        <div>
          <input
            type="number"
            min="0"
            max="255"
            value={rgb.b}
            onChange={(e) => handleRgbChange("b", Number(e.target.value))}
            className="w-full px-1 py-1 text-center text-xs font-mono font-medium border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mt-1">
            B
          </span>
        </div>
      </div>

      {/* 4. Preset Color Swatches Bar */}
      <div className="flex items-center justify-between gap-1 pt-2 border-t border-gray-100">
        {COLOR_PALETTE.map((c) => (
          <button
            key={c.value}
            type="button"
            onClick={() => {
              const r = hexToRgb(c.value);
              setHsv(rgbToHsv(r.r, r.g, r.b));
              onChange(c.value);
            }}
            className={`w-5 h-5 rounded-full border border-gray-300 transition-transform ${
              currentHex.toLowerCase() === c.value.toLowerCase()
                ? "scale-110 ring-2 ring-gray-900 ring-offset-1"
                : "hover:scale-110"
            }`}
            style={{ backgroundColor: c.value }}
            title={c.name}
          />
        ))}
      </div>
    </div>
  );
}

export default function InteractiveCanvasBoard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Tool & Drawing States
  const [activeTool, setActiveTool] = useState<DrawingTool>("pen");
  const [strokeColor, setStrokeColor] = useState<string>("#111827");
  const [strokeWidth, setStrokeWidth] = useState<number>(3);
  const [showGrid, setShowGrid] = useState<boolean>(true);

  // Popover States
  const [showToolMenu, setShowToolMenu] = useState<boolean>(false);
  const [showColorMenu, setShowColorMenu] = useState<boolean>(false);
  const [showSizeMenu, setShowSizeMenu] = useState<boolean>(false);

  // Drawing physics refs
  const isDrawingRef = useRef<boolean>(false);
  const startPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const snapshotRef = useRef<ImageData | null>(null);

  // Undo / Redo History Stack
  const historyRef = useRef<ImageData[]>([]);
  const historyIndexRef = useRef<number>(-1);
  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [canRedo, setCanRedo] = useState<boolean>(false);

  const updateHistoryButtons = useCallback(() => {
    setCanUndo(historyIndexRef.current > 0);
    setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
  }, []);

  const saveState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const newHistory = historyRef.current.slice(0, historyIndexRef.current + 1);
    newHistory.push(imageData);
    
    if (newHistory.length > 30) {
      newHistory.shift();
    }

    historyRef.current = newHistory;
    historyIndexRef.current = newHistory.length - 1;
    updateHistoryButtons();
  }, [updateHistoryButtons]);

  // Initial Canvas Setup & High DPI Resize Handling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      let existingData: ImageData | null = null;
      if (canvas.width > 0 && canvas.height > 0) {
        existingData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      }

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.scale(dpr, dpr);

      if (existingData) {
        ctx.putImageData(existingData, 0, 0);
      } else {
        saveState();
      }
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [saveState]);

  // Helper to extract canvas relative coordinates
  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    let clientX = 0;
    let clientY = 0;

    if ("touches" in e) {
      if (e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  // Start Drawing
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setShowToolMenu(false);
    setShowColorMenu(false);
    setShowSizeMenu(false);

    const { x, y } = getCanvasCoords(e);
    isDrawingRef.current = true;
    startPosRef.current = { x, y };

    const dpr = window.devicePixelRatio || 1;
    snapshotRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(x, y);

    if (activeTool === "pen" || activeTool === "eraser") {
      ctx.lineWidth = strokeWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (activeTool === "eraser") {
        ctx.globalCompositeOperation = "destination-out";
      } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = strokeColor;
      }
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  // Continuous Drawing / Dragging
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);
    const startX = startPosRef.current.x;
    const startY = startPosRef.current.y;

    if (activeTool === "pen" || activeTool === "eraser") {
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      if (snapshotRef.current) {
        ctx.putImageData(snapshotRef.current, 0, 0);
      }

      const dpr = window.devicePixelRatio || 1;
      ctx.save();
      ctx.scale(1 / dpr, 1 / dpr);

      const scaledStartX = startX * dpr;
      const scaledStartY = startY * dpr;
      const scaledX = x * dpr;
      const scaledY = y * dpr;

      ctx.lineWidth = strokeWidth * dpr;
      ctx.strokeStyle = strokeColor;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.globalCompositeOperation = "source-over";

      ctx.beginPath();
      if (activeTool === "line") {
        ctx.moveTo(scaledStartX, scaledStartY);
        ctx.lineTo(scaledX, scaledY);
      } else if (activeTool === "rectangle") {
        const w = scaledX - scaledStartX;
        const h = scaledY - scaledStartY;
        ctx.rect(scaledStartX, scaledStartY, w, h);
      } else if (activeTool === "circle") {
        const rx = (scaledX - scaledStartX) / 2;
        const ry = (scaledY - scaledStartY) / 2;
        const cx = scaledStartX + rx;
        const cy = scaledStartY + ry;
        const radius = Math.sqrt(rx * rx + ry * ry);
        ctx.arc(cx, cy, Math.abs(radius), 0, Math.PI * 2);
      }
      ctx.stroke();
      ctx.restore();
    }
  };

  // Finish Drawing & Save State
  const stopDrawing = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    snapshotRef.current = null;
    saveState();
  };

  // Undo Action
  const handleUndo = () => {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current -= 1;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const previousState = historyRef.current[historyIndexRef.current];
      ctx.putImageData(previousState, 0, 0);
      updateHistoryButtons();
    }
  };

  // Redo Action
  const handleRedo = () => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyIndexRef.current += 1;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const nextState = historyRef.current[historyIndexRef.current];
      ctx.putImageData(nextState, 0, 0);
      updateHistoryButtons();
    }
  };

  // Clear Canvas Action
  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    saveState();
  };

  // Export Canvas Drawing to PNG
  const handleExport = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const exportCtx = exportCanvas.getContext("2d");
    if (!exportCtx) return;

    const dpr = window.devicePixelRatio || 1;

    exportCtx.fillStyle = "#FEFBF0";
    exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    if (showGrid) {
      exportCtx.strokeStyle = "#E8E3CE";
      exportCtx.lineWidth = 1 * dpr;
      const step = 24 * dpr;

      for (let x = 0; x < exportCanvas.width; x += step) {
        exportCtx.beginPath();
        exportCtx.moveTo(x, 0);
        exportCtx.lineTo(x, exportCanvas.height);
        exportCtx.stroke();
      }
      for (let y = 0; y < exportCanvas.height; y += step) {
        exportCtx.beginPath();
        exportCtx.moveTo(0, y);
        exportCtx.lineTo(exportCanvas.width, y);
        exportCtx.stroke();
      }
    }

    exportCtx.drawImage(canvas, 0, 0);

    const link = document.createElement("a");
    link.download = `ujjwal-jain-canvas-drawing-${Date.now()}.png`;
    link.href = exportCanvas.toDataURL("image/png");
    link.click();
  };

  const getToolIcon = (tool: DrawingTool) => {
    switch (tool) {
      case "pen":
        return <Pencil className="w-4 h-4 text-gray-800" />;
      case "eraser":
        return <Eraser className="w-4 h-4 text-gray-800" />;
      case "line":
        return <Minus className="w-4 h-4 text-gray-800" />;
      case "rectangle":
        return <Square className="w-4 h-4 text-gray-800" />;
      case "circle":
        return <Circle className="w-4 h-4 text-gray-800" />;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50/50 section-divider relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        
        {/* Board Outer Container */}
        <div
          className={`relative rounded-3xl overflow-hidden border border-amber-200/80 shadow-md transition-all duration-300 h-[340px] sm:h-[380px] md:h-[400px] select-none ${
            showGrid ? "bg-graph-pattern" : "bg-[#FEFBF0]"
          }`}
          style={{
            backgroundColor: "#FEFBF0",
            backgroundImage: showGrid
              ? "linear-gradient(to right, #E8E3CE 1px, transparent 1px), linear-gradient(to bottom, #E8E3CE 1px, transparent 1px)"
              : "none",
            backgroundSize: "24px 24px",
          }}
        >
          {/* Top Center Prompt Title */}
          <div className="absolute top-6 left-0 right-0 z-10 flex flex-col items-center pointer-events-none px-4 text-center">
            <span
              className="text-base sm:text-lg font-medium text-amber-900/80 tracking-wide font-sans italic"
              style={{ fontFamily: "'Caveat', cursive, var(--font-sans), sans-serif" }}
            >
              Draw something that inspired you today! :)
            </span>
          </div>

          {/* Interactive HTML5 Canvas Layer */}
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="absolute inset-0 z-0 cursor-crosshair touch-none"
          />

          {/* Floating Bottom Center Control Toolbar */}
          <div className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-center px-4">
            <div className="relative">
              
              {/* Tool Selector Popover Menu */}
              <AnimatePresence>
                {showToolMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-full left-0 mb-3 w-48 bg-white/95 backdrop-blur-xl border border-gray-200/90 rounded-2xl p-1.5 shadow-xl z-30"
                  >
                    {[
                      { id: "pen", label: "Pen", icon: Pencil },
                      { id: "eraser", label: "Eraser", icon: Eraser },
                      { id: "line", label: "Line", icon: Minus },
                      { id: "rectangle", label: "Rectangle", icon: Square },
                      { id: "circle", label: "Circle", icon: Circle },
                    ].map((toolItem) => {
                      const IconComponent = toolItem.icon;
                      const isSelected = activeTool === toolItem.id;
                      return (
                        <button
                          key={toolItem.id}
                          onClick={() => {
                            setActiveTool(toolItem.id as DrawingTool);
                            setShowToolMenu(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                            isSelected
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          }`}
                        >
                          <IconComponent className="w-4 h-4 text-gray-700" />
                          <span>{toolItem.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-gray-900 ml-auto" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Full Interactive Color Picker Popover Menu (Matching Reference Image) */}
              <AnimatePresence>
                {showColorMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-full left-0 sm:left-12 mb-3 z-30"
                  >
                    <FullColorPicker
                      color={strokeColor}
                      onChange={(newHex) => {
                        setStrokeColor(newHex);
                        if (activeTool === "eraser") setActiveTool("pen");
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Size Slider Popover Menu */}
              <AnimatePresence>
                {showSizeMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-full left-24 mb-3 w-56 bg-white/95 backdrop-blur-xl border border-gray-200/90 rounded-2xl p-4 shadow-xl z-30"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-gray-700 mb-2">
                      <span>Size</span>
                      <span className="font-mono text-gray-500">{strokeWidth}px</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="40"
                      value={strokeWidth}
                      onChange={(e) => setStrokeWidth(Number(e.target.value))}
                      className="w-full accent-gray-900 cursor-pointer h-1.5 bg-gray-200 rounded-lg appearance-none"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main Control Pill Bar */}
              <div className="bg-white/95 backdrop-blur-2xl border border-gray-200/90 rounded-2xl px-3 py-2 shadow-xl flex items-center gap-1.5 sm:gap-2">
                
                {/* 1. Active Tool Selector */}
                <button
                  onClick={() => {
                    setShowToolMenu(!showToolMenu);
                    setShowColorMenu(false);
                    setShowSizeMenu(false);
                  }}
                  className={`p-2 rounded-xl transition-all flex items-center justify-center ${
                    showToolMenu ? "bg-gray-100 text-gray-900" : "hover:bg-gray-100 text-gray-700"
                  }`}
                  title="Tools (Pen, Eraser, Shapes)"
                >
                  {getToolIcon(activeTool)}
                </button>

                <div className="w-px h-4 bg-gray-200" />

                {/* 2. Stroke Color Picker */}
                <button
                  onClick={() => {
                    setShowColorMenu(!showColorMenu);
                    setShowToolMenu(false);
                    setShowSizeMenu(false);
                  }}
                  className="p-1.5 rounded-xl hover:bg-gray-100 transition-all flex items-center justify-center"
                  title="Color Picker"
                >
                  <span
                    className="w-5 h-5 rounded-full border border-gray-300 shadow-2xs block"
                    style={{ backgroundColor: activeTool === "eraser" ? "#FFFFFF" : strokeColor }}
                  />
                </button>

                {/* 3. Stroke Size Picker */}
                <button
                  onClick={() => {
                    setShowSizeMenu(!showSizeMenu);
                    setShowToolMenu(false);
                    setShowColorMenu(false);
                  }}
                  className="p-2 rounded-xl hover:bg-gray-100 text-gray-700 transition-all flex items-center justify-center font-mono text-xs font-bold"
                  title="Stroke Size"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-900 block" style={{ width: Math.min(12, Math.max(4, strokeWidth)), height: Math.min(12, Math.max(4, strokeWidth)) }} />
                </button>

                <div className="w-px h-4 bg-gray-200" />

                {/* 4. Grid Toggle Button */}
                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className={`p-2 rounded-xl transition-all ${
                    showGrid ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                  title="Toggle Graph Grid Background"
                >
                  <Grid className="w-4 h-4" />
                </button>

                {/* 5. Download PNG Button */}
                <button
                  onClick={handleExport}
                  className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-all"
                  title="Export Drawing as PNG"
                >
                  <Download className="w-4 h-4" />
                </button>

                <div className="w-px h-4 bg-gray-200" />

                {/* 6. Undo Button */}
                <button
                  onClick={handleUndo}
                  disabled={!canUndo}
                  className={`p-2 rounded-xl transition-all ${
                    canUndo ? "text-gray-700 hover:bg-gray-100 cursor-pointer" : "text-gray-300 cursor-not-allowed"
                  }`}
                  title="Undo"
                >
                  <Undo2 className="w-4 h-4" />
                </button>

                {/* 7. Redo Button */}
                <button
                  onClick={handleRedo}
                  disabled={!canRedo}
                  className={`p-2 rounded-xl transition-all ${
                    canRedo ? "text-gray-700 hover:bg-gray-100 cursor-pointer" : "text-gray-300 cursor-not-allowed"
                  }`}
                  title="Redo"
                >
                  <Redo2 className="w-4 h-4" />
                </button>

                {/* 8. Clear / Trash Button */}
                <button
                  onClick={handleClear}
                  className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-all"
                  title="Clear Canvas"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
