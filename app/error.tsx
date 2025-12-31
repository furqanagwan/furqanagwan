"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
      <h1 className="text-6xl font-bold mb-4 heading-display">Oops!</h1>
      <p className="text-xl text-muted-foreground mb-8 text-center">
        Something went wrong. Please try again.
      </p>
      <Button onClick={reset}>Try Again</Button>
    </div>
  );
}
