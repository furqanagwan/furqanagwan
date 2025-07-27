"use client";

import { Separator as UISeparator } from "@/components/ui/separator";
import type { HTMLAttributes } from "react";

export const Separator = (props: HTMLAttributes<HTMLDivElement>) => (
  <UISeparator className="my-4" {...props} />
);
