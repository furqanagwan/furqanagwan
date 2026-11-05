import { describe, it, expect } from "vitest";
import {
  formatTicketId,
  nextTicketId,
  parseFrontmatter,
  parseTicketNumber,
  renderTicket,
  slugify,
} from "../../../scripts/ticket";

describe("ticket IDs", () => {
  it("zero-pads to four digits", () => {
    expect(formatTicketId(1)).toBe("FUR-0001");
    expect(formatTicketId(42)).toBe("FUR-0042");
    expect(formatTicketId(12345)).toBe("FUR-12345");
  });

  it("reads the number from IDs and file names", () => {
    expect(parseTicketNumber("FUR-0007")).toBe(7);
    expect(parseTicketNumber("FUR-0012-fix-footer.md")).toBe(12);
    expect(parseTicketNumber("README.md")).toBeNull();
  });

  it("increments from the highest existing ticket", () => {
    expect(nextTicketId([])).toBe("FUR-0001");
    expect(nextTicketId(["README.md", "FUR-0001-a.md", "FUR-0003-b.md"])).toBe("FUR-0004");
  });
});

describe("slugify", () => {
  it("makes short, safe file names", () => {
    expect(slugify("Fix the Log In button!")).toBe("fix-the-log-in-button");
    expect(slugify("  CI: pin Ubuntu 24.04  ")).toBe("ci-pin-ubuntu-24-04");
    expect(slugify("a".repeat(80))).toHaveLength(60);
  });
});

describe("frontmatter", () => {
  it("round-trips the fields of a rendered ticket", () => {
    const text = renderTicket({
      id: "FUR-0009",
      title: "Something: with a colon",
      type: "bug",
      status: "backlog",
      priority: "P1",
      created: "2026-11-05",
    });
    expect(parseFrontmatter(text)).toEqual({
      id: "FUR-0009",
      title: "Something: with a colon",
      type: "bug",
      status: "backlog",
      priority: "P1",
      created: "2026-11-05",
    });
  });

  it("returns nothing when there is no frontmatter", () => {
    expect(parseFrontmatter("# Just a heading")).toEqual({});
  });
});
