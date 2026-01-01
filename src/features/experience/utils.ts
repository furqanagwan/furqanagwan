import { allExperiences } from "content-collections";

export type Experience = (typeof allExperiences)[number];

export interface GroupedExperience {
  company: string;
  location: string;
  image?: string;
  website?: string;
  startDate: string;
  endDate?: string | null;
  roles: Experience[];
}
