"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import { useCart } from "@/context/CartContext";

const product = {
  id: "plucked-sea-buckthorn-200g",
  name: "Sea Buckthorn Dried Berries",
  price: 599,
  weight: "200g (7.05 oz)",
  image: "/product-pack.jpg",
  description:
    "Handpicked from the pristine Himalayan highlands and naturally sun-dried at altitude. Each berry preserves its extraordinary nutritional profile — a powerhouse of vitamins, omegas, and antioxidants.",
  features: [
    "Rich in Omega 3, 6 & 9",
    "12x more Vitamin C than oranges",
    "Supports healthy hair & skin",
    "Helps in weight management",
    "Whole | Dried | Natural",
    "No preservatives added",
  ],
  details: [
    { label: "Weight", value: "200g (7.05 oz)" },
    { label: "Source", value: "Himalayan Highlands" },
    { label: "Process", value: "Sun-dried at 3,500m" },
    { label: "Shelf Life", value: "12 months" },
    { label: "Storage", value: "Cool, dry place" },
  ],
};

export default function ShopPage() {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = useCallback(() => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        weight: product.weight,
      },
      quantity
    );
    setShowToast(true);
  }, [addToCart, quantity]);

  return (
    <main className="relative min-h-screen bg-berry-dark">
      <Navbar />

      <section className="pt-28 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              href="/"
              className="text-white/40 text-xs font-inter tracking-wider hover:text-berry-orange transition-colors"
            >
              Home
            </Link>
            <span className="text-white/20 mx-2">/</span>
            <span className="text-white/60 text-xs font-inter tracking-wider">
              Shop
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-berry-surface border border-white/[0.06]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              {/* Badge */}
              <div className="absolute top-4 left-4 bg-emerald-600 text-white text-[10px] font-inter tracking-wider uppercase px-3 py-1.5 rounded-full">
                Bestseller
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="text-xs tracking-[0.3em] uppercase text-emerald-500/80 font-inter block mb-3">
                Premium Collection
              </span>

              <h1 className="font-playfair text-4xl md:text-5xl text-white/90 font-light mb-2">
                {product.name}
              </h1>

              <p className="text-white/40 text-sm font-inter mb-6">
                {product.weight}
              </p>

              <p className="font-playfair text-3xl text-berry-orange mb-6">
                ₹{product.price}
              </p>

              <p className="text-white/50 font-inter leading-relaxed mb-8 text-sm">
                {product.description}
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {product.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-emerald-500 flex-shrink-0"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span className="text-xs text-white/60 font-inter">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Quantity + Add to Cart */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center border border-white/10 rounded-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-white/60 hover:text-white transition-colors text-lg"
                  >
                    −
                  </button>
                  <span className="px-4 py-3 text-white font-inter text-sm min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 text-white/60 hover:text-white transition-colors text-lg"
                  >
                    +
                  </button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 bg-emerald-600 text-white font-inter text-sm tracking-[0.15em] uppercase font-semibold rounded-sm hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-600/20"
                >
                  Add to Cart
                </motion.button>
              </div>

              {/* Product Details */}
              <div className="border-t border-white/[0.06] pt-6">
                <h3 className="text-xs tracking-[0.2em] uppercase text-white/40 font-inter mb-4">
                  Product Details
                </h3>
                <div className="space-y-3">
                  {product.details.map((detail) => (
                    <div
                      key={detail.label}
                      className="flex justify-between text-sm font-inter"
                    >
                      <span className="text-white/40">{detail.label}</span>
                      <span className="text-white/70">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <Toast
        message="Added to cart!"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </main>
  );
}
