"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getBrandDomain } from "@/lib/utils";

interface BrandLogoProps {
  brandDomain?: string;
  productLink?: string;
  appleLink?: string;
  androidLink?: string;
  className?: string;
  name: string;
  fallback: React.ReactNode;
}

export function BrandLogo({
  brandDomain,
  productLink,
  appleLink,
  androidLink,
  className,
  name,
  fallback,
}: BrandLogoProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false); // Reset error state on prop change
    let domain = brandDomain;

    if (!domain) {
      if (productLink) domain = getBrandDomain(productLink) || undefined;
      else if (appleLink) domain = getBrandDomain(appleLink) || undefined;
      else if (androidLink) domain = getBrandDomain(androidLink) || undefined;
    }

    if (domain) {
      const clientId = process.env.NEXT_PUBLIC_BRANDFETCH_CLIENT_ID;
      setImgSrc(
        `https://cdn.brandfetch.io/${domain}/w/100/h/100?c=${clientId}`,
      );
    } else {
      setHasError(true);
    }
  }, [brandDomain, productLink, appleLink, androidLink]);

  if (hasError || !imgSrc) {
    return <>{fallback}</>;
  }

  return (
    <div className={`relative overflow-hidden rounded-md ${className}`}>
      <Image
        key={imgSrc} // Force re-mount when src changes
        src={imgSrc}
        alt={`${name} logo`}
        width={64}
        height={64}
        className="object-contain w-full h-full"
        unoptimized
        onError={() => setHasError(true)}
      />
    </div>
  );
}
