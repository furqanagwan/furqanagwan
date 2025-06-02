"use client";

import { useState } from "react";

type UnitSystem = "imperial" | "metric";

function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age--;
  return age;
}

const birthDate = new Date(1996, 8, 5); // 5th September 1996

function formatHeight(unit: UnitSystem) {
  return unit === "imperial" ? `5'4"` : "162.5 cm";
}
function formatWeight(unit: UnitSystem) {
  return unit === "imperial" ? "150 lbs" : "68 kg";
}
function formatWingspan(unit: UnitSystem) {
  return unit === "imperial" ? `5'5"` : "164.5 cm";
}

export default function HumanSection() {
  const [unit, setUnit] = useState<UnitSystem>("imperial");

  // You can add any logic for conversion if you want to calculate dynamically

  const humanFacts = [
    { label: "Height", value: formatHeight(unit) },
    { label: "Weight", value: formatWeight(unit) },
    { label: "Wingspan", value: formatWingspan(unit) },
    { label: "Body Fat %", value: "15%" },
    { label: "Chronological Age", value: calculateAge(birthDate) },
    { label: "Biological Age", value: "26" },
    { label: "Preferred Hand", value: "Right" },
    { label: "Eye Color", value: "Brown" },
    { label: "Birth Year", value: 1996 },
    { label: "Nationality", value: "British" },
  ];

  return (
    <section className="max-w-5xl mx-auto w-full px-4 mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="pt-2 border-t-2 border-neutral-900 dark:border-neutral-300 font-semibold text-sm leading-tight w-fit">
          Human
        </h2>
        {/* Unit switch */}
        <div className="flex items-center gap-2">
          <button
            className={`text-xs px-2 py-1 rounded ${
              unit === "imperial"
                ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                : "bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
            } transition`}
            onClick={() => setUnit("imperial")}
            aria-pressed={unit === "imperial"}
          >
            Imperial
          </button>
          <span className="text-xs text-neutral-400">|</span>
          <button
            className={`text-xs px-2 py-1 rounded ${
              unit === "metric"
                ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                : "bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
            } transition`}
            onClick={() => setUnit("metric")}
            aria-pressed={unit === "metric"}
          >
            Metric
          </button>
        </div>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-neutral-700 dark:text-neutral-200">
        {humanFacts.map((fact) => (
          <li key={fact.label} className="flex justify-between">
            <span className="text-neutral-500 dark:text-neutral-400">
              {fact.label}:
            </span>
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              {fact.value}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
