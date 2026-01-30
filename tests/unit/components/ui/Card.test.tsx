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
    // We check usage of data-slot or just class presence on container
    // The component uses data-slot="card"
    // However, finding by text "Test" gets the container if text is direct child?
    // Let's use a standard getByText for simplicity as the text is inside
    // OR we can rely on DOM node checks.
    // Usually easier to check if the element wrapping 'Test' has the class
    // But Card wraps children in a div with the class.
    // screen.getByText("Test") returns the text node? No, the element containing it.
    // If <div ...>Test</div>, getByText("Test") returns the div.
    expect(screen.getByText("Test")).toHaveClass("bg-red-500");
  });
});
