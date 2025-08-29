"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Layout from "@/app/components/public/Layout";
import { useAuth } from "@/app/contexts/AuthContext";
import { Post, SearchFilters } from "@/app/types";
import { ApiService } from "@/app/services/api";
import SearchAndFilter from "@/app/components/posts/SearchAndFilter";
import PostCard from "@/app/components/posts/PostCard";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 10;

const LayoutPost = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    userId: undefined,
    sortBy: "id",
    sortOrder: "desc",
  });

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // ✅ Fetch posts
  const fetchPosts = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError("");

    try {
      let result;

      if (filters.query) {
        result = await ApiService.searchPosts(filters.query, currentPage, ITEMS_PER_PAGE);
      } else if (filters.userId) {
        result = await ApiService.getPostsByUser(filters.userId, currentPage, ITEMS_PER_PAGE);
      } else {
        result = await ApiService.getPosts(currentPage, ITEMS_PER_PAGE);
      }

      // Sort posts
      let sortedPosts = [...result.posts];
      sortedPosts.sort((a, b) => {
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
        return filters.sortOrder === "asc" ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
      });

      setPosts((prev) => [...prev, ...sortedPosts]);
      setHasMore(result.posts.length === ITEMS_PER_PAGE); // còn dữ liệu hay không
    } catch (err) {
      setError("Failed to fetch posts. Please try again.");
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  }, [filters, currentPage, loading, hasMore]);

  // ✅ Redirect nếu chưa login
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, authLoading, router]);

  // ✅ Fetch data khi filters hoặc page thay đổi
  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated, currentPage]);

  // ✅ IntersectionObserver để trigger lazy load
  useEffect(() => {
    const container = containerRef.current;
    const sentinel = sentinelRef.current;
    if (!container || !sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setCurrentPage((prev) => prev + 1);
        }
      },
      {
        root: container,        // 👈 scrollable container
        rootMargin: "0px 0px 500px 0px",    // 👈 load trước khi chạm cuối
        threshold: 0.1,
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loading, hasMore]);

  // ✅ Handlers
  const handleSearch = (query: string, userId?: number) => {
    setFilters((prev) => ({ ...prev, query, userId }));
    setPosts([]);
    setCurrentPage(1);
    setHasMore(true);
  };

  const handleSort = (sortBy: "title" | "id" | "userId", sortOrder: "asc" | "desc") => {
    setFilters((prev) => ({ ...prev, sortBy, sortOrder }));
    setPosts([]);
    setCurrentPage(1);
    setHasMore(true);
  };

  // ✅ Loading UI
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <Layout containerRef={containerRef}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Posts</h1>
          <p className="text-gray-600">
            Explore posts from our community. Use the search and filters below to find what you're looking for.
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
          </div>
        )}

        <div ref={sentinelRef} className="h-10"></div>
      </main>
    </Layout>
  );
};

export default LayoutPost;
