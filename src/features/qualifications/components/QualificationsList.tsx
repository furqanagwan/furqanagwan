"use client";

import { useState, useMemo } from "react";
import { GraduationCap, Award, BadgeCheck, Briefcase } from "lucide-react";
import { getQualificationTypes, getFilteredQualifications } from "../queries";
import { groupQualificationsByType } from "../utils";
import { QualificationItem } from "./QualificationItem";
import PostListItem from "@/components/ui/PostListItem";

const typeIcons = {
  Education: GraduationCap,
  Certification: BadgeCheck,
  Professional: Briefcase,
  Award: Award,
};

// Professional certifications data
const professionalCertifications = [
  {
    name: "Microsoft Azure DevOps Engineer Expert",
    code: "AZ-400",
    description:
      "Designing and implementing strategies for collaboration, code, infrastructure, source control, security, compliance, continuous integration, testing, delivery, monitoring, and feedback.",
    issuer: "Microsoft",
    date: "2024",
  },
  {
    name: "Microsoft Azure Administrator",
    code: "AZ-104",
    description:
      "Implementing, managing, and monitoring identity, governance, storage, compute, and virtual networks in a cloud environment.",
    issuer: "Microsoft",
    date: "2024",
  },
  {
    name: "Microsoft Azure Fundamentals",
    code: "AZ-900",
    description:
      "Foundational knowledge of cloud services and how those services are provided with Microsoft Azure.",
    issuer: "Microsoft",
    date: "2023",
  },
];

export function QualificationsList() {
  const [activeType, setActiveType] = useState("All");

  // Add "Professional" to the types list
  const types = useMemo(() => {
    const baseTypes = getQualificationTypes();
    if (!baseTypes.includes("Professional")) {
      // Insert Professional after All
      const allIndex = baseTypes.indexOf("All");
      baseTypes.splice(allIndex + 1, 0, "Professional");
    }
    return baseTypes;
  }, []);

  const grouped = useMemo(() => {
    if (activeType === "Professional") return {};
    const filtered = getFilteredQualifications(activeType);
    return groupQualificationsByType(filtered);
  }, [activeType]);

  return (
    <div className="px-6 lg:px-10 py-8 max-w-4xl mx-auto">
      {/* Page Title */}
      <div className="text-center mb-10">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight heading-display">
          Qualifications
        </h1>
      </div>

      {/* Type Filters */}
      <div className="flex items-center justify-center gap-6 py-4 border-b border-border mb-10">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`relative pb-2 text-[15px] transition-colors ${activeType === type
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
              }`}
          >
            {type}
            {activeType === type && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground" />
            )}
          </button>
        ))}
      </div>

      {/* Professional Certifications */}
      {(activeType === "All" || activeType === "Professional") && (
        <section className={activeType === "All" ? "mb-12" : ""}>
          <div className="flex items-center gap-2 mb-6">
            <Briefcase size={18} className="text-muted-foreground" />
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Professional Certifications
            </h2>
          </div>

          <div className="space-y-0">
            {professionalCertifications.map((cert) => (
              <PostListItem
                key={cert.code}
                title={cert.name}
                description={cert.description}
                category={cert.issuer}
                code={cert.code}
                date={cert.date}
                className="animate-fade-in"
              />
            ))}
          </div>
        </section>
      )}

      {/* Qualifications by type (not showing when Professional is selected) */}
      {activeType !== "Professional" && (
        <div className="space-y-12">
          {Object.entries(grouped).map(([type, items]) => {
            const Icon = typeIcons[type as keyof typeof typeIcons] || Award;

            return (
              <section key={type}>
                <div className="flex items-center gap-2 mb-6">
                  <Icon size={18} className="text-muted-foreground" />
                  <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    {type}
                  </h2>
                </div>

                <div className="space-y-0">
                  {items.map((qual, index) => (
                    <QualificationItem
                      key={`${qual.title}-${index}`}
                      qual={qual}
                      index={index}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
