"use client";
import Sidebar from "@/app/components/communities/Sidebar";
import PremiumCard from "@/app/components/communities/PremiumCard";
import FilterBar from "@/app/components/communities/FilterBar";
import CommunityList from "@/app/components/communities/List";
import { Community } from "@/app/components/communities/Card";
import Layout from "@/app/components/layout/Layout"
import { Suspense } from "react";
const mockData: Community[] = [
  {
    id: "1",
    name: "Crochet chart corner",
    image: "https://picsum.photos/300/200?random=1",
    members: 26,
  },
  {
    id: "2",
    name: "Cô Dược Sĩ Nhỏ",
    image: "https://picsum.photos/300/200?random=2",
    members: 433,
    contentPerWeek: "2 contents/week",
  },
  {
    id: "3",
    name: "UI/UX Designers",
    image: "https://picsum.photos/300/200?random=3",
    members: 120,
    contentPerWeek: "5 contents/week",
  },
  {
    id: "4",
    name: "Next.js Devs",
    image: "https://picsum.photos/300/200?random=4",
    members: 210,
    contentPerWeek: "10 contents/week",
  },
  {
    id: "5",
    name: "React Việt Nam",
    image: "https://picsum.photos/300/200?random=5",
    members: 890,
    contentPerWeek: "15 contents/week",
  },
]


export default function CommunitiesPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto grid grid-cols-[1fr] md:grid-cols-[300px_1fr] h-navbar px-6 ">
        {/* Sidebar */}
        <div className="max-md:w-full max-md:mt-8 flex flex-col gap-4 w-64">
          <div className="md:sticky md:top-8 flex flex-col gap-4">
            <Suspense fallback={
              <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-4 space-y-4 animate-pulse">
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="space-y-2">
                  <div className="h-8 bg-gray-200 rounded w-full"></div>
                  <div className="h-8 bg-gray-200 rounded w-full"></div>
                  <div className="h-8 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            }>
              <Sidebar />
            </Suspense>
            <PremiumCard />
          </div>
        </div>

        {/* Main content */}
        <div className="md:pl-6 lg:pl-8 py-8">
          <div className="flex justify-between">
            <h1 className="text-lg font-bold mb-4">Discover communities</h1>
            <FilterBar />
          </div>
          <CommunityList data={mockData} />
        </div>
      </div>
    </Layout>
  );
}
