"use client";

interface FieldProps {
  label: string;
  name: string;
  type: string;
  autoComplete: string;
}

export default function Field({ label, name, type, autoComplete }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        required
        autoComplete={autoComplete}
        className="w-full border border-neutral-300 dark:border-neutral-700 rounded px-3 py-2 text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition"
      />
    </div>
  );
}
