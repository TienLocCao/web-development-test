"use client";

import React, { useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import { Post, SearchFilters } from "@/app/types";
import PostCard from "@/app/components/posts/PostCard";
import { ApiService } from "@/app/services/api";
import PostSkeleton from "./PostSkeleton";

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
      } else {
        result = await ApiService.getPosts(reset ? 1 : page, ITEMS_PER_PAGE);
      }

      if (reset) {
        setPosts(result.posts);
        setPage(2);
      } else {
        setPosts((prev) => [...prev, ...result.posts]);
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

  // 🔹 Initial load
  useEffect(() => {
    fetchPosts(true);
  }, []);

  return (
    <main className="w-full mb-10">
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
            loading ? (
              <div>
                <PostSkeleton />
                <PostSkeleton />
              </div>
            ) : null,
        }}
      />
    </main>
  );
};

export default PostContent;
