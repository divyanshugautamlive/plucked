"use client";

import { motion } from "framer-motion";

const benefits = [
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M14 20C14 20 16 14 20 14C24 14 26 20 26 20C26 20 24 26 20 26C16 26 14 20 14 20Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M20 12V14M20 26V28M12 20H14M26 20H28" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Rich in Omega 3, 6 & 9",
    description:
      "One of the few plants containing all essential omega fatty acids, supporting heart, brain, and cellular health.",
  },
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="18" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 24V30" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 28H24" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Rich in Vitamin C",
    description:
      "Contains 12x more Vitamin C than oranges. A natural immunity booster that protects against oxidative stress.",
  },
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M15 22C15 18 20 12 20 12C20 12 25 18 25 22C25 25 22.7614 27 20 27C17.2386 27 15 25 15 22Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
    title: "Healthy Hair & Skin",
    description:
      "Packed with vitamins A, E, and essential oils that nourish skin from within and promote lustrous, strong hair.",
  },
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 26L20 14L26 26" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 22H24" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Weight Management",
    description:
      "Natural Omega-7 helps manage body weight by signaling the body to stop storing fat, supporting a healthy metabolism.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

export default function BenefitsSection() {
  return (
    <section
      id="benefits"
      className="relative py-24 md:py-36 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #E8A430 0%, #9C6B1A 15%, #3D2A0D 35%, #0D0A06 60%)",
      }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20 px-6"
      >
        <span className="text-xs tracking-[0.35em] uppercase text-berry-orange/60 font-inter block mb-4">
          Why Sea Buckthorn
        </span>
        <h2 className="font-playfair text-4xl md:text-6xl text-white/90 font-light mb-6">
          Nature&apos;s Superfood
        </h2>
        <div className="w-16 h-[1px] bg-berry-orange/40 mx-auto" />
      </motion.div>

      {/* Benefits grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="group p-8 rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm hover:border-berry-orange/20 hover:bg-white/[0.06] transition-all duration-500"
          >
            <div className="text-berry-orange/70 group-hover:text-berry-orange transition-colors duration-300 mb-6">
              {benefit.icon}
            </div>
            <h3 className="font-playfair text-lg text-white/90 mb-3">
              {benefit.title}
            </h3>
            <p className="text-sm text-white/50 font-inter leading-relaxed">
              {benefit.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
