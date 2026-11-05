import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { ExperienceTimeline } from "@/features/experience/components/ExperienceTimeline";

export const metadata: Metadata = buildPageMetadata({
  title: "Experiences",
  description: "Professional journey and career experiences of Furqan Agwan",
  path: "/experiences",
});

export default function ExperiencesPage() {
  return <ExperienceTimeline />;
}
