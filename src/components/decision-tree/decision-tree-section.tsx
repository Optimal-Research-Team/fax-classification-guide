"use client";

import { useState } from "react";
import { mainDecisionTree, disambiguationFlows } from "@/data/decision-trees";
import { categories } from "@/data/categories";
import { CategoryIcon } from "@/components/categories/category-icon";
import { CategorySlug } from "@/data/types";
import { GitBranch, RotateCcw, ChevronRight, ArrowRight } from "lucide-react";

export function DecisionTreeSection() {
  const [path, setPath] = useState<string[]>(["start"]);

  const currentId = path[path.length - 1];
  const currentNode = mainDecisionTree.find((n) => n.id === currentId);
  const isResult = currentId.startsWith("result-");
  const resultSlug = isResult ? (currentId.replace("result-", "") as CategorySlug) : null;
  const resultCategory = resultSlug ? categories.find((c) => c.slug === resultSlug) : null;

  const goTo = (nextId: string) => setPath((prev) => [...prev, nextId]);
  const goBack = () => { if (path.length > 1) setPath((prev) => prev.slice(0, -1)); };
  const reset = () => setPath(["start"]);

  return (
    <section id="decision-tree" className="py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Decision Tree</h2>
        <p className="text-sm text-gray-500 mb-8">
          Not sure which category? Walk through the decision tree.
        </p>

        {/* Interactive flowchart */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 mb-12">
          {path.length > 1 && (
            <div className="flex items-center gap-1 mb-5 flex-wrap">
              {path.map((nodeId, i) => {
                const node = mainDecisionTree.find((n) => n.id === nodeId);
                const isLast = i === path.length - 1;
                return (
                  <span key={i} className="flex items-center gap-1">
                    {i > 0 && <ChevronRight className="h-3 w-3 text-gray-300" />}
                    <button
                      onClick={() => setPath(path.slice(0, i + 1))}
                      className={`text-xs px-2 py-0.5 rounded ${
                        isLast
                          ? "bg-gray-900 text-white"
                          : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      {node?.id === "start" ? "Start" : node?.id.startsWith("result-") ? node?.question : (node?.question.slice(0, 30) + "...")}
                    </button>
                  </span>
                );
              })}
            </div>
          )}

          {isResult && resultCategory ? (
            <div className="text-center py-6">
              <CategoryIcon slug={resultCategory.slug} className="h-8 w-8 text-gray-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-gray-900 mb-1">{resultCategory.name}</h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto mb-5">{resultCategory.shortDescription}</p>
              <div className="flex items-center justify-center gap-3">
                <button onClick={goBack} className="text-xs text-gray-500 hover:text-gray-900">Go back</button>
                <button onClick={reset} className="inline-flex items-center gap-1.5 rounded-md bg-gray-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-800">
                  <RotateCcw className="h-3 w-3" /> Start over
                </button>
              </div>
            </div>
          ) : currentNode ? (
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <GitBranch className="h-3.5 w-3.5 text-gray-400" />
                <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">Step {path.length}</span>
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-4">{currentNode.question}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {currentNode.options.map((option, i) => (
                  <button key={i} onClick={() => goTo(option.nextId)} className="group text-left rounded-md border border-gray-200 bg-white p-3 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">{option.label}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-gray-300 group-hover:text-gray-500" />
                    </div>
                  </button>
                ))}
              </div>
              {path.length > 1 && (
                <button onClick={goBack} className="mt-3 text-xs text-gray-400 hover:text-gray-700">Go back</button>
              )}
            </div>
          ) : null}
        </div>

        {/* Disambiguation guide */}
        <h3 className="text-base font-bold text-gray-900 mb-4">Quick Disambiguation Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {disambiguationFlows.map((flow) => (
            <div key={flow.id} className="rounded-lg border border-gray-200 p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-0.5">{flow.title}</h4>
              <p className="text-xs text-gray-500 mb-3">{flow.subtitle}</p>
              <ol className="space-y-1.5">
                {flow.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-gray-500 mt-0.5">{i + 1}</span>
                    <span className="text-xs text-gray-600 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
