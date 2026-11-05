export type { Qualification as ContentQualification } from "content-collections";

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
