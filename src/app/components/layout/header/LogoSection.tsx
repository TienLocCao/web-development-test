"use client";

import { useRouter } from "next/navigation";

export default function LogoSection() {
  const router = useRouter();

  return (
    <div className="hidden xl:flex items-center space-x-2">
      <div
        onClick={() => router.push("/")}
        className="flex items-center space-x-1 cursor-pointer"
      >
        <div className="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm">
          BIC
        </div>
        <span className="text-blue-700 font-semibold">beincom</span>
      </div>
      <button className="ml-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-700 transition">
        SMedalLegends
      </button>
    </div>
  );
}
