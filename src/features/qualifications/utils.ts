import { allQualifications } from "content-collections";

export type Qualification = (typeof allQualifications)[number];

export const getQualificationTypes = () => {
  const uniqueTypes = new Set(allQualifications.map((q) => q.type));
  return ["All", ...Array.from(uniqueTypes)];
};

export const getFilteredQualifications = (activeType: string) => {
  if (activeType === "All") return allQualifications;
  return allQualifications.filter((q) => q.type === activeType);
};

export const groupQualificationsByType = (qualifications: Qualification[]) => {
  const groups: { [key: string]: Qualification[] } = {};
  qualifications.forEach((q) => {
    if (!groups[q.type]) groups[q.type] = [];
    groups[q.type].push(q);
  });
  return groups;
};
