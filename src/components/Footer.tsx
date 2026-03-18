"use client";

import Link from "next/link";

export default function Footer() {
  const links = [
    { label: "Story", href: "/#story" },
    { label: "Benefits", href: "/#benefits" },
    { label: "Shop", href: "/shop" },
    { label: "Cart", href: "/cart" },
  ];

  return (
    <footer className="relative bg-berry-dark border-t border-white/[0.06] py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand */}
        <div className="text-center md:text-left">
          <Link href="/">
            <h3 className="font-playfair text-2xl tracking-[0.15em] text-white/80 mb-2">
              plucked
            </h3>
          </Link>
          <p className="text-xs text-white/30 font-inter tracking-wider">
            From Nature, Perfected by Time
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-8">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs tracking-[0.15em] uppercase text-white/40 hover:text-berry-orange transition-colors duration-300 font-inter"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social / Copyright */}
        <div className="text-center md:text-right">
          <div className="flex gap-5 mb-3 justify-center md:justify-end">
            <a
              href="#"
              className="text-white/30 hover:text-berry-orange transition-colors duration-300"
              aria-label="Instagram"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="18" cy="6" r="1.5" fill="currentColor" />
              </svg>
            </a>
            <a
              href="#"
              className="text-white/30 hover:text-berry-orange transition-colors duration-300"
              aria-label="Twitter"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M4 4L10.5 12.5L4 20H6L11.5 13.5L16 20H20L13 11L19 4H17L12 10L8 4H4Z" />
              </svg>
            </a>
          </div>
          <p className="text-[10px] text-white/20 font-inter tracking-wider">
            © 2026 plucked. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
