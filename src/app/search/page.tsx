"use client";

import React, { useRef } from "react";
import Layout from "@/app/components/layout/Layout";
import SidebarFilters from "@/app/components/search/SidebarFilters";
import PostContent from "@/app/components/posts/PostContent";

export default function SearchLayout() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <Layout containerRef={containerRef}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_300px] xl:grid-cols-[300px_1fr] px-6 gap-6 min-h-screen">
        <SidebarFilters />

        <main className="flex-1 p-6">
          <h1 className="text-lg font-semibold mb-4">Search Results</h1>
          <PostContent containerRef={containerRef} />
        </main>
      </div>
    </Layout>
  );
}
