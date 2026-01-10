"use client";

import Link from "next/link";

// Exact Filter Icon from openai-clone (icon-11.svg) - Horizontal sliders
function FilterIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M9.66667 3.33333C8.93029 3.33333 8.33333 3.93029 8.33333 4.66667C8.33333 5.40305 8.93029 6 9.66667 6C10.403 6 11 5.40305 11 4.66667C11 3.93029 10.403 3.33333 9.66667 3.33333ZM7.08401 4C7.38004 2.84985 8.42411 2 9.66667 2C10.9092 2 11.9533 2.84985 12.2493 4H13.3333C13.7015 4 14 4.29848 14 4.66667C14 5.03486 13.7015 5.33333 13.3333 5.33333H12.2493C11.9533 6.48349 10.9092 7.33333 9.66667 7.33333C8.42411 7.33333 7.38004 6.48349 7.08401 5.33333H2.66667C2.29848 5.33333 2 5.03486 2 4.66667C2 4.29848 2.29848 4 2.66667 4H7.08401ZM6.33333 10C5.59695 10 5 10.597 5 11.3333C5 12.0697 5.59695 12.6667 6.33333 12.6667C7.06971 12.6667 7.66667 12.0697 7.66667 11.3333C7.66667 10.597 7.06971 10 6.33333 10ZM3.75068 10.6667C4.04671 9.51652 5.09077 8.66667 6.33333 8.66667C7.57589 8.66667 8.61996 9.51652 8.91599 10.6667H13.3333C13.7015 10.6667 14 10.9651 14 11.3333C14 11.7015 13.7015 12 13.3333 12H8.91599C8.61996 13.1502 7.57589 14 6.33333 14C5.09077 14 4.04671 13.1502 3.75068 12H2.66667C2.29848 12 2 11.7015 2 11.3333C2 10.9651 2.29848 10.6667 2.66667 10.6667H3.75068Z" />
    </svg>
  );
}

// Exact Sort Icon from openai-clone (icon-12.svg) - Chevron down
function SortIcon({ className }: { className?: string }) {
  return (
    <svg
      width="10"
      height="16"
      viewBox="0 0 10 16"
      fill="currentColor"
      className={className}
    >
      <path d="M0.209209 5.35206C0.488154 5.07312 0.940415 5.07312 1.21936 5.35206L5.00001 9.1327L8.78064 5.35206C9.05958 5.07312 9.51184 5.07312 9.79079 5.35206C10.0697 5.63101 10.0697 6.08327 9.79079 6.36221L5.50509 10.6479C5.37114 10.7819 5.18945 10.8571 5.00001 10.8571C4.81057 10.8571 4.62889 10.7819 4.49494 10.6479L0.20921 6.36222C-0.0697361 6.08327 -0.0697368 5.63101 0.209209 5.35206Z" />
    </svg>
  );
}

// Exact Grid Icon from openai-clone (icon-13.svg) - 4 filled rounded squares
function GridIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 12 12"
      fill="currentColor"
      className={className}
    >
      <path d="M0.912109 1.91211C0.912109 1.35982 1.35982 0.912109 1.91211 0.912109H4.5C5.05228 0.912109 5.5 1.35982 5.5 1.91211V4.5C5.5 5.05228 5.05228 5.5 4.5 5.5H1.91211C1.35982 5.5 0.912109 5.05228 0.912109 4.5V1.91211Z" />
      <path d="M6.5 1.91211C6.5 1.35982 6.94772 0.912109 7.5 0.912109H10.0879C10.6402 0.912109 11.0879 1.35982 11.0879 1.91211V4.5C11.0879 5.05228 10.6402 5.5 10.0879 5.5H7.5C6.94772 5.5 6.5 5.05228 6.5 4.5V1.91211Z" />
      <path d="M0.912109 7.5C0.912109 6.94772 1.35982 6.5 1.91211 6.5H4.5C5.05228 6.5 5.5 6.94772 5.5 7.5V10.0879C5.5 10.6402 5.05228 11.0879 4.5 11.0879H1.91211C1.35982 11.0879 0.912109 10.6402 0.912109 10.0879V7.5Z" />
      <path d="M6.5 7.5C6.5 6.94772 6.94772 6.5 7.5 6.5H10.0879C10.6402 6.5 11.0879 6.94772 11.0879 7.5V10.0879C11.0879 10.6402 10.6402 11.0879 10.0879 11.0879H7.5C6.94772 11.0879 6.5 10.6402 6.5 10.0879V7.5Z" />
    </svg>
  );
}

// Exact List Icon from openai-clone (icon-14.svg) - 3 rows with dots and lines
function ListIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 0C0.447715 0 0 0.447715 0 1C0 1.55228 0.447715 2 1 2C1.55228 2 2 1.55228 2 1C2 0.447715 1.55228 0 1 0ZM5 0C4.44772 0 4 0.447715 4 1C4 1.55228 4.44771 2 5 2H15C15.5523 2 16 1.55228 16 1C16 0.447715 15.5523 0 15 0H5ZM0 6C0 5.44772 0.447715 5 1 5C1.55228 5 2 5.44772 2 6C2 6.55228 1.55228 7 1 7C0.447715 7 0 6.55228 0 6ZM5 5C4.44772 5 4 5.44772 4 6C4 6.55228 4.44771 7 5 7H15C15.5523 7 16 6.55228 16 6C16 5.44772 15.5523 5 15 5H5ZM0 11C0 10.4477 0.447715 10 1 10C1.55228 10 2 10.4477 2 11C2 11.5523 1.55228 12 1 12C0.447715 12 0 11.5523 0 11ZM5 10C4.44772 10 4 10.4477 4 11C4 11.5523 4.44771 12 5 12H15C15.5523 12 16 11.5523 16 11C16 10.4477 15.5523 10 15 10H5Z"
      />
    </svg>
  );
}

interface CategoryNavProps {
  categories: { label: string; href: string }[];
  basePath?: string;
  activeCategory?: string;
}

export default function CategoryNav({ categories }: CategoryNavProps) {
  return (
    <>
      <nav className="[mask-image:linear-gradient(to_right,rgb(0,0,0)_0px,rgb(0,0,0)_32px,rgb(0,0,0)_calc(100%_-_32px),rgb(0,0,0)_100%)] col-end-[-1] col-start-1 overflow-x-auto overflow-y-hidden overscroll-x-contain py-1 md:col-end-[span_3] md:col-start-1">
        <div className="relative min-w-fit">
          <div className="absolute pointer-events-none w-px z-[1] left-0 inset-y-0"></div>
          <ul className="items-center gap-x-6 flex list-none gap-y-6 pl-0">
            {categories.map((cat) => (
              <li
                key={cat.label}
                className="text-base font-medium tracking-[-0.16px] leading-5 md:text-[17.6995px] md:tracking-[-0.176995px] md:leading-[23.1951px]"
              >
                <Link
                  href={cat.href}
                  className={`text-base tracking-[-0.16px] leading-5 text-nowrap rounded-bl rounded-br rounded-tl rounded-tr md:text-[17.6995px] md:tracking-[-0.176995px] md:leading-[23.1951px] ${
                    cat.label === "All"
                      ? "text-foreground"
                      : "text-black/40 dark:text-white/40"
                  }`}
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="absolute pointer-events-none w-px right-0 inset-y-0"></div>
        </div>
      </nav>

      {/* Tools / Actions - exact styling from openai-clone */}
      <div className="col-end-[-1] col-start-1 hidden items-center justify-start gap-x-6 md:col-end-[-1] md:col-start-4 md:flex">
        {/* Filter Button - exact from openai-clone */}
        <button
          type="button"
          className="text-sm font-medium items-center bg-transparent gap-x-[4.2px] flex h-10 justify-center tracking-[normal] leading-[14px] min-h-8 outline-offset-2 text-center text-nowrap overflow-hidden p-0"
        >
          <FilterIcon className="shrink-0 h-4 order-2 w-4" />
          Filter
        </button>

        {/* Sort Button - exact from openai-clone */}
        <button
          type="button"
          className="text-sm font-medium items-center bg-transparent gap-x-[4.2px] flex h-10 justify-center tracking-[normal] leading-[14px] min-h-8 outline-offset-2 text-center text-nowrap p-0"
        >
          <SortIcon className="shrink-0 h-4 order-2 w-2.5" />
          Sort
        </button>

        {/* View Toggle - exact structure from openai-clone */}
        <div className="gap-x-2 flex gap-y-2 ml-auto">
          <label className="block p-2 rounded-full cursor-pointer">
            <input
              type="radio"
              name="mediaView"
              value="grid"
              className="absolute h-0 w-0 p-0"
              defaultChecked
            />
            <div className="outline-offset-[10px] rounded-full">
              <GridIcon className="w-4" />
            </div>
          </label>
          <label className="items-center flex cursor-pointer">
            <input
              type="radio"
              name="mediaView"
              value="list"
              className="absolute h-0 w-0 p-0"
            />
            <div className="items-center flex h-full outline-offset-[10px] rounded-full">
              <ListIcon className="text-black/10 dark:text-white/10 w-4" />
            </div>
          </label>
        </div>
      </div>
    </>
  );
}
