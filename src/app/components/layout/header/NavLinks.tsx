"use client";

import { Home, Users, Store } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const navLinks = [
  { name: "Newsfeed", href: "/newsfeed", icon: Home },
  { name: "Communities", href: "/communities", icon: Users },
  { name: "Marketplace", href: "/marketplace", icon: Store },
];

export default function NavLinks() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="h-full flex items-end space-x-6">
      {navLinks.map((item, index) => {
        const isActive = pathname === item.href;
        return (
          <button key={index} onClick={() => router.push(item.href)}>
            <div className="group flex h-12 w-20 flex-col justify-between rounded-t-lg hover:bg-neutral-2">
              <span
                className={`h-10 w-full flex items-center justify-center ${
                  isActive ? "text-blue-700" : "text-gray-600"
                }`}
              >
                <item.icon className="w-6 h-6" />
              </span>
              {isActive && (
                <span className="bottom-0 left-0 z-1 h-1 w-20 rounded-t-md bg-blue-500"></span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
