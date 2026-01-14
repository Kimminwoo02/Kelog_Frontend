"use client";

import { useState } from "react";
import Link from "next/link";

type TabType = "trending" | "recent";

interface TrendingTabsProps {
  activeTab?: TabType;
}

export default function TrendingTabs({ activeTab = "trending" }: TrendingTabsProps) {
  const [currentTab, setCurrentTab] = useState<TabType>(activeTab);

  return (
    <div className="flex items-center gap-4 border-b border-[var(--border-color)]">
      <button
        onClick={() => setCurrentTab("trending")}
        className={`flex items-center gap-2 pb-3 px-2 text-lg font-bold transition-colors relative ${
          currentTab === "trending"
            ? "text-[var(--foreground)]"
            : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
        }`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
        </svg>
        트렌딩
        {currentTab === "trending" && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--foreground)]" />
        )}
      </button>
      <button
        onClick={() => setCurrentTab("recent")}
        className={`flex items-center gap-2 pb-3 px-2 text-lg font-bold transition-colors relative ${
          currentTab === "recent"
            ? "text-[var(--foreground)]"
            : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
        }`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
        </svg>
        최신
        {currentTab === "recent" && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--foreground)]" />
        )}
      </button>

      {/* Period Filter (for trending) */}
      {currentTab === "trending" && (
        <div className="ml-auto">
          <select className="bg-[var(--hover-bg)] text-[var(--text-secondary)] text-sm px-3 py-1.5 rounded border-none outline-none cursor-pointer">
            <option value="today">오늘</option>
            <option value="week">이번 주</option>
            <option value="month">이번 달</option>
            <option value="year">올해</option>
          </select>
        </div>
      )}
    </div>
  );
}
