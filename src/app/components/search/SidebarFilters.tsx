"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SidebarFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentTypes =
    searchParams.get("contentTypes")?.split(",").filter(Boolean) || [];

  const toggleContentType = (type: string) => {
    const exists = currentTypes.includes(type);
    const newTypes = exists
      ? currentTypes.filter((t) => t !== type)
      : [...currentTypes, type];

    const params = new URLSearchParams(searchParams.toString());
    if (newTypes.length > 0) {
      params.set("contentTypes", newTypes.join(","));
    } else {
      params.delete("contentTypes");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <aside className="w-72 p-4 border-r bg-white hidden md:block">
      <div className="sticky top-8">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Filters</h2>

        <div className="space-y-6">
          
        </div>
      </div>
    </aside>
  );
}
