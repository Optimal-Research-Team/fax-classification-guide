"use client";

import { categories } from "@/data/categories";
import { CategoryIcon } from "@/components/categories/category-icon";
import { Info } from "lucide-react";

const generalRules = [
  { title: "Clinical Event Date", description: "Always extract the date of the clinical event, NOT the fax transmission date." },
  { title: "Canadian Date Format", description: "When day and month are both <=12 and ambiguous, default to DD/MM/YYYY (Canadian convention)." },
  { title: "ISO 8601 Output", description: "All dates normalized to YYYY-MM-DD. Partial dates (month + year) normalize to the 1st of that month." },
  { title: "Garbled Dates", description: "If a date is garbled, illegible, or corrupted by OCR, return null rather than guessing." },
];

export function DateRulesSection() {
  return (
    <section id="date-rules" className="py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Date Extraction Rules</h2>
        <p className="text-sm text-gray-500 mb-8">
          Each category has a priority hierarchy for which date to extract.
        </p>

        {/* General rules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-10">
          {generalRules.map((rule, i) => (
            <div key={i} className="rounded-md border border-gray-200 bg-gray-50 p-3">
              <Info className="h-3.5 w-3.5 text-gray-400 mb-1.5" />
              <h4 className="text-xs font-semibold text-gray-900 mb-0.5">{rule.title}</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">{rule.description}</p>
            </div>
          ))}
        </div>

        {/* Per-category */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <div key={cat.slug} className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <CategoryIcon slug={cat.slug} className="h-3.5 w-3.5 text-gray-400" />
                <h4 className="text-sm font-semibold text-gray-900">{cat.name}</h4>
              </div>
              <div className="space-y-1.5">
                {cat.dateExtraction.map((rule, j) => (
                  <div key={j} className="flex items-start gap-2">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-gray-500 mt-0.5">{rule.priority}</span>
                    <div>
                      <p className="text-xs text-gray-900 font-medium">{rule.dateField}</p>
                      <p className="text-[11px] text-gray-400">{rule.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
