"use client";

import { Plus, Search, ShieldCheck } from "lucide-react";

interface Community {
  id: string;
  name: string;
  shortName: string;
  badge?: string;
  verified?: boolean;
}

const communities: Community[] = [
  {
    id: "1",
    name: "Beincom Việt Nam",
    shortName: "BIC",
    badge: "NFT",
    verified: true,
  },
];

export default function CommunitiesMyCommunities() {
  return (
    <aside className="bg-white rounded-lg p-4 shadow-sm w-72">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-semibold text-gray-700">
          Your communities
        </h2>
        <div className="flex gap-2">
          <button className="p-1 rounded-full hover:bg-gray-200">
            <Search size={16} />
          </button>
          <button className="p-1 rounded-full hover:bg-gray-200">
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Community list */}
      <div className="flex items-center gap-2">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white text-xs font-bold">
          {communities[0].shortName}
          {communities[0].badge && (
            <span className="absolute -bottom-1 -right-1 bg-indigo-500 text-white text-[10px] px-1 py-0.5 rounded-md font-semibold">
              {communities[0].badge}
            </span>
          )}
        </div>

        <span className="text-sm font-medium text-blue-600 flex items-center gap-1">
          {communities[0].name}
          {communities[0].verified && (
            <ShieldCheck size={14} className="text-blue-500" />
          )}
        </span>
      </div>
    </aside>
  );
}
