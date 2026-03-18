"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  const shipping = totalPrice >= 999 ? 0 : 49;
  const orderTotal = totalPrice + shipping;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    cardName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const id = "PLK-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setOrderId(id);
    setIsComplete(true);
    setIsProcessing(false);
    clearCart();
  };

  // Success screen
  if (isComplete) {
    return (
      <main className="relative min-h-screen bg-berry-dark">
        <Navbar />
        <section className="pt-28 pb-20 px-6 flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-md"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </motion.div>

            <h1 className="font-playfair text-4xl text-white/90 mb-3">
              Order Confirmed!
            </h1>
            <p className="text-white/50 font-inter mb-2">
              Thank you for your purchase.
            </p>
            <p className="text-emerald-500 font-inter text-sm mb-8">
              Order ID: <span className="font-mono">{orderId}</span>
            </p>

            <div className="bg-berry-surface border border-white/[0.06] rounded-xl p-6 mb-8 text-left">
              <p className="text-xs tracking-[0.2em] uppercase text-white/40 font-inter mb-3">
                What&apos;s next?
              </p>
              <div className="space-y-2 text-sm font-inter text-white/60">
                <p>✓ Confirmation email sent to {form.email || "your email"}</p>
                <p>✓ Your order is being prepared</p>
                <p>✓ Expected delivery in 3-5 business days</p>
              </div>
            </div>

            <Link
              href="/"
              className="inline-block px-8 py-3 bg-emerald-600 text-white font-inter text-sm tracking-[0.15em] uppercase rounded-sm hover:bg-emerald-500 transition-colors"
            >
              Back to Home
            </Link>
          </motion.div>
        </section>
      </main>
    );
  }

  // Empty cart redirect
  if (items.length === 0 && !isComplete) {
    return (
      <main className="relative min-h-screen bg-berry-dark">
        <Navbar />
        <section className="pt-28 pb-20 px-6 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-white/40 font-inter text-lg mb-6">
              Your cart is empty
            </p>
            <Link
              href="/shop"
              className="inline-block px-8 py-3 bg-emerald-600 text-white font-inter text-sm tracking-[0.15em] uppercase rounded-sm hover:bg-emerald-500 transition-colors"
            >
              Go to Shop
            </Link>
          </div>
        </section>
      </main>
    );
  }

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
            <Link
              href="/cart"
              className="text-white/40 text-xs font-inter tracking-wider hover:text-berry-orange transition-colors"
            >
              Cart
            </Link>
            <span className="text-white/20 mx-2">/</span>
            <span className="text-white/60 text-xs font-inter tracking-wider">
              Checkout
            </span>
          </div>

          <h1 className="font-playfair text-4xl md:text-5xl text-white/90 font-light mb-10">
            Checkout
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Form Fields */}
              <div className="lg:col-span-2 space-y-8">
                {/* Shipping Info */}
                <div className="bg-berry-surface border border-white/[0.06] rounded-xl p-6">
                  <h2 className="text-xs tracking-[0.2em] uppercase text-white/40 font-inter mb-6">
                    Shipping Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs text-white/40 font-inter mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-berry-dark border border-white/10 rounded-sm text-white/90 text-sm font-inter focus:border-emerald-500 focus:outline-none transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 font-inter mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-berry-dark border border-white/10 rounded-sm text-white/90 text-sm font-inter focus:border-emerald-500 focus:outline-none transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 font-inter mb-1.5">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-berry-dark border border-white/10 rounded-sm text-white/90 text-sm font-inter focus:border-emerald-500 focus:outline-none transition-colors"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs text-white/40 font-inter mb-1.5">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-berry-dark border border-white/10 rounded-sm text-white/90 text-sm font-inter focus:border-emerald-500 focus:outline-none transition-colors"
                        placeholder="Street address"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 font-inter mb-1.5">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-berry-dark border border-white/10 rounded-sm text-white/90 text-sm font-inter focus:border-emerald-500 focus:outline-none transition-colors"
                        placeholder="City"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-white/40 font-inter mb-1.5">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={form.state}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-berry-dark border border-white/10 rounded-sm text-white/90 text-sm font-inter focus:border-emerald-500 focus:outline-none transition-colors"
                          placeholder="State"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-white/40 font-inter mb-1.5">
                          PIN Code
                        </label>
                        <input
                          type="text"
                          name="zip"
                          value={form.zip}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-berry-dark border border-white/10 rounded-sm text-white/90 text-sm font-inter focus:border-emerald-500 focus:outline-none transition-colors"
                          placeholder="110001"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-berry-surface border border-white/[0.06] rounded-xl p-6">
                  <h2 className="text-xs tracking-[0.2em] uppercase text-white/40 font-inter mb-6">
                    Payment Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs text-white/40 font-inter mb-1.5">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={form.cardName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-berry-dark border border-white/10 rounded-sm text-white/90 text-sm font-inter focus:border-emerald-500 focus:outline-none transition-colors"
                        placeholder="Cardholder name"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs text-white/40 font-inter mb-1.5">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={form.cardNumber}
                        onChange={handleChange}
                        required
                        maxLength={19}
                        className="w-full px-4 py-3 bg-berry-dark border border-white/10 rounded-sm text-white/90 text-sm font-inter focus:border-emerald-500 focus:outline-none transition-colors font-mono tracking-wider"
                        placeholder="4242 4242 4242 4242"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 font-inter mb-1.5">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={form.cardExpiry}
                        onChange={handleChange}
                        required
                        maxLength={5}
                        className="w-full px-4 py-3 bg-berry-dark border border-white/10 rounded-sm text-white/90 text-sm font-inter focus:border-emerald-500 focus:outline-none transition-colors font-mono"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 font-inter mb-1.5">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cardCvv"
                        value={form.cardCvv}
                        onChange={handleChange}
                        required
                        maxLength={4}
                        className="w-full px-4 py-3 bg-berry-dark border border-white/10 rounded-sm text-white/90 text-sm font-inter focus:border-emerald-500 focus:outline-none transition-colors font-mono"
                        placeholder="•••"
                      />
                    </div>
                  </div>

                  <p className="mt-4 text-[10px] text-white/30 font-inter flex items-center gap-1.5">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                    Your payment information is secure and encrypted
                  </p>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="p-6 bg-berry-surface border border-white/[0.06] rounded-xl sticky top-28">
                  <h3 className="text-xs tracking-[0.2em] uppercase text-white/40 font-inter mb-6">
                    Order Summary
                  </h3>

                  {/* Items */}
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-berry-dark flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain p-1"
                            sizes="56px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white/80 font-inter truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-white/40 font-inter">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="text-sm text-white/70 font-inter">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/[0.06] pt-4 space-y-3 mb-6">
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
                  </div>

                  <div className="border-t border-white/[0.06] pt-4 mb-6">
                    <div className="flex justify-between font-inter">
                      <span className="text-white/70 font-medium">Total</span>
                      <span className="text-xl font-playfair text-berry-orange">
                        ₹{orderTotal}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isProcessing}
                    className="w-full py-3.5 bg-emerald-600 text-white font-inter text-sm tracking-[0.15em] uppercase font-semibold rounded-sm hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      `Pay ₹${orderTotal}`
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
