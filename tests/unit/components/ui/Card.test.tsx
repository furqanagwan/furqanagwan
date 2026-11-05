import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/Card";

describe("Card", () => {
  it("renders complete card structure", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>Action</CardAction>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );

    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.getByText("Card Description")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("applies custom utility classes", () => {
    render(<Card className="bg-red-500">Test</Card>);
    expect(screen.getByText("Test")).toHaveClass("bg-red-500");
  });
});
