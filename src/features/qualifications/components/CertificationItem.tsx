"use client";

import Image from "next/image";
import { Briefcase } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";

interface Certification {
    name: string;
    code: string;
    description: string;
    issuer: string;
    date: string;
}

interface CertificationItemProps {
    cert: Certification;
    index: number;
}

// Map issuer to brand domain for logo fetching
const issuerDomains: Record<string, string> = {
    Microsoft: "microsoft.com",
    Google: "google.com",
    Amazon: "amazon.com",
    AWS: "aws.amazon.com",
    Oracle: "oracle.com",
    Cisco: "cisco.com",
    CompTIA: "comptia.org",
    Salesforce: "salesforce.com",
};

// Map issuer to local logo image path (fallback when Brandfetch fails)
const issuerLocalLogos: Record<string, string> = {
    Microsoft: "/images/certifications/microsoft.svg",
};

/**
 * Professional certification item component that displays issuer logo,
 * certification name, code, description, and date.
 */
export function CertificationItem({ cert, index }: CertificationItemProps) {
    const className =
        "group block relative py-6 border-b border-black/15 dark:border-white/15 last:border-b-0 hover:border-black dark:hover:border-white transition-colors animate-fade-in text-left";
    const style = {
        animationDelay: `${index * 0.1}s`,
        opacity: 0,
    } as React.CSSProperties;

    const brandDomain = issuerDomains[cert.issuer];
    const localLogo = issuerLocalLogos[cert.issuer];

    return (
        <div className={className} style={style}>
            <div className="flex gap-4">
                {/* Left - Logo */}
                <div className="flex-shrink-0">
                    <div className="rounded-lg overflow-hidden border border-border bg-white w-14 h-14 flex items-center justify-center p-1">
                        <BrandLogo
                            name={cert.issuer}
                            brandDomain={brandDomain}
                            className="w-full h-full"
                            fallback={
                                localLogo ? (
                                    <Image
                                        src={localLogo}
                                        alt={`${cert.issuer} logo`}
                                        width={56}
                                        height={56}
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                                        <Briefcase size={24} />
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
                                {cert.name}
                            </h3>
                            <p className="text-muted-foreground text-[15px] mt-0.5">
                                {cert.issuer} · {cert.code}
                            </p>
                            {cert.description && (
                                <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                                    {cert.description}
                                </p>
                            )}
                        </div>
                        <span className="text-muted-foreground text-sm whitespace-nowrap flex-shrink-0">
                            {cert.date}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
