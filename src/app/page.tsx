import { SiteHeader } from "@/components/layout/site-header";
import { HeroSection } from "@/components/hero/hero-section";
import { CategoryBentoGrid } from "@/components/categories/category-bento-grid";
import { CategoryDetailSection } from "@/components/categories/category-detail-section";
import { DecisionTreeSection } from "@/components/decision-tree/decision-tree-section";
import { PrioritySection } from "@/components/priority/priority-section";
import { MistakesSection } from "@/components/mistakes/mistakes-section";
import { DateRulesSection } from "@/components/date-rules/date-rules-section";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <CategoryBentoGrid />
        <CategoryDetailSection />
        <DecisionTreeSection />
        <PrioritySection />
        <MistakesSection />
        <DateRulesSection />

        {/* Footer */}
        <footer className="border-t border-gray-200 py-8 px-4 sm:px-6">
          <div className="mx-auto max-w-5xl flex items-center justify-between">
            <p className="text-xs text-gray-400">
              beOptimal — Internal Reference Guide
            </p>
            <p className="text-xs text-gray-400">
              Last updated: April 2026
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
