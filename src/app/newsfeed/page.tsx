"use client";

import React, { useRef } from "react";
import Layout from "@/app/components/layout/Layout";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import PostContent from "@/app/components/posts/PostContent";
import CommunitiesMyCommunities from "@/app/components/communities/MyCommunities";
import TrendingCard from "@/app/components/trendings/Card";

const LayoutPost = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Redirect nếu chưa login
  if (!authLoading && !isAuthenticated) {
    router.push("/auth");
    return null;
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Layout containerRef={containerRef}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_300px] xl:grid-cols-[300px_1fr_300px] h-navbar px-6 ">
        <div className="hidden xl:block flex space-x-2 py-8">
          <CommunitiesMyCommunities />
        </div>
        <div className="flex justify-center md:px-6 lg:px-8 py-6 ">
          <PostContent containerRef={containerRef} />
        </div>
        <div className="hidden md:block flex space-x-4 py-8">
          <TrendingCard />
        </div>
      </div>
    </Layout>
  );
};

export default LayoutPost;
