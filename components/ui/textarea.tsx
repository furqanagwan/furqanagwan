"use client";

interface TextareaProps {
  label: string;
  name: string;
  rows: number;
}

export default function Textarea({ label, name, rows }: TextareaProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-1"
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        required
        rows={rows}
        className="w-full border border-neutral-300 dark:border-neutral-700 rounded px-3 py-2 text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition"
      ></textarea>
    </div>
  );
}
