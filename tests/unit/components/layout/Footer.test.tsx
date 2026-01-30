import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "@/components/layout/Footer";

describe("Footer", () => {
  it("renders links and copyright", () => {
    render(<Footer />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getByLabelText("GitHub")).toBeInTheDocument();
    expect(screen.getByText(/Furqan Agwan © 2015/)).toBeInTheDocument();
  });
});
