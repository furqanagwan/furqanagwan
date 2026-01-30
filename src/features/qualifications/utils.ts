import { allQualifications } from "content-collections";

export type Qualification = (typeof allQualifications)[number];

export const groupQualificationsByType = (qualifications: Qualification[]) => {
  const groups: { [key: string]: Qualification[] } = {};
  qualifications.forEach((q) => {
    if (!groups[q.type]) groups[q.type] = [];
    groups[q.type]!.push(q);
  });
  return groups;
};
