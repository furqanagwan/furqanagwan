"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import type { MDXFileData } from "../lib/blog";
import { PostItem } from "./post-item";

type PostsProps = {
  posts: MDXFileData[];
};

const MOBILE_PAGE_SIZE = 5;
const DESKTOP_MIN_HEIGHT = 56; // Minimum post height estimate (px, tweak as needed)
const BREAKPOINT = 640; // px

function getAllTypes(posts: MDXFileData[]) {
  const set = new Set<string>();
  posts.forEach((p) => {
    if (p.type) set.add(p.type);
  });
  return Array.from(set);
}

export function Posts({ posts }: PostsProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [filterType, setFilterType] = useState("all");
  const [pageSize, setPageSize] = useState(MOBILE_PAGE_SIZE);

  const router = useRouter();
  const selectedItemRef = useRef<HTMLDivElement>(null);

  // Dynamically set page size on desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < BREAKPOINT) {
        setPageSize(MOBILE_PAGE_SIZE);
      } else {
        // Height available for posts: window height - static header (estimate)
        const headerHeight = 150; // header/search/filter+margin height (px), adjust for your layout
        const footerHeight = 100; // pagination + margin (px)
        const available = window.innerHeight - headerHeight - footerHeight;
        const items = Math.max(1, Math.floor(available / DESKTOP_MIN_HEIGHT));
        setPageSize(items);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const postTypes = getAllTypes(posts);

  let filteredPosts = posts;
  if (filterType !== "all") {
    filteredPosts = filteredPosts.filter((item) => item.type === filterType);
  }
  if (searchQuery.trim()) {
    filteredPosts = filteredPosts.filter((item) =>
      item.metadata.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  const pageCount = Math.ceil(filteredPosts.length / pageSize);
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  useEffect(() => {
    setSelectedIndex(0);
    setPage(1);
  }, [searchQuery, filterType, pageSize]);

  const scrollSelectedIntoView = () => {
    if (selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !isSearching) {
        e.preventDefault();
        setIsSearching(true);
      } else if (e.key === "Escape" && isSearching) {
        setIsSearching(false);
        setSearchQuery("");
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      } else if (
        isSearching &&
        (((e.ctrlKey || e.metaKey) && (e.key === "j" || e.key === "k")) ||
          e.key === "ArrowDown" ||
          e.key === "ArrowUp")
      ) {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const isDownward =
            e.key === "ArrowDown" ||
            ((e.ctrlKey || e.metaKey) && e.key === "j");

          const newIndex = isDownward
            ? prev < paginatedPosts.length - 1
              ? prev + 1
              : prev
            : prev > 0
              ? prev - 1
              : prev;

          scrollSelectedIntoView();
          return newIndex;
        });
      } else if (
        isSearching &&
        e.key === "Enter" &&
        paginatedPosts.length > 0
      ) {
        router.push(paginatedPosts[selectedIndex].url);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearching, paginatedPosts, selectedIndex, router]);

  return (
    <div className="flex flex-col min-h-screen space-y-8 sm:space-y-4 text-black dark:text-white">
      {/* Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border rounded px-2 py-1 bg-white dark:bg-gray-900 text-black dark:text-white"
        >
          <option value="all">All Types</option>
          {postTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded px-2 py-1 bg-white dark:bg-gray-900 text-black dark:text-white"
        />
      </div>

      <div className="flex-grow">
        {paginatedPosts.length === 0 ? (
          <div className="py-12 text-center text-gray-500 dark:text-gray-400">
            No posts found.
          </div>
        ) : (
          paginatedPosts.map((item, index) => (
            <div
              key={item.slug}
              ref={
                isSearching && index === selectedIndex ? selectedItemRef : null
              }
            >
              <PostItem
                post={item}
                isSelected={isSearching && index === selectedIndex}
              />
            </div>
          ))
        )}
      </div>

      {/* Numbered Pagination */}
      {pageCount > 1 && (
        <div className="flex justify-center mt-8 mb-6">
          <div className="flex flex-wrap gap-2 max-w-full overflow-x-auto">
            {[...Array(pageCount)].map((_, idx) => (
              <button
                key={idx + 1}
                onClick={() => setPage(idx + 1)}
                className={`px-3 py-1 rounded border 
                  ${
                    page === idx + 1
                      ? "bg-gray-900 dark:bg-white text-white dark:text-black font-bold border-gray-900 dark:border-white"
                      : "bg-gray-200 dark:bg-gray-800 text-black dark:text-white border-gray-200 dark:border-gray-800"
                  }
                  transition-colors
                `}
                aria-current={page === idx + 1 ? "page" : undefined}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
