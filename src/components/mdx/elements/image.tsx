"use client";

import Image from "next/image";
import React from "react";

export const MDXImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <Image
    alt={props.alt || ""}
    src={props.src || ""}
    width={720}
    height={405}
    className="my-4 rounded-md"
  />
);
