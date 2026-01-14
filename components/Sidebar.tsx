"use client";

import Link from "next/link";
import { useState } from "react";

export interface Category {
  id: string;
  name: string;
  icon?: string;
  count: number;
  type: "tech" | "work" | "custom";
}

// 더미 데이터 (나중에 SpringBoot API로 대체)
const defaultCategories: Category[] = [
  // 기술 카테고리
  { id: "react", name: "React", icon: "⚛️", count: 12, type: "tech" },
  { id: "nextjs", name: "Next.js", icon: "▲", count: 8, type: "tech" },
  { id: "typescript", name: "TypeScript", icon: "📘", count: 15, type: "tech" },
  { id: "spring", name: "Spring", icon: "🌱", count: 6, type: "tech" },
  { id: "java", name: "Java", icon: "☕", count: 9, type: "tech" },
  { id: "python", name: "Python", icon: "🐍", count: 4, type: "tech" },
  { id: "docker", name: "Docker", icon: "🐳", count: 3, type: "tech" },
  { id: "kubernetes", name: "Kubernetes", icon: "☸️", count: 2, type: "tech" },
  // 업무 카테고리
  { id: "daily", name: "업무일지", icon: "📝", count: 24, type: "work" },
  { id: "project", name: "프로젝트", icon: "📁", count: 7, type: "work" },
  { id: "review", name: "회고", icon: "🔄", count: 5, type: "work" },
  { id: "til", name: "TIL", icon: "💡", count: 18, type: "work" },
];

interface SidebarProps {
  categories?: Category[];
  selectedCategory?: string;
}

export default function Sidebar({ categories = defaultCategories, selectedCategory }: SidebarProps) {
  const [isTechOpen, setIsTechOpen] = useState(true);
  const [isWorkOpen, setIsWorkOpen] = useState(true);

  const techCategories = categories.filter((c) => c.type === "tech");
  const workCategories = categories.filter((c) => c.type === "work");

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block">
      <div className="sticky top-20 space-y-6">
        {/* 전체 글 */}
        <Link
          href="/"
          className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
            !selectedCategory
              ? "bg-[var(--primary)] text-white"
              : "hover:bg-[var(--hover-bg)] text-[var(--foreground)]"
          }`}
        >
          <span className="font-medium">전체 글</span>
          <span className={`text-sm ${!selectedCategory ? "text-white/80" : "text-[var(--text-tertiary)]"}`}>
            {categories.reduce((sum, c) => sum + c.count, 0)}
          </span>
        </Link>

        {/* 기술 카테고리 */}
        <div>
          <button
            onClick={() => setIsTechOpen(!isTechOpen)}
            className="w-full flex items-center justify-between px-4 py-2 text-sm font-bold text-[var(--text-secondary)] hover:text-[var(--foreground)]"
          >
            <span>기술</span>
            <svg
              className={`w-4 h-4 transition-transform ${isTechOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isTechOpen && (
            <div className="mt-1 space-y-1">
              {techCategories.map((category) => (
                <CategoryItem
                  key={category.id}
                  category={category}
                  isSelected={selectedCategory === category.id}
                />
              ))}
            </div>
          )}
        </div>

        {/* 업무 카테고리 */}
        <div>
          <button
            onClick={() => setIsWorkOpen(!isWorkOpen)}
            className="w-full flex items-center justify-between px-4 py-2 text-sm font-bold text-[var(--text-secondary)] hover:text-[var(--foreground)]"
          >
            <span>업무</span>
            <svg
              className={`w-4 h-4 transition-transform ${isWorkOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isWorkOpen && (
            <div className="mt-1 space-y-1">
              {workCategories.map((category) => (
                <CategoryItem
                  key={category.id}
                  category={category}
                  isSelected={selectedCategory === category.id}
                />
              ))}
            </div>
          )}
        </div>

        {/* 카테고리 관리 버튼 */}
        <div className="pt-4 border-t border-[var(--border-color)]">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-[var(--text-tertiary)] hover:text-[var(--primary)] hover:bg-[var(--hover-bg)] rounded-lg transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            카테고리 관리
          </button>
        </div>
      </div>
    </aside>
  );
}

function CategoryItem({ category, isSelected }: { category: Category; isSelected: boolean }) {
  return (
    <Link
      href={`/category/${category.id}`}
      className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
        isSelected
          ? "bg-[var(--primary)]/10 text-[var(--primary)]"
          : "hover:bg-[var(--hover-bg)] text-[var(--foreground)]"
      }`}
    >
      <div className="flex items-center gap-2">
        {category.icon && <span className="text-base">{category.icon}</span>}
        <span className="text-sm">{category.name}</span>
      </div>
      <span className={`text-xs ${isSelected ? "text-[var(--primary)]" : "text-[var(--text-tertiary)]"}`}>
        {category.count}
      </span>
    </Link>
  );
}
