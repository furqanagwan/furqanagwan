"use client";

interface CategoryTabProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function CategoryTab({
  label,
  active = false,
  onClick,
}: CategoryTabProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative text-[15px] transition-colors whitespace-nowrap
        ${
          active
            ? "text-[var(--foreground)]"
            : "text-[var(--muted)] hover:text-[var(--foreground)]"
        }
      `}
    >
      {label}
    </button>
  );
}
