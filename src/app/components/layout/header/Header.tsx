"use client";

import { Bell, Wallet } from "lucide-react";
import { useState } from "react";
import LogoSection from "./LogoSection";
import NavLinks from "./NavLinks";
import SearchBox from "../../search/SearchBox";
import UserMenu from "./UserMenu";
import NotificationDialog from "@/app/components/notifications/NotificationDialog";

export default function Header() {
  const [notifCount] = useState(1);

  return (
    <header className="fixed top-0 z-header w-full bg-white shadow z-49">
      <div className="max-w-7xl mx-auto grid grid-cols-[1fr_300px] xl:grid-cols-[300px_1fr_300px] items-center h-navbar px-6">
        
        {/* Left */}
        <LogoSection />

        {/* Middle */}
        <div className="h-full flex justify-center items-center space-x-4">
          <NavLinks />
          <SearchBox width="w-64" />
        </div>

        {/* Right */}
        <div className="flex justify-end items-center space-x-4">
          {/* Notification */}
          <NotificationDialog />

          {/* User menu */}
          <UserMenu />

          {/* Wallet */}
          <button className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-md hover:bg-gray-200 transition">
            <Wallet className="w-4 h-4 text-gray-700" />
            <span className="text-sm font-medium">Wallet</span>
          </button>
        </div>
      </div>
    </header>
  );
}
