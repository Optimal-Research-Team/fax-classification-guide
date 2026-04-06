import {
  Send,
  Stethoscope,
  Heart,
  ScanLine,
  TestTube,
  Microscope,
  Pill,
  Shield,
  Scale,
  FolderArchive,
  Camera,
  Trash2,
  FileQuestion,
} from "lucide-react";
import { CategorySlug } from "@/data/types";

const iconMap: Record<CategorySlug, React.ElementType> = {
  referral: Send,
  consult: Stethoscope,
  imaging: Heart,
  radiology: ScanLine,
  lab: TestTube,
  pathology: Microscope,
  prescription: Pill,
  insurance: Shield,
  legal: Scale,
  oldchart: FolderArchive,
  photo: Camera,
  junk: Trash2,
  others: FileQuestion,
};

export function CategoryIcon({
  slug,
  className = "h-5 w-5",
}: {
  slug: CategorySlug;
  className?: string;
}) {
  const Icon = iconMap[slug];
  return <Icon className={className} />;
}
