import { allExperiences } from "content-collections";
import { type Experience, type GroupedExperience } from "./utils";

export const getGroupedExperiences = (): GroupedExperience[] => {
  const groupedExperiences = allExperiences.reduce(
    (acc, exp) => {
      if (!acc[exp.company]) {
        acc[exp.company] = [];
      }
      acc[exp.company]!.push(exp);
      return acc;
    },
    {} as Record<string, Experience[]>,
  );

  return Object.values(groupedExperiences)
    .map((roles) => {
      roles.sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
      );

      const startDate = roles[roles.length - 1]!.startDate;

      const isCurrent = roles.some((r) => !r.endDate);
      const endDate = isCurrent ? null : roles[0]!.endDate;

      const firstRole = roles[0]!;

      return {
        company: firstRole.company,
        location: firstRole.location,
        image: firstRole.image,
        website: firstRole.website,
        startDate,
        endDate,
        roles: roles.map((r) => ({
          ...r,
          clients: r.clients,
        })),
      };
    })
    .sort((a, b) => {
      if (!a.endDate && b.endDate) return -1;
      if (a.endDate && !b.endDate) return 1;

      const endA = a.endDate ? new Date(a.endDate).getTime() : Infinity;
      const endB = b.endDate ? new Date(b.endDate).getTime() : Infinity;

      if (endB !== endA) return endB - endA;

      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });
};
