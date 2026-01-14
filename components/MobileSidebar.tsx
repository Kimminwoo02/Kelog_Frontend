"use client";

import { useState } from "react";
import Link from "next/link";
import { Category } from "./Sidebar";

// 더미 데이터 (나중에 SpringBoot API로 대체)
const defaultCategories: Category[] = [
  { id: "react", name: "React", icon: "⚛️", count: 12, type: "tech" },
  { id: "nextjs", name: "Next.js", icon: "▲", count: 8, type: "tech" },
  { id: "typescript", name: "TypeScript", icon: "📘", count: 15, type: "tech" },
  { id: "spring", name: "Spring", icon: "🌱", count: 6, type: "tech" },
  { id: "java", name: "Java", icon: "☕", count: 9, type: "tech" },
  { id: "python", name: "Python", icon: "🐍", count: 4, type: "tech" },
  { id: "docker", name: "Docker", icon: "🐳", count: 3, type: "tech" },
  { id: "kubernetes", name: "Kubernetes", icon: "☸️", count: 2, type: "tech" },
  { id: "daily", name: "업무일지", icon: "📝", count: 24, type: "work" },
  { id: "project", name: "프로젝트", icon: "📁", count: 7, type: "work" },
  { id: "review", name: "회고", icon: "🔄", count: 5, type: "work" },
  { id: "til", name: "TIL", icon: "💡", count: 18, type: "work" },
];

export default function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTechOpen, setIsTechOpen] = useState(true);
  const [isWorkOpen, setIsWorkOpen] = useState(true);

  const techCategories = defaultCategories.filter((c) => c.type === "tech");
  const workCategories = defaultCategories.filter((c) => c.type === "work");

  return (
    <>
      {/* Toggle Button - Only visible on mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 left-6 z-40 w-14 h-14 bg-[var(--primary)] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[var(--primary-dark)] transition-colors"
        aria-label="카테고리 열기"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-[var(--card-bg)] transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
          <h2 className="text-lg font-bold text-[var(--foreground)]">카테고리</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-[var(--hover-bg)] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
          {/* 전체 글 */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between px-4 py-3 rounded-lg bg-[var(--primary)] text-white mb-4"
          >
            <span className="font-medium">전체 글</span>
            <span className="text-sm text-white/80">
              {defaultCategories.reduce((sum, c) => sum + c.count, 0)}
            </span>
          </Link>

          {/* 기술 카테고리 */}
          <div className="mb-4">
            <button
              onClick={() => setIsTechOpen(!isTechOpen)}
              className="w-full flex items-center justify-between px-4 py-2 text-sm font-bold text-[var(--text-secondary)]"
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
                  <Link
                    key={category.id}
                    href={`/category/${category.id}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-[var(--hover-bg)] text-[var(--foreground)]"
                  >
                    <div className="flex items-center gap-2">
                      {category.icon && <span>{category.icon}</span>}
                      <span className="text-sm">{category.name}</span>
                    </div>
                    <span className="text-xs text-[var(--text-tertiary)]">{category.count}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 업무 카테고리 */}
          <div>
            <button
              onClick={() => setIsWorkOpen(!isWorkOpen)}
              className="w-full flex items-center justify-between px-4 py-2 text-sm font-bold text-[var(--text-secondary)]"
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
                  <Link
                    key={category.id}
                    href={`/category/${category.id}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-[var(--hover-bg)] text-[var(--foreground)]"
                  >
                    <div className="flex items-center gap-2">
                      {category.icon && <span>{category.icon}</span>}
                      <span className="text-sm">{category.name}</span>
                    </div>
                    <span className="text-xs text-[var(--text-tertiary)]">{category.count}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
