"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

const navLinks = [
  { href: "/butik", label: "Butik" },
  { href: "/fore-efter", label: "Före / efter" },
  { href: "/faq", label: "Frågor & svar" },
  { href: "/kopvillkor", label: "Köpvillkor" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const showBadge = mounted && totalItems > 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        {/* Left side - Cart (mobile) / Logo (desktop) */}
        <div className="flex items-center">
          {/* Cart - Mobile (left side) */}
          <Link href="/varukorg" className="md:hidden text-white/80 hover:text-white relative">
            <ShoppingCart className="h-7 w-7" />
            {showBadge && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Logo - Desktop */}
          <Link href="/" className="hidden md:flex items-center">
            <Image
              src="/logo.png"
              alt="Keralux"
              width={100}
              height={30}
              className="h-7 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Logo - Mobile (centered) */}
        <Link href="/" className="md:hidden absolute left-1/2 -translate-x-1/2">
          <Image
            src="/logo.png"
            alt="Keralux"
            width={100}
            height={30}
            className="h-7 w-auto"
            priority
          />
        </Link>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg font-medium text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side - Cart (desktop) & Mobile menu button */}
        <div className="flex items-center gap-4">
          {/* Cart - Desktop */}
          <Link
            href="/varukorg"
            className="hidden md:flex items-center gap-2 text-lg font-medium text-white/80 transition-colors hover:text-white relative"
          >
            <ShoppingCart className="h-6 w-6" />
            <span>Varukorg</span>
            {showBadge && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Hamburger button - Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white/80 hover:text-white"
            aria-label="Öppna meny"
          >
            {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="border-t border-white/10 bg-black">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-xl font-medium text-white/80 transition-colors hover:text-white py-3 border-b border-white/5 last:border-0"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
