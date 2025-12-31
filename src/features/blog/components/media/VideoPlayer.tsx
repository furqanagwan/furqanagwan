"use client";

import React from "react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

export function VideoPlayer({ src, poster, className }: VideoPlayerProps) {
  return (
    <div
      className={`relative aspect-video w-full rounded-xl overflow-hidden bg-black/5 dark:bg-white/5 ${className || ""}`}
    >
      <video
        src={src}
        poster={poster}
        controls
        className="w-full h-full object-cover"
        playsInline
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
