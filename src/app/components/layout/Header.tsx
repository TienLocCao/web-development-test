"use client";

import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import {
  Home,
  Users,
  Store,
  Bell,
  Wallet,
  Search,
  LogOut,
  User,
} from "lucide-react";
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: "Newsfeed", href: "/newsfeed", icon: Home },
  { name: "Friends", href: "/friends", icon: Users },
  { name: "Marketplace", href: "/marketplace", icon: Store },
];

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();
  const [notifCount] = useState(1);
  const menuOpenRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push("/auth");
    setIsUserMenuOpen(false);
  };

  const handleAuthClick = () => {
    router.push("/auth");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isUserMenuOpen &&
        menuOpenRef.current &&
        !menuOpenRef.current.contains(event.target as Node)
      )
        setIsUserMenuOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  return (
    <header className="fixed top-0 z-header w-full bg-white shadow">
      <div className="max-w-7xl mx-auto grid grid-cols-4 items-center h-navbar px-6">
        
        {/* Left Column: Logo + Banner */}
        <div className="flex items-center space-x-2">
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

        {/* Middle Column: Navigation */}
        <div className="h-full flex justify-center items-center col-span-2">
          <div className="h-full flex  items-end space-x-6 ">
            {navLinks.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <button key={index}>
                  <a onClick={() => router.push("/")} className="group flex h-12 w-20 flex-col justify-between rounded-t-lg hover:bg-neutral-2 text-blue-50">
                    <span className={`h-10 w-full  ${isActive ? 'text-blue-700' : 'text-gray-600'} text-black flex items-center justify-center`}>
                      <item.icon className="w-6 h-6" />
                    </span>
                    
                    { isActive && <span className="bottom-0 left-0 z-1 h-1 w-20 rounded-t-md bg-blue-500"></span> }
                  </a>
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search content"
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 text-sm"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Right Column: Search + Actions */}
        <div className="flex justify-end items-center space-x-4">
          {/* Notification */}
          <div className="relative">
            <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
              <Bell className="w-5 h-5 text-gray-700" />
            </button>
            {notifCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                {notifCount}
              </span>
            )}
          </div>

          {/* Avatar / Auth */}
          {isAuthenticated ? (
            <div className="relative" ref={menuOpenRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 " />
                </div>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.name}
                    </p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleAuthClick}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Sign in
            </button>
          )}

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
