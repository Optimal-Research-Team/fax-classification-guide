"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mainDecisionTree, disambiguationFlows } from "@/data/decision-trees";
import { categories } from "@/data/categories";
import { CategoryIcon } from "@/components/categories/category-icon";
import { CategorySlug } from "@/data/types";
import {
  GitBranch,
  RotateCcw,
  ChevronRight,
  ArrowRight,
  Zap,
} from "lucide-react";

export function DecisionTreeSection() {
  const [path, setPath] = useState<string[]>(["start"]);

  const currentId = path[path.length - 1];
  const currentNode = mainDecisionTree.find((n) => n.id === currentId);
  const isResult = currentId.startsWith("result-");
  const resultSlug = isResult ? currentId.replace("result-", "") as CategorySlug : null;
  const resultCategory = resultSlug ? categories.find((c) => c.slug === resultSlug) : null;

  const goTo = (nextId: string) => {
    setPath((prev) => [...prev, nextId]);
  };

  const goBack = () => {
    if (path.length > 1) {
      setPath((prev) => prev.slice(0, -1));
    }
  };

  const reset = () => setPath(["start"]);

  return (
    <section id="decision-tree" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Decision Tree
          </h2>
          <p className="text-[#c5d5b5]/70 max-w-2xl">
            Not sure which category? Walk through the decision tree to find the
            right classification.
          </p>
        </motion.div>

        {/* Interactive flowchart */}
        <div className="rounded-xl border border-[#4a7c4a]/10 bg-[#1a2e1a]/30 p-6 mb-12">
          {/* Breadcrumb path */}
          {path.length > 1 && (
            <div className="flex items-center gap-1 mb-6 flex-wrap">
              {path.map((nodeId, i) => {
                const node = mainDecisionTree.find((n) => n.id === nodeId);
                const isLast = i === path.length - 1;
                return (
                  <span key={i} className="flex items-center gap-1">
                    {i > 0 && (
                      <ChevronRight className="h-3 w-3 text-[#6b9e6b]/30" />
                    )}
                    <button
                      onClick={() => setPath(path.slice(0, i + 1))}
                      className={`text-xs px-2 py-0.5 rounded ${
                        isLast
                          ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                          : "text-[#8ab89a]/50 hover:text-[#dde8d3]"
                      }`}
                    >
                      {node?.id === "start"
                        ? "Start"
                        : node?.id.startsWith("result-")
                        ? node?.question
                        : node?.question.slice(0, 30) + "..."}
                    </button>
                  </span>
                );
              })}
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {isResult && resultCategory ? (
                /* Result card */
                <div className="text-center py-8">
                  <div
                    className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[#4a7c4a]/10 mb-4"
                    style={{ backgroundColor: `${resultCategory.color}15` }}
                  >
                    <CategoryIcon
                      slug={resultCategory.slug}
                      className="h-8 w-8"
                    />
                  </div>
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{ color: resultCategory.color }}
                  >
                    {resultCategory.name}
                  </h3>
                  <p className="text-sm text-[#c5d5b5]/70 max-w-md mx-auto mb-6">
                    {resultCategory.shortDescription}
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={goBack}
                      className="inline-flex items-center gap-1.5 text-xs text-[#c5d5b5]/70 hover:text-[#e8f0e8] transition-colors"
                    >
                      Go back
                    </button>
                    <button
                      onClick={reset}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 px-4 py-2 text-xs font-medium text-blue-400 hover:bg-blue-500/20 transition-colors"
                    >
                      <RotateCcw className="h-3 w-3" />
                      Start over
                    </button>
                  </div>
                </div>
              ) : currentNode ? (
                /* Question card */
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <GitBranch className="h-4 w-4 text-blue-400" />
                    <span className="text-xs text-[#8ab89a]/50 uppercase tracking-wider font-medium">
                      Step {path.length}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#e8f0e8] mb-6">
                    {currentNode.question}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {currentNode.options.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(option.nextId)}
                        className="group text-left rounded-lg border border-[#4a7c4a]/10 bg-[#c5d5b5]/[0.03] p-4 hover:bg-[#c5d5b5]/[0.06] hover:border-[#4a7c4a]/20 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] text-[#dde8d3] group-hover:text-[#e8f0e8] transition-colors">
                            {option.label}
                          </span>
                          <ArrowRight className="h-3.5 w-3.5 text-[#6b9e6b]/30 group-hover:text-blue-400 transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>
                  {path.length > 1 && (
                    <button
                      onClick={goBack}
                      className="mt-4 text-xs text-[#8ab89a]/50 hover:text-[#dde8d3] transition-colors"
                    >
                      Go back
                    </button>
                  )}
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Disambiguation quick reference */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Zap className="h-4 w-4 text-amber-400" />
            <h3 className="text-lg font-semibold">
              Quick Disambiguation Guide
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {disambiguationFlows.map((flow) => (
              <div
                key={flow.id}
                className="rounded-xl border border-[#4a7c4a]/10 bg-[#1a2e1a]/30 p-5"
              >
                <h4 className="text-[15px] font-semibold text-[#e8f0e8] mb-1">
                  {flow.title}
                </h4>
                <p className="text-[12px] text-[#8ab89a]/50 mb-4">
                  {flow.subtitle}
                </p>
                <ol className="space-y-2">
                  {flow.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c5d5b5]/[0.06] text-[10px] font-bold text-[#8ab89a]/50 mt-0.5">
                        {i + 1}
                      </div>
                      <span className="text-[13px] text-[#c5d5b5]/70 leading-relaxed">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
