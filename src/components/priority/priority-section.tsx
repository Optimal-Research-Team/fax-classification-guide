"use client";

import { categories } from "@/data/categories";
import { CategoryIcon } from "@/components/categories/category-icon";
import { AlertTriangle } from "lucide-react";

export function PrioritySection() {
  return (
    <section id="priority" className="py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Priority Quick Reference</h2>
        <p className="text-sm text-gray-500 mb-8">
          At-a-glance triage rules. When in doubt, prefer <span className="font-semibold text-red-600">Abnormal</span> — a false positive is far less harmful than a false negative.
        </p>

        {/* Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
            <h4 className="text-xs font-semibold text-gray-900 mb-1">Triage Aid, Not Diagnosis</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Flag documents needing faster physician attention. You are NOT making diagnoses.</p>
          </div>
          <div className="rounded-md border border-amber-200 bg-amber-50/50 p-4">
            <h4 className="text-xs font-semibold text-gray-900 mb-1">When In Doubt → Abnormal</h4>
            <p className="text-xs text-gray-500 leading-relaxed">A false positive is far less harmful than missing something abnormal.</p>
          </div>
          <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
            <h4 className="text-xs font-semibold text-gray-900 mb-1">Never Fabricate Findings</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Only use information explicitly present in the document.</p>
          </div>
        </div>

        {/* Per-category matrix */}
        <div className="space-y-2">
          {categories
            .filter((c) => c.slug !== "junk")
            .map((cat) => (
              <div key={cat.slug} className="rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CategoryIcon slug={cat.slug} className="h-4 w-4 text-gray-400" />
                    <h4 className="text-sm font-semibold text-gray-900">{cat.name}</h4>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {cat.priority.abnormalCriteria.length > 0 && (
                      <div>
                        <span className="inline-block rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-700 uppercase tracking-wider mb-1.5">Abnormal</span>
                        {cat.priority.abnormalCriteria.slice(0, 5).map((item, j) => (
                          <p key={j} className="text-xs text-gray-600 leading-relaxed pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[7px] before:h-1 before:w-1 before:rounded-full before:bg-red-300">
                            {item}
                          </p>
                        ))}
                        {cat.priority.abnormalCriteria.length > 5 && (
                          <p className="text-[11px] text-gray-400 pl-3 mt-0.5">+{cat.priority.abnormalCriteria.length - 5} more (see category detail)</p>
                        )}
                      </div>
                    )}
                    {cat.priority.normalCriteria.length > 0 && (
                      <div>
                        <span className="inline-block rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700 uppercase tracking-wider mb-1.5">Normal</span>
                        {cat.priority.normalCriteria.map((item, j) => (
                          <p key={j} className="text-xs text-gray-600 leading-relaxed pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[7px] before:h-1 before:w-1 before:rounded-full before:bg-green-300">
                            {item}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {cat.priority.criticalValues && cat.priority.criticalValues.length > 0 && (
                  <div className="border-t border-amber-200 bg-amber-50/50 px-4 py-3">
                    <div className="flex items-center gap-1.5 mb-2">
                      <AlertTriangle className="h-3 w-3 text-amber-600" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-700">Critical Values</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5">
                      {cat.priority.criticalValues.map((cv, j) => (
                        <div key={j} className="rounded bg-white border border-amber-200 px-2 py-1">
                          <p className="text-[11px] font-medium text-gray-900 font-[family-name:var(--font-jetbrains)]">{cv.analyte}</p>
                          <p className="text-[11px] text-red-600 font-[family-name:var(--font-jetbrains)]">{cv.threshold}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
