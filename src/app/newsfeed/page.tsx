"use client";

import React, { useRef } from "react";
import Layout from "@/app/components/public/Layout";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import PostContent from "@/app/components/posts/PostContent";
import CommunitiesCard from "@/app/components/communities/Card";
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
      <div className="max-w-7xl mx-auto grid grid-cols-4 h-navbar px-6 ">
        <div className="hidden md:block flex space-x-2 py-8">
          <CommunitiesCard />
        </div>
        <div className="col-span-2 flex justify-center">
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
