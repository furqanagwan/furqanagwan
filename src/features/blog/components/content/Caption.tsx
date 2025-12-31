import { cn } from "@/lib/utils";

interface CaptionProps {
  children: React.ReactNode;
  className?: string;
}

export function Caption({ children, className }: CaptionProps) {
  return (
    <p
      className={cn(
        "text-center text-sm text-muted-foreground mt-3 mb-10 w-full",
        className,
      )}
    >
      {children}
    </p>
  );
}
