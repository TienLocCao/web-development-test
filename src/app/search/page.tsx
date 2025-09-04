"use client";

import React, { useRef, Suspense } from "react";
import Layout from "@/app/components/layout/Layout";
import SidebarFilters from "@/app/components/search/SidebarFilters";
import PostContent from "@/app/components/posts/PostContent";

function SearchResults({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <main className="flex-1 p-6">
      <h1 className="text-lg font-semibold mb-4">Search Results</h1>
      <PostContent containerRef={containerRef} />
    </main>
  );
}

export default function SearchLayout() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <Layout containerRef={containerRef}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_300px] xl:grid-cols-[300px_1fr] px-6 gap-6 min-h-screen">
        <Suspense fallback={<div>Loading filters...</div>}>
          <SidebarFilters />
        </Suspense>

        <Suspense 
          fallback={
            <div className="flex-1 p-6">
              <h1 className="text-lg font-semibold mb-4">Search Results</h1>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg mb-4 animate-pulse" />
              ))}
            </div>
          }
        >
          <SearchResults containerRef={containerRef} />
        </Suspense>
      </div>
    </Layout>
  );
}
