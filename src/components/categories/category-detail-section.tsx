"use client";

import { useState } from "react";
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
    <section className="py-8 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-1.5">
        {categories.map((cat) => {
          const isOpen = openSlug === cat.slug;
          return (
            <div
              key={cat.slug}
              id={`cat-${cat.slug}`}
              className="rounded-lg border border-gray-200 overflow-hidden scroll-mt-20"
            >
              <button
                onClick={() => setOpenSlug(isOpen ? null : cat.slug)}
                className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <CategoryIcon slug={cat.slug} className="h-4 w-4 text-gray-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-500 truncate">
                    {cat.shortDescription}
                  </p>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-gray-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-6 space-y-6 border-t border-gray-100 pt-5">
                  {/* Definition */}
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {cat.definition}
                  </p>

                  {/* Belongs / Does Not Belong */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {cat.belongsHere.length > 0 && (
                      <div className="rounded-md border border-green-200 bg-green-50/50 p-4">
                        <div className="flex items-center gap-1.5 mb-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                          <span className="text-xs font-semibold uppercase tracking-wider text-green-700">
                            Belongs Here
                          </span>
                        </div>
                        <ul className="space-y-1">
                          {cat.belongsHere.map((item, i) => (
                            <li key={i} className="text-sm text-gray-700 leading-relaxed flex gap-2">
                              <span className="text-green-400 mt-1.5 shrink-0">&#8226;</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {cat.doesNotBelong.length > 0 && (
                      <div className="rounded-md border border-red-200 bg-red-50/50 p-4">
                        <div className="flex items-center gap-1.5 mb-2">
                          <XCircle className="h-3.5 w-3.5 text-red-500" />
                          <span className="text-xs font-semibold uppercase tracking-wider text-red-600">
                            Does NOT Belong
                          </span>
                        </div>
                        <ul className="space-y-1">
                          {cat.doesNotBelong.map((item, i) => (
                            <li key={i} className="text-sm text-gray-700 leading-relaxed flex gap-2">
                              <span className="text-red-300 mt-1.5 shrink-0">&#8226;</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Priority Rules */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-3">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Priority / Triage Rules
                      </span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {cat.priority.abnormalCriteria.length > 0 && (
                        <div className="rounded-md border border-red-200 bg-red-50/30 p-4">
                          <span className="inline-block rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-semibold text-red-700 uppercase tracking-wider mb-2">
                            Abnormal
                          </span>
                          <ul className="space-y-1">
                            {cat.priority.abnormalCriteria.map((item, i) => (
                              <li key={i} className="text-sm text-gray-700 leading-relaxed flex gap-2">
                                <span className="text-red-300 mt-1.5 shrink-0">&#8226;</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {cat.priority.normalCriteria.length > 0 && (
                        <div className="rounded-md border border-green-200 bg-green-50/30 p-4">
                          <span className="inline-block rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-semibold text-green-700 uppercase tracking-wider mb-2">
                            Normal
                          </span>
                          <ul className="space-y-1">
                            {cat.priority.normalCriteria.map((item, i) => (
                              <li key={i} className="text-sm text-gray-700 leading-relaxed flex gap-2">
                                <span className="text-green-400 mt-1.5 shrink-0">&#8226;</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Critical Values for Lab */}
                    {cat.priority.criticalValues && cat.priority.criticalValues.length > 0 && (
                      <div className="mt-4 rounded-md border border-amber-200 bg-amber-50/50 p-4">
                        <div className="flex items-center gap-1.5 mb-3">
                          <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                            Critical Values
                          </span>
                        </div>
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-amber-200">
                              <th className="text-left py-1.5 pr-4 font-medium text-gray-600 text-xs">Analyte</th>
                              <th className="text-left py-1.5 font-medium text-gray-600 text-xs">Threshold</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cat.priority.criticalValues.map((cv, i) => (
                              <tr key={i} className="border-b border-amber-100 last:border-0">
                                <td className="py-1.5 pr-4 text-gray-900 font-medium font-[family-name:var(--font-jetbrains)] text-xs">{cv.analyte}</td>
                                <td className="py-1.5 text-red-700 font-[family-name:var(--font-jetbrains)] text-xs">{cv.threshold}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* Date Extraction */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-3">
                      <Calendar className="h-3.5 w-3.5 text-gray-400" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Date Extraction Priority
                      </span>
                    </div>
                    <div className="space-y-2">
                      {cat.dateExtraction.map((rule, i) => (
                        <div key={i} className="flex items-start gap-3 rounded-md bg-gray-50 px-4 py-2.5">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-200 text-[10px] font-bold text-gray-600 mt-0.5">
                            {rule.priority}
                          </span>
                          <div>
                            <p className="text-sm text-gray-900 font-medium">{rule.dateField}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{rule.note}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Edge Cases */}
                  {cat.edgeCases.length > 0 && (
                    <div>
                      <div className="flex items-center gap-1.5 mb-3">
                        <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Tricky Scenarios
                        </span>
                      </div>
                      <div className="space-y-2">
                        {cat.edgeCases.map((ec, i) => (
                          <div key={i} className="rounded-md border border-amber-100 bg-amber-50/30 p-4">
                            <p className="text-sm text-gray-900 font-medium mb-1">{ec.scenario}</p>
                            <p className="text-xs text-gray-600 leading-relaxed">
                              <span className="font-semibold text-gray-900">
                                Correct: {categories.find((c) => c.slug === ec.correctCategory)?.name}
                              </span>{" "}
                              — {ec.explanation}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
