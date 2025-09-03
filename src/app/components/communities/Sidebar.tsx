import { Search, Users } from "lucide-react";
import SearchBox from "@/app/components/search/SearchBox";

export default function Sidebar() {
  return (
    <aside className="w-full md:w-64 bg-white rounded-lg shadow-sm p-4 space-y-4">
      {/* Search */}
      <SearchBox />

      {/* Menu */}
      <div className="space-y-2">
        <button className="w-full text-left py-2 px-4 rounded bg-gray-100 font-medium text-sm">
          Discover
        </button>
        <button className="w-full text-left py-2 px-4 rounded text-sm">
          Yours
        </button>
        <button className="w-full text-left py-2 px-4 rounded text-sm">
          Pending request
        </button>
      </div>

      {/* Create */}
      <button className="w-full bg-purple-100 text-purple-700 py-1.5 rounded text-sm font-medium">
        + Create new community
      </button>
    </aside>
  );
}
