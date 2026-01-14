"use client";

import { usePathname } from "next/navigation";
import MobileSidebar from "./MobileSidebar";

export default function ConditionalMobileSidebar() {
  const pathname = usePathname();

  // write, login 페이지에서는 MobileSidebar를 숨김
  if (pathname?.startsWith("/write") || pathname?.startsWith("/login")) {
    return null;
  }

  return <MobileSidebar />;
}
