import { allExperiences } from "content-collections";

export type Experience = (typeof allExperiences)[number];

export interface GroupedExperience {
  company: string;
  location: string;
  image?: string;
  startDate: string;
  endDate?: string | null;
  roles: Experience[];
}

export const getGroupedExperiences = (): GroupedExperience[] => {
  // Group experiences by company
  const groupedExperiences = allExperiences.reduce(
    (acc, exp) => {
      if (!acc[exp.company]) {
        acc[exp.company] = [];
      }
      acc[exp.company].push(exp);
      return acc;
    },
    {} as Record<string, Experience[]>,
  );

  // Transform to array and sort
  return Object.values(groupedExperiences)
    .map((roles) => {
      // Sort roles by start date descending (latest first)
      roles.sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
      );

      // Earliest start date is from the last role (chronologically first)
      const startDate = roles[roles.length - 1].startDate;

      // Latest end date is from the first role (chronologically last)
      const isCurrent = roles.some((r) => !r.endDate);
      const endDate = isCurrent ? null : roles[0].endDate;

      const firstRole = roles[0];

      return {
        company: firstRole.company,
        location: firstRole.location,
        image: firstRole.image,
        startDate,
        endDate,
        roles,
      };
    })
    .sort((a, b) => {
      // Sort groups by end date descending (Present comes first)
      if (!a.endDate && b.endDate) return -1;
      if (a.endDate && !b.endDate) return 1;

      const endA = a.endDate ? new Date(a.endDate).getTime() : Infinity;
      const endB = b.endDate ? new Date(b.endDate).getTime() : Infinity;

      if (endB !== endA) return endB - endA;

      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });
};
