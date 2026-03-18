"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-20 py-5 flex items-center justify-between"
      style={{ background: "transparent" }}
    >
      {/* Logo — lowercase */}
      <Link href="/" className="flex items-center gap-2">
        <span className="font-playfair text-xl md:text-2xl tracking-[0.15em] text-gray-900">
          plucked
        </span>
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-10">
        {[
          { label: "Story", href: "/#story" },
          { label: "Benefits", href: "/#benefits" },
          { label: "Shop", href: "/shop" },
        ].map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-xs tracking-[0.2em] uppercase text-gray-800 hover:text-emerald-700 transition-colors duration-300 font-inter"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right side: Cart + CTA */}
      <div className="flex items-center gap-4">
        {/* Cart icon */}
        <Link
          href="/cart"
          className="relative text-gray-900 hover:text-emerald-700 transition-colors duration-300"
          aria-label="Cart"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>

        <Link
          href="/shop"
          className="px-5 py-2 bg-gray-900 text-white text-xs tracking-[0.15em] uppercase font-inter hover:bg-emerald-700 transition-all duration-300 rounded-sm"
        >
          Shop Now
        </Link>
      </div>
    </nav>
  );
}
