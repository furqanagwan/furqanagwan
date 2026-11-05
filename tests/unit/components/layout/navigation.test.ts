import { describe, it, expect } from "vitest";
import {
  NAV_SECTIONS,
  isActivePath,
  isSectionActive,
} from "@/components/layout/navigation";

describe("isActivePath", () => {
  it("only marks Home active on the home page", () => {
    expect(isActivePath("/", "/")).toBe(true);
    expect(isActivePath("/blog", "/")).toBe(false);
  });

  it("marks a page and its sub-pages active", () => {
    expect(isActivePath("/blog", "/blog")).toBe(true);
    expect(isActivePath("/blog/my-post", "/blog")).toBe(true);
  });

  it("does not match pages that merely share a prefix", () => {
    expect(isActivePath("/blogroll", "/blog")).toBe(false);
  });
});

describe("isSectionActive", () => {
  const work = NAV_SECTIONS.find((s) => s.label === "Work")!;
  const blog = NAV_SECTIONS.find((s) => s.label === "Blog")!;

  it("is active when one of its links is the current page", () => {
    expect(isSectionActive("/projects", work)).toBe(true);
    expect(isSectionActive("/qualifications", work)).toBe(false);
  });

  it("is active for a top-level link", () => {
    expect(isSectionActive("/blog/post", blog)).toBe(true);
  });

  it("is inactive for a section with neither a link nor items", () => {
    expect(isSectionActive("/", { label: "Empty" })).toBe(false);
  });
});
