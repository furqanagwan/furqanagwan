import React from "react";

export type Fact = {
  label: string;
  value: string | number;
};

export default function FactList({ facts }: { facts: Fact[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-neutral-700 dark:text-neutral-200">
      {facts.map((fact) => (
        <li key={fact.label} className="flex justify-between">
          <span className="text-neutral-500 dark:text-neutral-400">
            {fact.label}:
          </span>
          <span
            className={`font-medium text-neutral-900 dark:text-neutral-100 ${
              fact.value === "N/A" ||
              fact.value === "Not tested" ||
              fact.value === "Not measured"
                ? "italic text-neutral-400 dark:text-neutral-500"
                : ""
            }`}
          >
            {fact.value}
          </span>
        </li>
      ))}
    </ul>
  );
}
