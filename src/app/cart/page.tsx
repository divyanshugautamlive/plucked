"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, totalPrice, updateQuantity, removeFromCart } = useCart();

  const shipping = totalPrice > 0 ? (totalPrice >= 999 ? 0 : 49) : 0;
  const orderTotal = totalPrice + shipping;

  return (
    <main className="relative min-h-screen bg-berry-dark">
      <Navbar />

      <section className="pt-28 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-4">
            <Link
              href="/"
              className="text-white/40 text-xs font-inter tracking-wider hover:text-berry-orange transition-colors"
            >
              Home
            </Link>
            <span className="text-white/20 mx-2">/</span>
            <span className="text-white/60 text-xs font-inter tracking-wider">
              Cart
            </span>
          </div>

          <h1 className="font-playfair text-4xl md:text-5xl text-white/90 font-light mb-10">
            Your Cart
          </h1>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-white/20 mx-auto mb-6"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <p className="text-white/40 font-inter text-lg mb-6">
                Your cart is empty
              </p>
              <Link
                href="/shop"
                className="inline-block px-8 py-3 bg-emerald-600 text-white font-inter text-sm tracking-[0.15em] uppercase rounded-sm hover:bg-emerald-500 transition-colors"
              >
                Continue Shopping
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-5 p-5 bg-berry-surface border border-white/[0.06] rounded-xl"
                  >
                    {/* Product Image */}
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-berry-dark flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                        sizes="96px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-playfair text-lg text-white/90 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-white/40 text-xs font-inter mb-3">
                        {item.weight}
                      </p>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-white/10 rounded-sm">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="px-3 py-1.5 text-white/50 hover:text-white transition-colors text-sm"
                          >
                            −
                          </button>
                          <span className="px-3 py-1.5 text-white text-sm font-inter min-w-[2.5rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-3 py-1.5 text-white/50 hover:text-white transition-colors text-sm"
                          >
                            +
                          </button>
                        </div>

                        {/* Price + Remove */}
                        <div className="flex items-center gap-4">
                          <span className="font-playfair text-lg text-berry-orange">
                            ₹{item.price * item.quantity}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-white/30 hover:text-red-400 transition-colors"
                            aria-label="Remove item"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-1"
              >
                <div className="p-6 bg-berry-surface border border-white/[0.06] rounded-xl sticky top-28">
                  <h3 className="text-xs tracking-[0.2em] uppercase text-white/40 font-inter mb-6">
                    Order Summary
                  </h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm font-inter">
                      <span className="text-white/50">Subtotal</span>
                      <span className="text-white/80">₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm font-inter">
                      <span className="text-white/50">Shipping</span>
                      <span className="text-white/80">
                        {shipping === 0 ? "Free" : `₹${shipping}`}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-[10px] text-emerald-500/70 font-inter">
                        Free shipping on orders above ₹999
                      </p>
                    )}
                  </div>

                  <div className="border-t border-white/[0.06] pt-4 mb-6">
                    <div className="flex justify-between font-inter">
                      <span className="text-white/70 font-medium">Total</span>
                      <span className="text-xl font-playfair text-berry-orange">
                        ₹{orderTotal}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="block w-full py-3.5 bg-emerald-600 text-white text-center font-inter text-sm tracking-[0.15em] uppercase font-semibold rounded-sm hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-600/20"
                  >
                    Place Order
                  </Link>

                  <Link
                    href="/shop"
                    className="block w-full py-3 mt-3 text-center text-white/40 text-xs font-inter tracking-wider hover:text-white/60 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
