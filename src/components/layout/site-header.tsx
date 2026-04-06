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
        scrolled ? "glass" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4a7c4a]/15 border border-[#4a7c4a]/25">
              <FileText className="h-4 w-4 text-[#6b9e6b]" />
            </div>
            <span className="text-sm font-semibold tracking-tight">
              Fax Classification Guide
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-[13px] text-[#8ab89a]/70 hover:text-[#e8f0e8] transition-colors rounded-md hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            className="md:hidden p-2 text-zinc-400 hover:text-zinc-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass border-t border-white/5">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-zinc-400 hover:text-zinc-100 rounded-md hover:bg-white/5"
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
