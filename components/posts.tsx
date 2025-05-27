"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import type { MDXFileData } from "../lib/blog";
import { PostItem } from "./post-item";

type PostsProps = {
  posts: MDXFileData[];
};

const PAGE_SIZE = 5; // Adjust for more/less per page

// Get unique types from all posts
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

  const router = useRouter();
  const selectedItemRef = useRef<HTMLDivElement>(null);

  const postTypes = getAllTypes(posts);

  // --- FILTER & SEARCH ---
  let filteredPosts = posts;
  if (filterType !== "all") {
    filteredPosts = filteredPosts.filter((item) => item.type === filterType);
  }
  if (searchQuery.trim()) {
    filteredPosts = filteredPosts.filter((item) =>
      item.metadata.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // --- PAGINATION ---
  const pageCount = Math.ceil(filteredPosts.length / PAGE_SIZE);
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // Reset to first page/filter/search as needed
  useEffect(() => {
    setSelectedIndex(0);
    setPage(1); // Reset page when search/filter changes
  }, [searchQuery, filterType]);

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
      } else if (isSearching && e.key === "Enter" && paginatedPosts.length > 0) {
        router.push(paginatedPosts[selectedIndex].url);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearching, paginatedPosts, selectedIndex, router]);

  return (
    <div className="space-y-8 sm:space-y-4 text-black dark:text-white">
      {/* Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
        {/* Filter by Type */}
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

        {/* Search */}
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded px-2 py-1 bg-white dark:bg-gray-900 text-black dark:text-white"
        />
      </div>

      {/* Posts List */}
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

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded border bg-gray-200 dark:bg-gray-800 text-black dark:text-white disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-2 py-1">
          Page {page} of {pageCount}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
          disabled={page === pageCount}
          className="px-3 py-1 rounded border bg-gray-200 dark:bg-gray-800 text-black dark:text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
