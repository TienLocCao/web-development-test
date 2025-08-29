"use client";

import React, { RefObject } from "react";
import { Post, SearchFilters } from "@/app/types";
import SearchAndFilter from "@/app/components/posts/SearchAndFilter";
import PostCard from "@/app/components/posts/PostCard";

interface PostContentProps {
  posts: Post[];
  filters: SearchFilters;
  error: string;
  loading: boolean;
  sentinelRef: RefObject<HTMLDivElement | null>;
  onSearch: (query: string, userId?: number) => void;
  onSort: (sortBy: "title" | "id" | "userId", sortOrder: "asc" | "desc") => void;
}

const PostContent: React.FC<PostContentProps> = ({
  posts,
  filters,
  error,
  loading,
  sentinelRef,
  onSearch,
  onSort,
}) => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Posts</h1>
        <p className="text-gray-600">
          Explore posts from our community. Use the search and filters below to find what you're looking for.
        </p>
      </div>

      <SearchAndFilter
        onSearch={onSearch}
        onSort={onSort}
        currentQuery={filters.query}
        currentUserId={filters.userId}
        currentSortBy={filters.sortBy}
        currentSortOrder={filters.sortOrder}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 mb-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {loading && (
        <div className="text-center py-6">
          <span className="text-gray-500">Loading...</span>
        </div>
      )}

      <div ref={sentinelRef} className="h-10"></div>
    </main>
  );
};

export default PostContent;
