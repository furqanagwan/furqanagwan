"use client";

import React from "react";

export const HorizontalRule = () => <hr className="my-8" />;

export const LinkText = (
  props: React.AnchorHTMLAttributes<HTMLAnchorElement>,
) => (
  <a
    className="font-medium underline underline-offset-4 hover:text-primary"
    {...props}
  />
);
