"use client";

import * as Popover from "@radix-ui/react-popover";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const categories = [
  { value: "beauty", label: "Beauty" },
  { value: "tech", label: "Tech" },
  { value: "health", label: "Health" },
];

export default function FilterBar() {
  const [selected, setSelected] = useState("beauty");

  return (
    <div className="flex justify-end mb-4">
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm 
                       text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>{categories.find(c => c.value === selected)?.label}</span>
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            side="bottom"
            align="end"
            sideOffset={6}
            className="rounded-lg border bg-white p-2 shadow-lg w-40 z-50"
          >
            <div className="flex flex-col">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setSelected(cat.value)}
                  className={`px-3 py-2 text-left text-sm rounded-md hover:bg-gray-100 ${
                    selected === cat.value ? "bg-gray-100 font-medium" : ""
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <Popover.Arrow className="fill-gray stroke-gray-700" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
