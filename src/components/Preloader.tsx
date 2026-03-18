"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const FRAME_COUNT = 57;

function getFrameSrc(index: number): string {
  const num = String(index + 1).padStart(3, "0");
  return `/frames/ezgif-frame-${num}.jpg`;
}

export default function Preloader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const hasCompleted = useRef(false);

  useEffect(() => {
    let loaded = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);

      const handleDone = () => {
        loaded++;
        const pct = Math.round((loaded / FRAME_COUNT) * 100);
        setProgress(pct);

        if (loaded === FRAME_COUNT && !hasCompleted.current) {
          hasCompleted.current = true;
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 600);
          }, 400);
        }
      };

      img.onload = handleDone;
      img.onerror = handleDone;
    }
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-berry-dark"
        >
          {/* Brand  */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16 text-center"
          >
            <h1 className="font-playfair text-5xl md:text-7xl tracking-[0.3em] text-white/90 font-light">
              PLUCKED
            </h1>
            <div className="mt-3 w-8 h-[2px] bg-berry-orange mx-auto" />
          </motion.div>

          {/* Progress bar */}
          <div className="w-64 md:w-80">
            <div className="relative h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #E8A430, #D4922A, #E8A430)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center text-white/40 text-xs tracking-[0.25em] font-inter uppercase"
            >
              {progress < 100 ? "Loading Experience" : "Ready"}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-2 text-center text-berry-orange/60 text-sm font-inter tabular-nums"
            >
              {progress}%
            </motion.p>
          </div>

          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            transition={{ delay: 1, duration: 2 }}
            className="absolute bottom-12 text-center"
          >
            <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-inter">
              Sea Buckthorn Dried Berries
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
