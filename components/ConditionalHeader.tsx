"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function ConditionalHeader() {
  const pathname = usePathname();

  // write, login 페이지에서는 Header를 숨김
  if (pathname?.startsWith("/write") || pathname?.startsWith("/login")) {
    return null;
  }

  return <Header />;
}
