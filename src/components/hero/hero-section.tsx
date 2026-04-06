"use client";

import { motion } from "framer-motion";
import { ChevronDown, Stethoscope } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center gradient-mesh overflow-hidden">
      {/* Decorative grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#4a7c4a]/20 bg-[#4a7c4a]/10 px-4 py-1.5 text-xs text-[#8ab89a] mb-8">
            <Stethoscope className="h-3.5 w-3.5 text-[#6b9e6b]" />
            beOptimal — Internal Reference
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          Fax Classification
          <br />
          <span className="bg-gradient-to-r from-[#6b9e6b] via-[#8ab89a] to-[#c5d5b5] bg-clip-text text-transparent">
            Reference Guide
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-[#8ab89a] max-w-2xl mx-auto mb-4 leading-relaxed"
        >
          How to categorize, triage, and route incoming faxes. Covers all 13
          document categories, priority rules, date extraction, and common
          classification pitfalls.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-sm text-[#6b9e6b]/60 max-w-xl mx-auto mb-12"
        >
          Ontario NP-Led Primary Care Clinic
        </motion.p>

        <motion.a
          href="#categories"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-2 text-sm text-[#8ab89a] hover:text-[#c5d5b5] transition-colors"
        >
          Explore categories
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </motion.a>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f1a0f] to-transparent" />
    </section>
  );
}
