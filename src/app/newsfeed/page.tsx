"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Layout from "@/app/components/public/Layout";
import { useAuth } from "@/app/contexts/AuthContext";
import { Post, SearchFilters } from "@/app/types";
import { ApiService } from "@/app/services/api";
import { useRouter } from "next/navigation";
import PostContent from "@/app/components/posts/PostContent";

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
      setHasMore(result.posts.length === ITEMS_PER_PAGE);
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
        root: container,
        rootMargin: "0px 0px 500px 0px",
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
      <div className="max-w-7xl mx-auto grid grid-cols-4 h-navbar px-6">
        <div className="flex space-x-2">
          content left
        </div>
        <div className="h-full flex justify-center items-center col-span-2">
          <PostContent
            posts={posts}
            filters={filters}
            error={error}
            loading={loading}
            sentinelRef={sentinelRef}
            onSearch={handleSearch}
            onSort={handleSort}
          />
        </div>
        <div className="flex space-x-4">
            content right
        </div>
      </div>
      
    </Layout>
  );
};

export default LayoutPost;
