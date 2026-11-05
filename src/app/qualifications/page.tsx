import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { QualificationsList } from "@/features/qualifications/components/QualificationsList";

export const metadata: Metadata = buildPageMetadata({
  title: "Qualifications",
  description: "Educational background, certifications, and awards of Furqan Agwan",
  path: "/qualifications",
});

export default function QualificationsPage() {
  return <QualificationsList />;
}
