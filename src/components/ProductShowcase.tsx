"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ProductShowcase() {
  return (
    <section
      id="shop"
      className="relative py-24 md:py-40 bg-berry-dark overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full animate-pulse-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(232, 164, 48, 0.15) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        {/* Product image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full max-w-md lg:max-w-lg flex-shrink-0"
        >
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
            <Image
              src="/product-pack.jpg"
              alt="Plucked Sea Buckthorn Dried Berries pack"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute -bottom-4 -right-4 md:bottom-8 md:-right-8 bg-berry-orange text-berry-dark px-4 py-2 rounded-lg shadow-2xl"
          >
            <span className="text-xs font-inter tracking-wider uppercase font-bold">
              100% Natural
            </span>
          </motion.div>
        </motion.div>

        {/* Product info */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center lg:text-left"
        >
          <span className="text-xs tracking-[0.35em] uppercase text-berry-orange/60 font-inter block mb-4">
            Premium Collection
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white/90 font-light leading-tight mb-6">
            Sea Buckthorn
            <br />
            <span className="text-berry-orange">Dried Berries</span>
          </h2>
          <p className="text-white/50 font-inter leading-relaxed mb-8 max-w-lg">
            Each berry is carefully handpicked from the pristine Himalayan
            highlands and naturally sun-dried at altitude to preserve its
            extraordinary nutritional profile. A single serving delivers a
            powerhouse of vitamins, omegas, and antioxidants.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3 mb-10 justify-center lg:justify-start">
            {[
              "Omega 3, 6 & 9",
              "Vitamin C",
              "Antioxidants",
              "No Preservatives",
            ].map((feature) => (
              <span
                key={feature}
                className="px-4 py-2 border border-white/10 rounded-full text-xs text-white/60 font-inter tracking-wider"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* CTA — links to /shop */}
          <Link href="/shop">
            <motion.span
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block px-10 py-4 bg-emerald-600 text-white font-inter text-sm tracking-[0.15em] uppercase font-semibold rounded-sm hover:bg-emerald-500 transition-colors duration-300 shadow-lg shadow-emerald-600/20 cursor-pointer"
            >
              Shop Now
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
