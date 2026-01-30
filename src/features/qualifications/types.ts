// Re-export types from content-collections for feature consistency
export type { Qualification as ContentQualification } from "content-collections";

// Qualification-specific types
export interface QualificationGroup {
  type: string;
  qualifications: QualificationItem[];
}

export interface QualificationItem {
  title: string;
  institution: string;
  type: string;
  date: string;
  description?: string;
  image?: string;
}
