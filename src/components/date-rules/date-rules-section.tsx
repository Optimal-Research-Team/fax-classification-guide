"use client";

import { motion } from "framer-motion";
import { categories } from "@/data/categories";
import { CategoryIcon } from "@/components/categories/category-icon";
import { Calendar, Info } from "lucide-react";

const generalRules = [
  {
    title: "Clinical Event Date",
    description:
      "Always extract the date of the clinical event, NOT the fax transmission date. Cover sheet dates reflect transmission time, not the clinical event.",
  },
  {
    title: "Canadian Date Format",
    description:
      "Canadian medical forms commonly use DD/MM/YYYY. When day and month are both ≤12 and format is ambiguous, default to DD/MM/YYYY.",
  },
  {
    title: "ISO 8601 Output",
    description:
      "All dates must be normalized to YYYY-MM-DD format. Partial dates (month + year only) normalize to the first of that month.",
  },
  {
    title: "Garbled Dates",
    description:
      "If a date is present but garbled, illegible, or corrupted by OCR, return null rather than guessing.",
  },
];

export function DateRulesSection() {
  return (
    <section id="date-rules" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Date Extraction Rules
          </h2>
          <p className="text-[#c5d5b5]/70 max-w-2xl">
            Each category has a specific hierarchy for which date to extract.
            Always prefer the clinical event date over administrative dates.
          </p>
        </motion.div>

        {/* General rules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {generalRules.map((rule, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="rounded-xl border border-[#4a7c4a]/25 bg-[#4a7c4a]/[0.04] p-4"
            >
              <Info className="h-4 w-4 text-[#6b9e6b] mb-2" />
              <h4 className="text-[13px] font-semibold text-[#e8f0e8] mb-1">
                {rule.title}
              </h4>
              <p className="text-[12px] text-[#8ab89a]/50 leading-relaxed">
                {rule.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Per-category date rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.3, delay: i * 0.02 }}
              className="rounded-xl border border-[#4a7c4a]/10 bg-[#1a2e1a]/30 p-4"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-[#4a7c4a]/10"
                  style={{ backgroundColor: `${cat.color}12` }}
                >
                  <CategoryIcon slug={cat.slug} className="h-3.5 w-3.5" />
                </div>
                <h4
                  className="text-[13px] font-semibold"
                  style={{ color: cat.color }}
                >
                  {cat.name}
                </h4>
              </div>

              <div className="space-y-2">
                {cat.dateExtraction.map((rule, j) => (
                  <div key={j} className="flex items-start gap-2">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c5d5b5]/[0.04] text-[10px] font-bold text-[#8ab89a]/50 mt-0.5">
                      {rule.priority}
                    </div>
                    <div>
                      <p className="text-[12px] text-[#dde8d3] font-medium">
                        {rule.dateField}
                      </p>
                      <p className="text-[11px] text-[#6b9e6b]/30">{rule.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
