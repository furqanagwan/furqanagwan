"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import type { MDXFileData } from "../lib/blog";
import { PostItem } from "./post-item";

type PostsProps = {
  posts: MDXFileData[];
};

export function Posts({ posts }: PostsProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const selectedItemRef = useRef<HTMLDivElement>(null);

  const filteredPosts = posts.filter((item) =>
    item.metadata.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

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
            ? prev < filteredPosts.length - 1
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
        filteredPosts.length > 0
      ) {
        router.push(filteredPosts[selectedIndex].url);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearching, filteredPosts, selectedIndex, router]);

  return (
    <>
      {/* Search UI here if you want */}
      <div className="space-y-8 sm:space-y-4">
        {filteredPosts.map((item, index) => (
          <div
            key={item.slug}
            ref={isSearching && index === selectedIndex ? selectedItemRef : null}
          >
            <PostItem
              post={item}
              isSelected={isSearching && index === selectedIndex}
            />
          </div>
        ))}
      </div>
    </>
  );
}
