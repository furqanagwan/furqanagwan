"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    type?: "single" | "multiple";
    collapsible?: boolean;
  }
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-1", className)} {...props} />
));
Accordion.displayName = "Accordion";

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <button
      ref={ref}
      onClick={() => setIsOpen(!isOpen)}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </button>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up",
      className,
    )}
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </div>
));
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
