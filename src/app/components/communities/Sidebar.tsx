import { Search, Users } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-full md:w-64 bg-white rounded-lg shadow-sm p-4 space-y-4">
      {/* Search */}
      <div className="flex items-center border rounded px-2 py-1">
        <Search className="w-4 h-4 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search for communities & groups"
          className="w-full text-sm outline-none"
        />
      </div>

      {/* Menu */}
      <div className="space-y-2">
        <button className="w-full text-left py-1 px-2 rounded bg-gray-100 font-medium text-sm">
          Discover
        </button>
        <button className="w-full text-left py-1 px-2 rounded text-sm">
          Yours
        </button>
        <button className="w-full text-left py-1 px-2 rounded text-sm">
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
