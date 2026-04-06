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
        <footer className="border-t border-[#4a7c4a]/10 py-8 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl flex items-center justify-between">
            <p className="text-xs text-[#6b9e6b]/40">
              beOptimal — Internal Reference Guide
            </p>
            <p className="text-xs text-[#6b9e6b]/30">
              Last updated: April 2026
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
