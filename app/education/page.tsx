"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { allQualifications } from "content-collections";

export default function EducationPage() {
  // Filter for Education items only
  const educationItems = useMemo(() => {
    return allQualifications
      .filter((q) => q.type === "Education")
      .sort((a, b) => {
        // Sort by date descending (assuming simple year strings or ranges)
        // Extract the last year in the string for sorting
        const getYear = (dateStr: string) => {
          const matches = dateStr.match(/(\d{4})/g);
          return matches ? parseInt(matches[matches.length - 1]) : 0;
        };
        return getYear(b.date) - getYear(a.date);
      });
  }, []);

  return (
    <div className="px-6 lg:px-10 py-8 max-w-4xl mx-auto">
      {/* Page Title */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight heading-display mb-4">
          Education
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          My academic journey and educational background.
        </p>
      </div>

      {/* Education List */}
      <div className="space-y-0">
        {educationItems.length > 0 ? (
          educationItems.map((edu, index) => {
            const Container = edu.link ? Link : "div";
            return (
              <Container
                key={`${edu.title}-${index}`}
                href={edu.link || ""}
                target={edu.link ? "_blank" : undefined}
                rel={edu.link ? "noopener noreferrer" : undefined}
                className="group block relative py-8 border-b border-black/15 dark:border-white/15 last:border-b-0 hover:border-black dark:hover:border-white transition-colors animate-fade-in text-left"
                style={
                  {
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0,
                  } as React.CSSProperties
                }
              >
                <div className="grid md:grid-cols-4 gap-6 md:gap-10">
                  {/* Left - Icon & Date */}
                  <div className="md:col-span-1 flex flex-col gap-2">
                    {edu.image ? (
                      <div className="mb-3 rounded-lg overflow-hidden border border-border bg-white w-16 h-16 flex items-center justify-center p-1">
                        <Image
                          src={edu.image}
                          alt={`${edu.institution} logo`}
                          width={64}
                          height={64}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <GraduationCap size={18} />
                      </div>
                    )}
                    <div
                      className={`flex items-center gap-2 text-muted-foreground mb-1 ${edu.image ? "" : "-mt-1"}`}
                    >
                      <span className="text-[13px] font-medium">
                        {edu.date}
                      </span>
                    </div>
                  </div>

                  {/* Right - Content (only where I studied) */}
                  <div className="md:col-span-3">
                    <h3 className="text-xl font-semibold group-hover:opacity-70 transition-opacity">
                      {edu.institution}
                    </h3>
                    {/* Simplified: Removed Visit Website button, entire card is now clickable */}
                    <div className="mt-1">
                      {/* Optional: we could put something else here if needed */}
                    </div>
                  </div>
                </div>
              </Container>
            );
          })
        ) : (
          <div className="text-center py-20 border-t border-border">
            <p className="text-muted-foreground">No education entries found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
