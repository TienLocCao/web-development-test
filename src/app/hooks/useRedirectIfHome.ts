"use client"
import { useRouter, usePathname } from "next/navigation"; // App Router
import { useEffect } from "react";

export function useRedirectIfHome() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      router.replace("/newsfeed");
    }
  }, [pathname, router]);
}
