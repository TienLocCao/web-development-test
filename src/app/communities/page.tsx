import Sidebar from "@/app/components/communities/Sidebar";
import PremiumCard from "@/app/components/communities/PremiumCard";
import FilterBar from "@/app/components/communities/FilterBar";
import CommunityList from "@/app/components/communities/List";
import { Community } from "@/app/components/communities/Card";
import Layout from "@/app/components/layout/Layout"
const mockData: Community[] = [
  {
    id: "1",
    name: "Crochet chart corner",
    image: "/images/crochet.jpg",
    members: 26,
  },
  {
    id: "2",
    name: "Cô Dược Sĩ Nhỏ",
    image: "/images/pharmacy.jpg",
    members: 433,
    contentPerWeek: "2 contents/week",
  },
];

export default function CommunitiesPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto grid md:grid-cols-[300px_1fr] h-navbar px-6 ">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col gap-4 w-64 py-8">
          <Sidebar />
          <PremiumCard />
        </div>

        {/* Main content */}
        <div className="md:pl-6 lg:pl-8 py-6">
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
