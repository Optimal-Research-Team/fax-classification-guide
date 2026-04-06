"use client";

import { motion } from "framer-motion";
import { commonMistakes } from "@/data/common-mistakes";
import { CheckCircle2, XCircle, AlertOctagon } from "lucide-react";

const severityConfig = {
  high: { label: "High Impact", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
  medium: { label: "Medium", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  low: { label: "Low", color: "text-[#c5d5b5]/70", bg: "bg-[#8ab89a]/10", border: "border-[#8ab89a]/20" },
};

export function MistakesSection() {
  return (
    <section id="mistakes" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Common Mistakes
          </h2>
          <p className="text-[#c5d5b5]/70 max-w-2xl">
            Guardrails to prevent frequent misclassifications. Follow the{" "}
            <span className="text-emerald-400">Do</span> column. Avoid the{" "}
            <span className="text-red-400">Don&apos;t</span> column.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {commonMistakes.map((mistake, i) => {
            const sev = severityConfig[mistake.severity];
            return (
              <motion.div
                key={mistake.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="rounded-xl border border-[#4a7c4a]/10 bg-[#1a2e1a]/30 overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#c5d5b5]/[0.06]">
                  <span className="text-[12px] font-medium text-[#c5d5b5]/70">
                    {mistake.category}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full ${sev.bg} ${sev.border} border px-2 py-0.5 text-[10px] font-semibold ${sev.color} uppercase tracking-wider`}
                  >
                    {mistake.severity === "high" && (
                      <AlertOctagon className="h-2.5 w-2.5" />
                    )}
                    {sev.label}
                  </span>
                </div>

                <div className="grid grid-cols-2 divide-x divide-white/[0.04]">
                  {/* Do */}
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                        Do
                      </span>
                    </div>
                    <p className="text-[12px] text-[#c5d5b5]/70 leading-relaxed">
                      {mistake.doText}
                    </p>
                  </div>

                  {/* Don't */}
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <XCircle className="h-3.5 w-3.5 text-red-400" />
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-red-400">
                        Don&apos;t
                      </span>
                    </div>
                    <p className="text-[12px] text-[#c5d5b5]/70 leading-relaxed">
                      {mistake.dontText}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
