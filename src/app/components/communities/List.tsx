import CommunityCard, { Community } from "./Card";

export default function CommunityList({ data }: { data: Community[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {data.map((c) => (
        <CommunityCard key={c.id} community={c} />
      ))}
    </div>
  );
}
