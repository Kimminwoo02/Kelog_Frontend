"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { postApi } from "@/lib/api";

export default function WritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handlePublish = async () => {
    if (!title.trim()) {
      setError("제목을 입력해주세요.");
      return;
    }
    if (!content.trim()) {
      setError("내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await postApi.createPost({
        title,
        content,
        description,
        isPublic,
        tags,
      });
      router.push(`/post/${response.data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "글 발행에 실패했습니다. 로그인이 필요할 수 있습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--card-bg)] flex flex-col">
      {/* Editor Header */}
      <header className="h-14 border-b border-[var(--border-color)] px-4 flex items-center justify-between">
        <Link href="/" className="text-[var(--text-secondary)] hover:text-[var(--foreground)]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className="flex items-center gap-3">
          <button className="px-4 py-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors">
            임시저장
          </button>
          <button
            onClick={() => setIsPublishModalOpen(true)}
            className="px-4 py-1.5 text-sm bg-[var(--primary)] text-white rounded font-medium hover:bg-[var(--primary-dark)] transition-colors"
          >
            출간하기
          </button>
        </div>
      </header>

      {/* Editor Body */}
      <main className="flex-1 flex">
        {/* Write Section */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-3xl mx-auto">
            {/* Title Input */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              className="w-full text-4xl font-bold bg-transparent border-none outline-none text-[var(--foreground)] placeholder-[var(--text-tertiary)] mb-4"
            />

            {/* Title Underline */}
            <div className="w-16 h-1.5 bg-[var(--text-secondary)] rounded mb-4" />

            {/* Tags Input */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-3 py-1 rounded bg-[var(--hover-bg)] text-[var(--primary)] text-sm"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-1 text-[var(--text-tertiary)] hover:text-[var(--foreground)]"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="태그를 입력하세요"
                className="flex-1 min-w-[100px] bg-transparent border-none outline-none text-[var(--foreground)] placeholder-[var(--text-tertiary)] text-sm"
              />
            </div>

            {/* Markdown Toolbar */}
            <div className="flex items-center gap-1 mb-4 pb-4 border-b border-[var(--border-color)]">
              <ToolbarButton title="제목 1" onClick={() => insertMarkdown("# ")}>H<sub>1</sub></ToolbarButton>
              <ToolbarButton title="제목 2" onClick={() => insertMarkdown("## ")}>H<sub>2</sub></ToolbarButton>
              <ToolbarButton title="제목 3" onClick={() => insertMarkdown("### ")}>H<sub>3</sub></ToolbarButton>
              <ToolbarButton title="제목 4" onClick={() => insertMarkdown("#### ")}>H<sub>4</sub></ToolbarButton>
              <div className="w-px h-4 bg-[var(--border-color)] mx-2" />
              <ToolbarButton title="굵게" onClick={() => wrapText("**")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" />
                </svg>
              </ToolbarButton>
              <ToolbarButton title="기울임" onClick={() => wrapText("*")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z" />
                </svg>
              </ToolbarButton>
              <ToolbarButton title="취소선" onClick={() => wrapText("~~")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z" />
                </svg>
              </ToolbarButton>
              <div className="w-px h-4 bg-[var(--border-color)] mx-2" />
              <ToolbarButton title="인용" onClick={() => insertMarkdown("> ")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                </svg>
              </ToolbarButton>
              <ToolbarButton title="링크" onClick={() => insertMarkdown("[링크텍스트](url)")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
                </svg>
              </ToolbarButton>
              <ToolbarButton title="이미지" onClick={() => insertMarkdown("![이미지설명](url)")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                </svg>
              </ToolbarButton>
              <ToolbarButton title="코드블록" onClick={() => insertMarkdown("```\n코드를 입력하세요\n```")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                </svg>
              </ToolbarButton>
            </div>

            {/* Content Textarea */}
            <textarea
              id="content-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="당신의 이야기를 적어보세요..."
              className="w-full min-h-[500px] bg-transparent border-none outline-none text-[var(--foreground)] placeholder-[var(--text-tertiary)] text-lg leading-relaxed resize-none"
            />
          </div>
        </div>

        {/* Preview Section (Hidden on mobile) */}
        <div className="hidden lg:block flex-1 bg-[var(--background)] border-l border-[var(--border-color)] p-8 overflow-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-[var(--foreground)] mb-8">
              {title || "제목을 입력하세요"}
            </h1>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded bg-[var(--hover-bg)] text-[var(--primary)] text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="text-[var(--text-secondary)] text-lg leading-relaxed whitespace-pre-wrap">
              {content || "당신의 이야기를 적어보세요..."}
            </div>
          </div>
        </div>
      </main>

      {/* Publish Modal */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[var(--card-bg)] rounded-lg w-full max-w-xl mx-4 p-6">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">
              포스트 미리보기
            </h2>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-3 rounded-lg bg-red-100 text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Thumbnail Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                포스트 썸네일
              </label>
              <div className="border-2 border-dashed border-[var(--border-color)] rounded-lg p-8 text-center hover:border-[var(--primary)] transition-colors cursor-pointer">
                <svg className="mx-auto mb-2 text-[var(--text-tertiary)]" width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                </svg>
                <p className="text-sm text-[var(--text-tertiary)]">
                  클릭하여 썸네일을 업로드하세요
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                포스트 설명
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="포스트를 짧게 소개해보세요"
                className="w-full h-24 p-3 rounded-lg bg-[var(--background)] border border-[var(--border-color)] text-[var(--foreground)] placeholder-[var(--text-tertiary)] resize-none focus:outline-none focus:border-[var(--primary)]"
              />
            </div>

            {/* Public/Private Toggle */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                공개 설정
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    checked={isPublic}
                    onChange={() => setIsPublic(true)}
                    className="text-[var(--primary)]"
                  />
                  <span className="text-[var(--foreground)]">전체 공개</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    checked={!isPublic}
                    onChange={() => setIsPublic(false)}
                    className="text-[var(--primary)]"
                  />
                  <span className="text-[var(--foreground)]">비공개</span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsPublishModalOpen(false)}
                className="px-6 py-2 text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors"
              >
                취소
              </button>
              <button
                onClick={handlePublish}
                disabled={isSubmitting}
                className="px-6 py-2 bg-[var(--primary)] text-white rounded font-medium hover:bg-[var(--primary-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "발행 중..." : "출간하기"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  function insertMarkdown(markdown: string) {
    const textarea = document.getElementById("content-textarea") as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent = content.slice(0, start) + markdown + content.slice(end);
      setContent(newContent);
      // 커서 위치 조정
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + markdown.length, start + markdown.length);
      }, 0);
    }
  }

  function wrapText(wrapper: string) {
    const textarea = document.getElementById("content-textarea") as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = content.slice(start, end) || "텍스트";
      const newContent = content.slice(0, start) + wrapper + selectedText + wrapper + content.slice(end);
      setContent(newContent);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + wrapper.length, start + wrapper.length + selectedText.length);
      }, 0);
    }
  }
}

function ToolbarButton({ children, title, onClick }: { children: React.ReactNode; title: string; onClick?: () => void }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className="w-8 h-8 flex items-center justify-center rounded text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--foreground)] transition-colors"
    >
      {children}
    </button>
  );
}
