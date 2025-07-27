"use client";

import React from "react";

export const H1 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1
    className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance"
    {...props}
  />
);

export const H2 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
    {...props}
  />
);

export const H3 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className="scroll-m-20 text-2xl font-semibold tracking-tight"
    {...props}
  />
);

export const H4 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight" {...props} />
);
