"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface GridImage {
  src: string;
  alt?: string;
  caption?: string;
}

interface ImageGridProps {
  images: GridImage[];
  columns?: 2 | 3;
  className?: string;
}

export function ImageGrid({ images, columns = 2, className }: ImageGridProps) {
  return (
    <div className={cn("my-12", className)}>
      <div
        className={cn(
          "grid gap-4 md:gap-6",
          columns === 2
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1 md:grid-cols-3",
        )}
      >
        {images.map((image, index) => (
          <div key={index} className="flex flex-col">
            <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-muted">
              <Image
                src={image.src}
                alt={image.alt || `Image ${index + 1}`}
                fill
                className="object-cover"
                sizes={`(max-width: 768px) 100vw, ${100 / columns}vw`}
              />
            </div>
            {image.caption && (
              <p className="mt-3 text-sm text-muted-foreground">
                {image.caption}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
