"use client";

import React from "react";

export const Paragraph = (
  props: React.HTMLAttributes<HTMLParagraphElement>,
) => <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />;

export const Blockquote = (props: React.HTMLAttributes<HTMLQuoteElement>) => (
  <blockquote
    className="mt-6 border-l-2 pl-6 italic text-muted-foreground"
    {...props}
  />
);

export const Muted = (props: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className="text-muted-foreground text-sm" {...props} />
);

export const Small = (props: React.HTMLAttributes<HTMLElement>) => (
  <small className="text-sm font-medium leading-none" {...props} />
);

export const Large = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="text-lg font-semibold" {...props} />
);

export const Lead = (props: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className="text-xl text-muted-foreground" {...props} />
);
