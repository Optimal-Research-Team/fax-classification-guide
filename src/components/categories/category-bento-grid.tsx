"use client";

import { motion } from "framer-motion";
import { categories } from "@/data/categories";
import { CategoryIcon } from "./category-icon";
import { ArrowRight } from "lucide-react";

// Bento grid: 3-col layout, key categories span 2 cols
// Row 1: Referral(2) + Consult(1) = 3
// Row 2: Imaging(1) + Radiology(2) = 3
// Row 3: Lab(2) + Pathology(1) = 3
// Row 4: Prescription(1) + Insurance(1) + Legal(1) = 3
// Row 5: Oldchart(1) + Photo(1) + Junk(1) = 3
// Row 6: Others(1) = 1
const spanMap: Record<number, string> = {
  0: "md:col-span-2", // Referral - wide
  3: "md:col-span-2", // Radiology - wide
  4: "md:col-span-2", // Lab - wide
};

export function CategoryBentoGrid() {
  return (
    <section id="categories" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Document Categories
          </h2>
          <p className="text-[#8ab89a]/80 max-w-2xl">
            13 categories for classifying incoming faxes. Each category has
            specific rules for what belongs, priority triage, and date
            extraction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.slug}
              href={`#cat-${cat.slug}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              whileHover={{ scale: 1.015 }}
              className={`group relative rounded-xl border border-[#4a7c4a]/10 bg-[#1a2e1a]/60 p-5 transition-all duration-300 hover:border-[#4a7c4a]/20 category-glow ${
                spanMap[i] || ""
              }`}
              style={
                { "--glow-color": `${cat.color}25` } as React.CSSProperties
              }
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#4a7c4a]/10"
                  style={{ backgroundColor: `${cat.color}12` }}
                >
                  <CategoryIcon
                    slug={cat.slug}
                    className="h-4.5 w-4.5"
                  />
                </div>
                <ArrowRight className="h-4 w-4 text-[#6b9e6b]/30 group-hover:text-[#c5d5b5] transition-colors" />
              </div>

              <h3 className="text-[15px] font-semibold mb-1.5" style={{ color: cat.color }}>
                {cat.name}
              </h3>
              <p className="text-[13px] text-[#8ab89a]/50 leading-relaxed line-clamp-2">
                {cat.shortDescription}
              </p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(90deg, transparent, ${cat.color}40, transparent)`,
                }}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
