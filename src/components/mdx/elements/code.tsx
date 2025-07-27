"use client";

import React from "react";

export const InlineCode = (props: React.HTMLAttributes<HTMLElement>) => (
  <code
    className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
    {...props}
  />
);

export const CodeBlock = (props: React.HTMLAttributes<HTMLPreElement>) => (
  <pre
    className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-muted p-4"
    {...props}
  />
);
