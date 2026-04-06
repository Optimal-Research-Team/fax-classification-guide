export type CategorySlug =
  | "consult"
  | "imaging"
  | "radiology"
  | "lab"
  | "pathology"
  | "prescription"
  | "insurance"
  | "legal"
  | "oldchart"
  | "photo"
  | "junk"
  | "others";

export interface Category {
  slug: CategorySlug;
  name: string;
  shortDescription: string;
  definition: string;
  belongsHere: string[];
  doesNotBelong: string[];
  priority: PriorityRules;
  dateExtraction: DateRule[];
  edgeCases: EdgeCase[];
  color: string;
}

export interface PriorityRules {
  normalCriteria: string[];
  abnormalCriteria: string[];
  criticalValues?: CriticalValue[];
}

export interface CriticalValue {
  analyte: string;
  threshold: string;
  direction: "above" | "below";
}

export interface DateRule {
  priority: number;
  dateField: string;
  note: string;
}

export interface EdgeCase {
  scenario: string;
  correctCategory: CategorySlug;
  explanation: string;
}

export interface DecisionNode {
  id: string;
  question: string;
  options: { label: string; nextId: string }[];
}

export interface Mistake {
  id: string;
  doText: string;
  dontText: string;
  category: string;
  severity: "high" | "medium" | "low";
}
