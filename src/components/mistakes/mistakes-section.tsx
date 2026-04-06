"use client";

import { commonMistakes } from "@/data/common-mistakes";
import { CheckCircle2, XCircle, AlertOctagon } from "lucide-react";

const severityConfig = {
  high: { label: "High Impact", color: "text-red-700", bg: "bg-red-100", border: "" },
  medium: { label: "Medium", color: "text-amber-700", bg: "bg-amber-100", border: "" },
  low: { label: "Low", color: "text-gray-600", bg: "bg-gray-100", border: "" },
};

export function MistakesSection() {
  return (
    <section id="mistakes" className="py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Common Mistakes</h2>
        <p className="text-sm text-gray-500 mb-8">
          Guardrails to prevent frequent misclassifications.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {commonMistakes.map((mistake) => {
            const sev = severityConfig[mistake.severity];
            return (
              <div key={mistake.id} className="rounded-lg border border-gray-200 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 bg-gray-50">
                  <span className="text-xs font-medium text-gray-500">{mistake.category}</span>
                  <span className={`inline-flex items-center gap-1 rounded-full ${sev.bg} px-2 py-0.5 text-[10px] font-semibold ${sev.color} uppercase tracking-wider`}>
                    {mistake.severity === "high" && <AlertOctagon className="h-2.5 w-2.5" />}
                    {sev.label}
                  </span>
                </div>

                <div className="grid grid-cols-2 divide-x divide-gray-100">
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-green-700">Do</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{mistake.doText}</p>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <XCircle className="h-3.5 w-3.5 text-red-500" />
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-red-600">Don&apos;t</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{mistake.dontText}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
