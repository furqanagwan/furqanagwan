"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageSwitcherItem {
  label: string;
  src: string;
  alt?: string;
}

interface ImageSwitcherProps {
  items: ImageSwitcherItem[];
  className?: string;
}

export function ImageSwitcher({ items, className }: ImageSwitcherProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items || items.length === 0) return null;

  const activeItem = items[activeIndex];
  if (!activeItem) return null;

  return (
    <div className={cn("my-12 scroll-mt-20", className)}>
      {/* Scrollable Pills Navigation */}
      <div className="flex overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        <div className="flex gap-2">
          {items.map((item, index) => (
            <button
              key={item.label}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                activeIndex === index
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-black/5 text-black/60 hover:bg-black/10 dark:bg-white/5 dark:text-white/60 dark:hover:bg-white/10",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Image Display */}
      <div className="relative mt-6 rounded-xl overflow-hidden bg-muted aspect-[16/10] animate-in fade-in duration-300">
        <Image
          src={activeItem.src}
          alt={activeItem.alt || activeItem.label}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          key={activeItem.src} // Force re-render for animation
        />
      </div>

      {/* Caption if provided */}
      {activeItem.alt && (
        <p className="mt-3 text-center text-sm text-muted-foreground">
          {activeItem.alt}
        </p>
      )}
    </div>
  );
}
