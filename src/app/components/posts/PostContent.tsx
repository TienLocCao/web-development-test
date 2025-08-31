"use client";

import React, { useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import { Post, SearchFilters } from "@/app/types";
import SearchAndFilter from "@/app/components/posts/SearchAndFilter";
import PostCard from "@/app/components/posts/PostCard";
import { ApiService } from "@/app/services/api";
import { Loader } from 'lucide-react'

const ITEMS_PER_PAGE = 15;

interface PostContentProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

const PostContent: React.FC<PostContentProps> = ({ containerRef }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    userId: undefined,
    sortBy: "id",
    sortOrder: "desc",
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");

  // 🔹 Fetch posts
  const fetchPosts = async (reset = false) => {
    if (loading || (!reset && !hasMore)) return;
    setLoading(true);
    setError("");

    try {
      let result;

      if (filters.query) {
        result = await ApiService.searchPosts(filters.query, reset ? 1 : page, ITEMS_PER_PAGE);
      } else if (filters.userId) {
        result = await ApiService.getPostsByUser(filters.userId, reset ? 1 : page, ITEMS_PER_PAGE);
      } else {
        result = await ApiService.getPosts(reset ? 1 : page, ITEMS_PER_PAGE);
      }

      // Sort lại
      let sorted = [...result.posts].sort((a, b) => {
        let aValue: any, bValue: any;
        switch (filters.sortBy) {
          case "title":
            aValue = a.title.toLowerCase();
            bValue = b.title.toLowerCase();
            break;
          case "userId":
            aValue = a.userId;
            bValue = b.userId;
            break;
          default:
            aValue = a.id;
            bValue = b.id;
        }
        return filters.sortOrder === "asc"
          ? aValue > bValue ? 1 : -1
          : aValue < bValue ? 1 : -1;
      });

      if (reset) {
        setPosts(sorted);
        setPage(2);
      } else {
        setPosts((prev) => [...prev, ...sorted]);
        setPage((prev) => prev + 1);
      }

      setHasMore(result.posts.length === ITEMS_PER_PAGE);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch posts.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handlers
  const handleSearch = (query: string, userId?: number) => {
    setFilters((prev) => ({ ...prev, query, userId }));
    setPage(1);
    setHasMore(true);
    fetchPosts(true);
  };

  const handleSort = (sortBy: "title" | "id" | "userId", sortOrder: "asc" | "desc") => {
    setFilters((prev) => ({ ...prev, sortBy, sortOrder }));
    setPage(1);
    setHasMore(true);
    fetchPosts(true);
  };

  // 🔹 Initial load
  useEffect(() => {
    fetchPosts(true);
  }, []);

  return (
    <main className="max-w-2xl w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Posts</h1>
        <p className="text-gray-600">
          Explore posts from our community. Use search and filters to find content.
        </p>
      </div>

      <SearchAndFilter
        onSearch={handleSearch}
        onSort={handleSort}
        currentQuery={filters.query}
        currentUserId={filters.userId}
        currentSortBy={filters.sortBy}
        currentSortOrder={filters.sortOrder}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <Virtuoso
        data={posts}
        itemContent={(index, post) => <PostCard key={post.id} post={post} />}
        customScrollParent={containerRef.current ?? undefined}
        rangeChanged={({ endIndex }) => {
          if (hasMore && !loading && endIndex >= posts.length - 14) {
            fetchPosts();
          }
        }}
        components={{
          Footer: () =>
            true ? (
              <div className="flex justify-center py-4 text-gray-500">
                <Loader className="w-8 h-8 animate-spin" />
              </div>
            ) : null,
        }}
      />
    </main>
  );
};

export default PostContent;
