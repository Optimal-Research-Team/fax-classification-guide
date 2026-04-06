"use client";

import { useState, useEffect } from "react";
import { Menu, X, FileText } from "lucide-react";

const navLinks = [
  { label: "Categories", href: "#categories" },
  { label: "Decision Tree", href: "#decision-tree" },
  { label: "Priority Guide", href: "#priority" },
  { label: "Common Mistakes", href: "#mistakes" },
  { label: "Date Rules", href: "#date-rules" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-sm" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-semibold text-gray-900">
              Fax Classification Guide
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-[13px] text-gray-500 hover:text-gray-900 transition-colors rounded-md hover:bg-gray-50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            className="md:hidden p-2 text-gray-500 hover:text-gray-900"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <nav className="flex flex-col px-4 py-2 gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
