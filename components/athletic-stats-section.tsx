"use client";
import FactList, { Fact } from "./factlist";

const stats: Fact[] = [
  { label: "100m Sprint", value: "11.2s" },
  { label: "200m Sprint", value: "N/A" },
  { label: "Bench Press (1RM)", value: "110 kg" },
  { label: "Squat (1RM)", value: "150 kg" },
  { label: "Deadlift (1RM)", value: "N/A" },
  { label: "Vertical Jump", value: "62 cm" },
  { label: "Longest Run", value: "21.1 km" },
  { label: "Pull-Ups (Max)", value: 20 },
  { label: "VO2 Max", value: "Not tested" },
  { label: "Resting Heart Rate", value: "50 bpm" },
];

export default function AthleticStatsSection() {
  return (
    <section className="max-w-5xl mx-auto w-full px-4 mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="pt-2 border-t-2 border-neutral-900 dark:border-neutral-300 font-semibold text-sm leading-tight w-fit">
          Athletic Stats
        </h2>
      </div>
      <FactList facts={stats} />
    </section>
  );
}
