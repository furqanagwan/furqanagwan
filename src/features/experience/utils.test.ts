import { describe, it, expect, vi } from "vitest";
import { getGroupedExperiences } from "./queries";

// Mock the content-collections module
vi.mock("content-collections", () => ({
  allExperiences: [
    {
      role: "Software Engineer",
      company: "TechCorp",
      location: "London, UK",
      startDate: "2022-01",
      endDate: "2023-06",
      description: "Built features",
      image: "/tech.png",
    },
    {
      role: "Senior Software Engineer",
      company: "TechCorp",
      location: "London, UK",
      startDate: "2023-06",
      endDate: null,
      description: "Leading team",
      image: "/tech.png",
    },
    {
      role: "Junior Developer",
      company: "StartupCo",
      location: "Manchester, UK",
      startDate: "2020-01",
      endDate: "2021-12",
      description: "Learning",
      image: "/startup.png",
    },
  ],
}));

describe("getGroupedExperiences", () => {
  it("groups experiences by company", () => {
    const grouped = getGroupedExperiences();
    expect(grouped).toHaveLength(2);
  });

  it("sorts roles within company by date (newest first)", () => {
    const grouped = getGroupedExperiences();
    const techCorp = grouped.find((g) => g.company === "TechCorp");
    expect(techCorp?.roles[0].role).toBe("Senior Software Engineer");
    expect(techCorp?.roles[1].role).toBe("Software Engineer");
  });

  it("puts current roles (no endDate) first", () => {
    const grouped = getGroupedExperiences();
    expect(grouped[0].endDate).toBeNull();
  });

  it("uses earliest startDate for group", () => {
    const grouped = getGroupedExperiences();
    const techCorp = grouped.find((g) => g.company === "TechCorp");
    expect(techCorp?.startDate).toBe("2022-01");
  });
});
