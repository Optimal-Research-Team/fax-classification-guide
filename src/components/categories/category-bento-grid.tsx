"use client";

import { categories } from "@/data/categories";
import { CategoryIcon } from "./category-icon";

export function CategoryBentoGrid() {
  return (
    <section id="categories" className="py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Document Categories
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          13 categories for classifying incoming faxes. Click any category to expand its full rules.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={`#cat-${cat.slug}`}
              className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <CategoryIcon slug={cat.slug} className="h-4 w-4 text-gray-400 shrink-0" />
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-gray-900">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-500 truncate">
                  {cat.shortDescription}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
