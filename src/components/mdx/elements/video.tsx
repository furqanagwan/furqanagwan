"use client";

import React from "react";

export const MDXVideo = (
  props: React.VideoHTMLAttributes<HTMLVideoElement>,
) => {
  return (
    <video className="my-6 w-full rounded-lg shadow-md" controls {...props}>
      Your browser does not support the video tag.
    </video>
  );
};
