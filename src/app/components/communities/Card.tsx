import { Users } from "lucide-react";

export interface Community {
  id: string;
  name: string;
  image: string;
  members: number;
  contentPerWeek?: string;
}

export default function CommunityCard({ community }: { community: Community }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-3 flex flex-col">
      <img
        src={community.image}
        alt={community.name}
        className="w-full h-28 object-cover rounded-md"
      />
      <h3 className="mt-2 font-semibold text-sm line-clamp-2">{community.name}</h3>
      <div className="flex items-center text-xs text-gray-500 mt-1">
        <Users className="w-4 h-4 mr-1" />
        {community.members}
        {community.contentPerWeek && (
          <span className="ml-2">{community.contentPerWeek}</span>
        )}
      </div>
      <button className="mt-2 w-full py-1.5 bg-purple-600 text-white text-sm rounded hover:bg-purple-700">
        Join
      </button>
    </div>
  );
}
