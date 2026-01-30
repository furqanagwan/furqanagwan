import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getGroupedExperiences } from "../queries";
import { ExperienceItem } from "./ExperienceItem";

export function ExperienceTimeline() {
  const sortedGroups = getGroupedExperiences();

  return (
    <div className="px-6 lg:px-10 py-8 max-w-4xl mx-auto">
      {/* Page Title */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight heading-display mb-4">
          Experience
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          A timeline of my professional journey in technology and software
          engineering.
        </p>
      </div>

      {/* Experience Timeline */}
      <div className="space-y-0">
        {sortedGroups.map((group, groupIndex) => (
          <ExperienceItem
            key={group.company}
            group={group}
            index={groupIndex}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <p className="text-muted-foreground mb-6">
          Interested in working together?
        </p>
        <Button className="gap-2" asChild>
          <Link href="/contact">
            Get in touch <ArrowRight size={16} />
          </Link>
        </Button>
      </div>
    </div>
  );
}
