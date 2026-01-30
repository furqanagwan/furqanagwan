// Re-export types from content-collections for feature consistency
export type { Experience as ContentExperience } from "content-collections";

// Experience-specific types
export interface GroupedExperience {
  company: string;
  location: string;
  image?: string;
  startDate: string;
  endDate?: string | null;
  roles: ExperienceRole[];
}

export interface ExperienceRole {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string | null;
  description: string;
  image?: string;
  clients?: {
    name: string;
    domain: string;
    location: string;
  }[];
}
