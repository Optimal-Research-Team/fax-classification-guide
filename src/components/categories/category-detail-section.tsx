"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "@/data/categories";
import { CategoryIcon } from "./category-icon";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronDown,
  Calendar,
  Lightbulb,
} from "lucide-react";

export function CategoryDetailSection() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-3">
        {categories.map((cat) => {
          const isOpen = openSlug === cat.slug;
          return (
            <div
              key={cat.slug}
              id={`cat-${cat.slug}`}
              className="rounded-xl border border-white/[0.06] bg-[#1a2e1a]/30 overflow-hidden scroll-mt-20"
            >
              {/* Accordion header */}
              <button
                onClick={() => setOpenSlug(isOpen ? null : cat.slug)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/[0.02] transition-colors"
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.06]"
                  style={{ backgroundColor: `${cat.color}12` }}
                >
                  <CategoryIcon slug={cat.slug} className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-semibold" style={{ color: cat.color }}>
                    {cat.name}
                  </h3>
                  <p className="text-[13px] text-[#8ab89a]/50 truncate">
                    {cat.shortDescription}
                  </p>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-[#8ab89a]/50 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Accordion content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-6 space-y-6 border-t border-white/[0.04] pt-5">
                      {/* Definition */}
                      <div>
                        <p className="text-sm text-[#dde8d3] leading-relaxed">
                          {cat.definition}
                        </p>
                      </div>

                      {/* Belongs / Does Not Belong */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {cat.belongsHere.length > 0 && (
                          <div className="rounded-lg border border-emerald-500/10 bg-emerald-500/[0.03] p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                                Belongs Here
                              </span>
                            </div>
                            <ul className="space-y-1.5">
                              {cat.belongsHere.map((item, i) => (
                                <li
                                  key={i}
                                  className="text-[13px] text-[#c5d5b5]/70 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[9px] before:h-1 before:w-1 before:rounded-full before:bg-emerald-500/40"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {cat.doesNotBelong.length > 0 && (
                          <div className="rounded-lg border border-red-500/10 bg-red-500/[0.03] p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <XCircle className="h-4 w-4 text-red-400" />
                              <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
                                Does NOT Belong
                              </span>
                            </div>
                            <ul className="space-y-1.5">
                              {cat.doesNotBelong.map((item, i) => (
                                <li
                                  key={i}
                                  className="text-[13px] text-[#c5d5b5]/70 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[9px] before:h-1 before:w-1 before:rounded-full before:bg-red-500/40"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Priority Rules */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <AlertTriangle className="h-4 w-4 text-amber-400" />
                          <span className="text-xs font-semibold uppercase tracking-wider text-[#c5d5b5]/70">
                            Priority / Triage Rules
                          </span>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {cat.priority.abnormalCriteria.length > 0 && (
                            <div className="rounded-lg border border-red-500/10 bg-red-500/[0.02] p-4">
                              <div className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-red-400 uppercase tracking-wider mb-3">
                                Abnormal
                              </div>
                              <ul className="space-y-1.5">
                                {cat.priority.abnormalCriteria.map((item, i) => (
                                  <li
                                    key={i}
                                    className="text-[13px] text-[#c5d5b5]/70 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[9px] before:h-1 before:w-1 before:rounded-full before:bg-red-500/50"
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {cat.priority.normalCriteria.length > 0 && (
                            <div className="rounded-lg border border-emerald-500/10 bg-emerald-500/[0.02] p-4">
                              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-3">
                                Normal
                              </div>
                              <ul className="space-y-1.5">
                                {cat.priority.normalCriteria.map((item, i) => (
                                  <li
                                    key={i}
                                    className="text-[13px] text-[#c5d5b5]/70 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[9px] before:h-1 before:w-1 before:rounded-full before:bg-emerald-500/40"
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Critical Values for Lab */}
                        {cat.priority.criticalValues && cat.priority.criticalValues.length > 0 && (
                          <div className="mt-4 rounded-lg border border-amber-500/15 bg-amber-500/[0.03] p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <AlertTriangle className="h-4 w-4 text-amber-400" />
                              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                                Critical Values — Requires Immediate Attention
                              </span>
                            </div>
                            <div className="overflow-x-auto">
                              <table className="w-full text-[13px]">
                                <thead>
                                  <tr className="border-b border-white/[0.06]">
                                    <th className="text-left py-2 pr-4 font-medium text-[#c5d5b5]/70">
                                      Analyte
                                    </th>
                                    <th className="text-left py-2 font-medium text-[#c5d5b5]/70">
                                      Critical Threshold
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {cat.priority.criticalValues.map((cv, i) => (
                                    <tr
                                      key={i}
                                      className="border-b border-white/[0.03]"
                                    >
                                      <td className="py-2 pr-4 text-[#dde8d3] font-medium font-[family-name:var(--font-jetbrains)] text-xs">
                                        {cv.analyte}
                                      </td>
                                      <td className="py-2 text-red-400 font-[family-name:var(--font-jetbrains)] text-xs">
                                        {cv.threshold}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Date Extraction */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Calendar className="h-4 w-4 text-blue-400" />
                          <span className="text-xs font-semibold uppercase tracking-wider text-[#c5d5b5]/70">
                            Date Extraction Priority
                          </span>
                        </div>
                        <div className="space-y-2">
                          {cat.dateExtraction.map((rule, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-3 rounded-lg bg-white/[0.02] border border-white/[0.04] px-4 py-3"
                            >
                              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-bold text-blue-400">
                                {rule.priority}
                              </div>
                              <div>
                                <p className="text-[13px] text-[#e8f0e8] font-medium">
                                  {rule.dateField}
                                </p>
                                <p className="text-[12px] text-[#8ab89a]/50 mt-0.5">
                                  {rule.note}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Edge Cases */}
                      {cat.edgeCases.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <Lightbulb className="h-4 w-4 text-violet-400" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-[#c5d5b5]/70">
                              Tricky Scenarios
                            </span>
                          </div>
                          <div className="space-y-3">
                            {cat.edgeCases.map((ec, i) => (
                              <div
                                key={i}
                                className="rounded-lg border border-violet-500/10 bg-violet-500/[0.02] p-4"
                              >
                                <p className="text-[13px] text-[#dde8d3] font-medium mb-1.5">
                                  {ec.scenario}
                                </p>
                                <p className="text-[12px] text-[#8ab89a]/50 leading-relaxed">
                                  <span
                                    className="font-semibold"
                                    style={{
                                      color: categories.find(
                                        (c) => c.slug === ec.correctCategory
                                      )?.color,
                                    }}
                                  >
                                    Correct:{" "}
                                    {categories.find(
                                      (c) => c.slug === ec.correctCategory
                                    )?.name}
                                  </span>{" "}
                                  — {ec.explanation}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
