"use client";

import { motion, useScroll, useTransform } from "framer-motion";

interface TextSection {
  title: string;
  subtitle: string;
  body: string;
  position: "left" | "right" | "center";
  startProgress: number;
  endProgress: number;
}

const sections: TextSection[] = [
  {
    title: "From Nature",
    subtitle: "Perfected by Time",
    body: "Handpicked at peak ripeness from the Himalayan highlands, each sea buckthorn berry holds centuries of natural wisdom.",
    position: "left",
    startProgress: 0.02,
    endProgress: 0.2,
  },
  {
    title: "Sun-Kissed",
    subtitle: "At 3,500m Altitude",
    body: "Gently dried under the Himalayan sun, preserving every nutrient, every antioxidant, every ounce of goodness nature intended.",
    position: "right",
    startProgress: 0.25,
    endProgress: 0.45,
  },
  {
    title: "Every Wrinkle",
    subtitle: "Holds Nutrition",
    body: "As the berry transforms, its nutrients concentrate — creating one of nature's most powerful superfoods, bite by bite.",
    position: "left",
    startProgress: 0.5,
    endProgress: 0.7,
  },
  {
    title: "Sealed",
    subtitle: "At Peak Potency",
    body: "Carefully packaged to lock in freshness. What started as a single berry is now a powerhouse of wellness, ready for you.",
    position: "center",
    startProgress: 0.75,
    endProgress: 0.92,
  },
];

function TextBlock({
  section,
  containerRef,
}: {
  section: TextSection;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const fadeStart = section.startProgress;
  const peakStart = section.startProgress + 0.04;
  const peakEnd = section.endProgress - 0.04;
  const fadeEnd = section.endProgress;

  const opacity = useTransform(
    scrollYProgress,
    [fadeStart, peakStart, peakEnd, fadeEnd],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [fadeStart, peakStart, peakEnd, fadeEnd],
    [60, 0, 0, -60]
  );

  const positionClasses = {
    left: "items-start text-left left-8 md:left-16 lg:left-24",
    right: "items-end text-right right-8 md:right-16 lg:right-24",
    center: "items-center text-center left-1/2 -translate-x-1/2",
  };

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute top-1/2 -translate-y-1/2 z-20 flex flex-col max-w-md md:max-w-lg pointer-events-none ${positionClasses[section.position]}`}
    >
      <span className="text-sm md:text-base tracking-[0.35em] uppercase text-black/50 font-inter mb-3">
        {section.subtitle}
      </span>
      <h2 className="font-playfair text-4xl md:text-6xl lg:text-7xl text-black font-light leading-tight mb-4">
        {section.title}
      </h2>
      <div className="w-14 h-[2px] bg-black/30 mb-5 mx-auto md:mx-0" />
      <p className="text-base md:text-lg text-black/60 font-inter leading-relaxed max-w-sm md:max-w-md">
        {section.body}
      </p>
    </motion.div>
  );
}

export default function TextOverlay({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <>
      {sections.map((section, index) => (
        <TextBlock
          key={index}
          section={section}
          containerRef={containerRef}
        />
      ))}
    </>
  );
}
