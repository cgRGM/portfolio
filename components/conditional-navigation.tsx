"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/components/home/navigation";

export default function ConditionalNavigation() {
  const pathname = usePathname();

  // Don't show navigation on dashboard pages
  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return <Navigation />;
}