"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import TextOverlay from "./TextOverlay";

const FRAME_COUNT = 57;

function getFrameSrc(index: number): string {
  const num = String(index + 1).padStart(3, "0");
  return `/frames/ezgif-frame-${num}.jpg`;
}

export default function BerryScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const currentFrameRef = useRef(0);
  const rafIdRef = useRef<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Preload all images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        loaded++;
        if (loaded === FRAME_COUNT) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        loaded++;
        if (loaded === FRAME_COUNT) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };
      loadedImages[i] = img;
    }
  }, []);

  // Draw the current frame on canvas
  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas || !images.length) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = images[Math.round(index)];
      if (!img || !img.complete) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      if (
        canvas.width !== rect.width * dpr ||
        canvas.height !== rect.height * dpr
      ) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
      }

      const cw = rect.width;
      const ch = rect.height;

      // Clear canvas
      ctx.fillStyle = "#E8A430";
      ctx.fillRect(0, 0, cw, ch);

      // object-cover logic: fill entire canvas, crop overflow (no side bars)
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = cw / ch;

      let drawWidth: number, drawHeight: number, drawX: number, drawY: number;

      if (canvasAspect > imgAspect) {
        // Canvas is wider than image — scale to width, crop top/bottom
        drawWidth = cw;
        drawHeight = cw / imgAspect;
        drawX = 0;
        drawY = (ch - drawHeight) / 2;
      } else {
        // Canvas is taller than image — scale to height, crop left/right
        drawHeight = ch;
        drawWidth = ch * imgAspect;
        drawX = (cw - drawWidth) / 2;
        drawY = 0;
      }

      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    },
    [images]
  );

  // RAF loop for smooth rendering
  useEffect(() => {
    if (!isLoaded) return;

    let lastFrame = -1;

    const render = () => {
      const idx = currentFrameRef.current;
      if (idx !== lastFrame) {
        drawFrame(idx);
        lastFrame = idx;
      }
      rafIdRef.current = requestAnimationFrame(render);
    };

    rafIdRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafIdRef.current);
  }, [isLoaded, drawFrame]);

  // Listen to frame index changes
  useMotionValueEvent(frameIndex, "change", (latest) => {
    currentFrameRef.current = Math.min(
      Math.max(Math.round(latest), 0),
      FRAME_COUNT - 1
    );
  });

  // Handle canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new ResizeObserver(() => {
      if (isLoaded) {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.scale(dpr, dpr);
        drawFrame(currentFrameRef.current);
      }
    });

    observer.observe(canvas.parentElement || canvas);
    return () => observer.disconnect();
  }, [isLoaded, drawFrame]);

  // Draw first frame when loaded
  useEffect(() => {
    if (isLoaded) {
      drawFrame(0);
    }
  }, [isLoaded, drawFrame]);

  return (
    <div ref={containerRef} className="relative h-[600vh]" id="berry-scroll">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#E8A430] relative">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: isLoaded ? "block" : "none" }}
        />
        {/* Text overlays positioned within this sticky context */}
        <TextOverlay containerRef={containerRef} />
      </div>
    </div>
  );
}

export { FRAME_COUNT, getFrameSrc };
