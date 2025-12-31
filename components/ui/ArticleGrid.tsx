"use client";

import { ReactNode } from "react";

interface ArticleGridProps {
  children: ReactNode;
  viewMode?: "grid" | "list";
}

export default function ArticleGrid({
  children,
  viewMode = "grid",
}: ArticleGridProps) {
  return (
    <div
      className={`
        ${
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "flex flex-col gap-4"
        }
      `}
    >
      {children}
    </div>
  );
}
