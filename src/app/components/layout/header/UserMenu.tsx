"use client";
import {useState} from 'react'
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { User, LogOut } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";

export default function UserMenu() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  if (!isAuthenticated) {
    return (
      <button
        onClick={() => router.push("/auth")}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Sign in
      </button>
    );
  }

  return (
    <Popover.Root>
      {/* Trigger (nút avatar/user icon) */}
      <Popover.Trigger asChild className="data-[state=open]:text-blue-500">
        <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 hover:text-blue-500" />
          </div>
        </button>
      </Popover.Trigger>

      {/* Nội dung dropdown */}
      <Popover.Portal>
        <Popover.Content
          className="z-50 mt-2 w-72 bg-white rounded-md shadow-lg border border-gray-200"
          align="center"
        >
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign out</span>
          </button>

          {/* Mũi tên Popover */}
          <Popover.Arrow className="fill-white stroke-gray-700" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
