import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "plucked — Sea Buckthorn Dried Berries",
  description:
    "Premium sun-dried sea buckthorn berries. Rich in Omega 3, 6 & 9, Vitamin C, and natural antioxidants. From nature, perfected by time.",
  keywords: [
    "sea buckthorn",
    "dried berries",
    "superfood",
    "omega",
    "vitamin c",
    "plucked",
  ],
  openGraph: {
    title: "plucked — Sea Buckthorn Dried Berries",
    description:
      "Premium sun-dried sea buckthorn berries. Rich in Omega 3, 6 & 9, Vitamin C, and natural antioxidants.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${playfair.variable} ${inter.variable} font-inter antialiased bg-berry-dark text-white`}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
