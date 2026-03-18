"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import BerryScroll from "@/components/BerryScroll";
import BenefitsSection from "@/components/BenefitsSection";
import ProductShowcase from "@/components/ProductShowcase";
import Footer from "@/components/Footer";

const Preloader = dynamic(() => import("@/components/Preloader"), {
  ssr: false,
});

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setIsLoaded(true);
    document.body.classList.remove("loading");
  }, []);

  return (
    <main className="relative">
      {/* Preloader */}
      {!isLoaded && <Preloader onComplete={handleLoadComplete} />}

      {/* Navigation */}
      <Navbar />

      {/* Page starts directly with the Story / Scroll Animation */}
      <div id="story">
        <BerryScroll />
      </div>

      {/* Benefits */}
      <BenefitsSection />

      {/* Product Showcase */}
      <ProductShowcase />

      {/* Footer */}
      <Footer />
    </main>
  );
}
