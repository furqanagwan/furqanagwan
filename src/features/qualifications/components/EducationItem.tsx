"use client";

import Image from "next/image";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { MDXContent } from "@content-collections/mdx/react";
import type { Qualification } from "../utils";

interface EducationItemProps {
    qual: Qualification;
    index: number;
}

/**
 * Enhanced education item component that displays institution logos,
 * dates, titles, descriptions, and MDX content.
 */
export function EducationItem({ qual, index }: EducationItemProps) {
    const className =
        "group block relative py-6 border-b border-black/15 dark:border-white/15 last:border-b-0 hover:border-black dark:hover:border-white transition-colors animate-fade-in text-left";
    const style = {
        animationDelay: `${index * 0.1}s`,
        opacity: 0,
    } as React.CSSProperties;

    const content = (
        <div className="flex gap-4">
            {/* Left - Logo */}
            <div className="flex-shrink-0">
                <div className="rounded-lg overflow-hidden border border-border bg-white w-14 h-14 flex items-center justify-center p-1">
                    <BrandLogo
                        name={qual.institution}
                        productLink={qual.useLocalLogo ? undefined : qual.link}
                        brandDomain={qual.useLocalLogo ? undefined : qual.brandDomain}
                        className="w-full h-full"
                        fallback={
                            qual.image ? (
                                <Image
                                    src={qual.image}
                                    alt={`${qual.institution} logo`}
                                    width={56}
                                    height={56}
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                                    <GraduationCap size={24} />
                                </div>
                            )
                        }
                    />
                </div>
            </div>

            {/* Right - Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold group-hover:opacity-70 transition-opacity">
                            {qual.title}
                        </h3>
                        <p className="text-muted-foreground text-[15px] mt-0.5">
                            {qual.institution}
                        </p>
                        {qual.description && (
                            <p className="text-muted-foreground text-sm mt-1">
                                {qual.description}
                            </p>
                        )}
                    </div>
                    <span className="text-muted-foreground text-sm whitespace-nowrap flex-shrink-0">
                        {qual.date}
                    </span>
                </div>
                {qual.mdx && (
                    <div className="mt-3 text-sm text-muted-foreground prose dark:prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-ul:my-2 prose-li:my-0">
                        <MDXContent code={qual.mdx} />
                    </div>
                )}
            </div>
        </div>
    );

    if (qual.link) {
        return (
            <Link
                href={qual.link}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                style={style}
            >
                {content}
            </Link>
        );
    }

    return (
        <div className={className} style={style}>
            {content}
        </div>
    );
}
