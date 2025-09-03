"use client";

import React, { useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import { Post } from "@/app/types/post";
import { SearchFilters } from "@/app/types/searchFilters";
import PostCard from "@/app/components/posts/PostCard";
import { searchPosts, getPosts } from "@/app/services/posts";
import PostSkeleton from "./PostSkeleton";
import { toast } from 'react-toastify';
import { useSearchParams } from "next/navigation";

const ITEMS_PER_PAGE = 15;

interface PostContentProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

const PostContent: React.FC<PostContentProps> = ({ containerRef }) => {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("query") || "";

  const [posts, setPosts] = useState<Post[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({
    query: queryParam,
    sortOrder: "desc",
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async (reset = false) => {
    if (loading || (!reset && !hasMore)) return;
    setLoading(true);

    try {
      let result;

      if (filters.query) {
        result = await searchPosts(filters.query, reset ? 1 : page, ITEMS_PER_PAGE);
      } else {
        result = await getPosts(reset ? 1 : page, ITEMS_PER_PAGE);
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
      toast.error('Failed to fetch posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFilters((prev) => ({ ...prev, query: queryParam }));
    fetchPosts(true);
  }, [queryParam]);

  return (
    <main className="w-full mb-10">
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
