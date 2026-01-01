import { describe, it, expect, vi } from "vitest";
import { getQualificationTypes, getFilteredQualifications } from "./queries";
import { groupQualificationsByType } from "./utils";

// Mock the content-collections module
vi.mock("content-collections", () => ({
  allQualifications: [
    {
      title: "BSc Computer Science",
      institution: "University of Leicester",
      type: "Education",
      date: "2020-06",
    },
    {
      title: "AWS Solutions Architect",
      institution: "Amazon",
      type: "Certification",
      date: "2022-03",
    },
    {
      title: "A-Levels",
      institution: "College",
      type: "Education",
      date: "2017-06",
    },
  ],
}));

describe("getQualificationTypes", () => {
  it("returns All plus unique types", () => {
    const types = getQualificationTypes();
    expect(types).toContain("All");
    expect(types).toContain("Education");
    expect(types).toContain("Certification");
    expect(types).toHaveLength(3);
  });
});

describe("getFilteredQualifications", () => {
  it("returns all qualifications for 'All' type", () => {
    const all = getFilteredQualifications("All");
    expect(all).toHaveLength(3);
  });

  it("filters by specific type", () => {
    const education = getFilteredQualifications("Education");
    expect(education).toHaveLength(2);
    expect(education.every((q) => q.type === "Education")).toBe(true);
  });
});

describe("groupQualificationsByType", () => {
  it("groups qualifications by type", () => {
    const all = getFilteredQualifications("All");
    const grouped = groupQualificationsByType(all);
    expect(Object.keys(grouped)).toContain("Education");
    expect(Object.keys(grouped)).toContain("Certification");
    expect(grouped["Education"]).toHaveLength(2);
    expect(grouped["Certification"]).toHaveLength(1);
  });
});
