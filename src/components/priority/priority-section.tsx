"use client";

import { motion } from "framer-motion";
import { categories } from "@/data/categories";
import { CategoryIcon } from "@/components/categories/category-icon";
import { AlertTriangle, Shield, Activity } from "lucide-react";

export function PrioritySection() {
  return (
    <section id="priority" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Priority Quick Reference
          </h2>
          <p className="text-[#c5d5b5]/70 max-w-2xl">
            At-a-glance triage rules for every category. When in doubt, prefer
            <span className="text-red-400 font-medium"> Abnormal</span> — a
            false positive is far less harmful than a false negative.
          </p>
        </motion.div>

        {/* General principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="rounded-xl border border-[#4a7c4a]/10 bg-[#1a2e1a]/30 p-5">
            <Activity className="h-5 w-5 text-[#6b9e6b] mb-3" />
            <h4 className="text-sm font-semibold mb-1 text-[#e8f0e8]">
              Triage Aid, Not Diagnosis
            </h4>
            <p className="text-[13px] text-[#8ab89a]/50 leading-relaxed">
              You are flagging documents that need faster physician attention.
              You are NOT making diagnoses.
            </p>
          </div>
          <div className="rounded-xl border border-amber-500/10 bg-amber-500/[0.02] p-5">
            <AlertTriangle className="h-5 w-5 text-amber-400 mb-3" />
            <h4 className="text-sm font-semibold mb-1 text-[#e8f0e8]">
              When In Doubt → Abnormal
            </h4>
            <p className="text-[13px] text-[#8ab89a]/50 leading-relaxed">
              A false positive (flagging something normal) is far less harmful
              than a false negative (missing something abnormal).
            </p>
          </div>
          <div className="rounded-xl border border-[#4a7c4a]/10 bg-[#1a2e1a]/30 p-5">
            <Shield className="h-5 w-5 text-emerald-400 mb-3" />
            <h4 className="text-sm font-semibold mb-1 text-[#e8f0e8]">
              Never Fabricate Findings
            </h4>
            <p className="text-[13px] text-[#8ab89a]/50 leading-relaxed">
              Only use information explicitly present in the document. Do not
              infer or assume clinical findings.
            </p>
          </div>
        </div>

        {/* Priority matrix */}
        <div className="space-y-3">
          {categories
            .filter((c) => c.slug !== "junk") // junk is always normal, not interesting
            .map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                className="rounded-xl border border-[#4a7c4a]/10 bg-[#1a2e1a]/30 overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#4a7c4a]/10"
                      style={{ backgroundColor: `${cat.color}12` }}
                    >
                      <CategoryIcon slug={cat.slug} className="h-4 w-4" />
                    </div>
                    <h4
                      className="text-sm font-semibold"
                      style={{ color: cat.color }}
                    >
                      {cat.name}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {/* Abnormal */}
                    {cat.priority.abnormalCriteria.length > 0 && (
                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/20 px-2 py-0.5 text-[10px] font-semibold text-red-400 uppercase tracking-wider mb-2">
                          Abnormal
                        </div>
                        {cat.priority.abnormalCriteria.slice(0, 5).map((item, j) => (
                          <p
                            key={j}
                            className="text-[12px] text-[#8ab89a]/50 leading-relaxed pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[7px] before:h-1 before:w-1 before:rounded-full before:bg-red-500/40"
                          >
                            {item}
                          </p>
                        ))}
                        {cat.priority.abnormalCriteria.length > 5 && (
                          <p className="text-[11px] text-[#6b9e6b]/30 pl-3">
                            +{cat.priority.abnormalCriteria.length - 5} more
                            criteria (see category detail above)
                          </p>
                        )}
                      </div>
                    )}

                    {/* Normal */}
                    {cat.priority.normalCriteria.length > 0 && (
                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                          Normal
                        </div>
                        {cat.priority.normalCriteria.map((item, j) => (
                          <p
                            key={j}
                            className="text-[12px] text-[#8ab89a]/50 leading-relaxed pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[7px] before:h-1 before:w-1 before:rounded-full before:bg-emerald-500/40"
                          >
                            {item}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Critical values for Lab */}
                {cat.priority.criticalValues &&
                  cat.priority.criticalValues.length > 0 && (
                    <div className="border-t border-amber-500/10 bg-amber-500/[0.02] px-4 py-3">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                          Critical Values
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                        {cat.priority.criticalValues.map((cv, j) => (
                          <div
                            key={j}
                            className="rounded-md bg-amber-500/[0.05] border border-amber-500/10 px-2.5 py-1.5"
                          >
                            <p className="text-[11px] font-medium text-[#dde8d3] font-[family-name:var(--font-jetbrains)]">
                              {cv.analyte}
                            </p>
                            <p className="text-[11px] text-red-400 font-[family-name:var(--font-jetbrains)]">
                              {cv.threshold}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
