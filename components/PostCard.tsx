import Link from "next/link";
import Image from "next/image";
import { PostCardData } from "@/lib/types";

interface PostCardProps {
  post: PostCardData;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-[var(--card-bg)] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Thumbnail */}
      {post.thumbnail && (
        <Link href={`/post/${post.id}`} className="block">
          <div className="relative w-full pt-[52%]">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        </Link>
      )}

      {/* Content */}
      <div className="p-4">
        <Link href={`/post/${post.id}`}>
          <h2 className="text-lg font-bold text-[var(--foreground)] mb-2 line-clamp-2 hover:text-[var(--primary)] transition-colors">
            {post.title}
          </h2>
        </Link>
        <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-3">
          {post.description}
        </p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="px-2 py-1 text-xs rounded bg-[var(--hover-bg)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Date & Stats */}
        <div className="text-xs text-[var(--text-tertiary)] mb-4">
          <span>{post.createdAt}</span>
          <span className="mx-1">·</span>
          <span>{post.comments}개의 댓글</span>
        </div>

        {/* Separator */}
        <div className="border-t border-[var(--border-color)] pt-3 -mx-4 px-4">
          {/* Author & Likes */}
          <div className="flex items-center justify-between">
            <Link
              href={`/user/${post.author.username}`}
              className="flex items-center gap-2 hover:text-[var(--foreground)] transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-[var(--hover-bg)] overflow-hidden flex items-center justify-center">
                {post.author.avatar ? (
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={24}
                    height={24}
                    className="object-cover"
                  />
                ) : (
                  <span className="text-xs text-[var(--text-tertiary)]">
                    {post.author.name[0]}
                  </span>
                )}
              </div>
              <span className="text-xs text-[var(--text-secondary)] font-medium">
                by <span className="font-bold">{post.author.name}</span>
              </span>
            </Link>
            <div className="flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>{post.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// 기존 Post 타입을 위한 re-export (호환성 유지)
export type { PostCardData as Post } from "@/lib/types";
