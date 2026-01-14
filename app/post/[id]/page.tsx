import Image from "next/image";
import Link from "next/link";
import { Post, Comment, formatDate } from "@/lib/types";
import CommentSection from "./CommentSection";
import LikeButton from "./LikeButton";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// 포스트 데이터 가져오기
async function getPost(id: string): Promise<Post | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

// 댓글 데이터 가져오기
async function getComments(postId: string): Promise<Comment[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/comments/post/${postId}`, {
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);
  const comments = await getComments(id);

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            포스트를 찾을 수 없습니다
          </h1>
          <Link href="/" className="text-[var(--primary)] hover:underline">
            홈으로 돌아가기
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero Image */}
      {post.thumbnail && (
        <div className="relative w-full h-[400px]">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <article className="max-w-3xl mx-auto px-4 py-8">
        {/* Title */}
        <h1 className="text-4xl font-bold text-[var(--foreground)] mb-8 leading-tight">
          {post.title}
        </h1>

        {/* Author & Meta */}
        <div className="flex items-center justify-between mb-8 pb-8 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-4">
            <Link href={`/user/${post.author.username}`}>
              <div className="w-12 h-12 rounded-full bg-[var(--hover-bg)] flex items-center justify-center overflow-hidden">
                {post.author.avatar ? (
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                ) : (
                  <span className="text-lg text-[var(--text-secondary)]">
                    {post.author.name[0]}
                  </span>
                )}
              </div>
            </Link>
            <div>
              <Link
                href={`/user/${post.author.username}`}
                className="font-bold text-[var(--foreground)] hover:underline"
              >
                {post.author.name}
              </Link>
              <p className="text-sm text-[var(--text-secondary)]">
                {formatDate(post.createdAt)}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="p-2 rounded hover:bg-[var(--hover-bg)] transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="px-3 py-1.5 rounded bg-[var(--hover-bg)] text-[var(--primary)] text-sm font-medium hover:bg-[var(--primary)] hover:text-white transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>

        {/* Content - Markdown 렌더링 */}
        <div className="prose prose-lg max-w-none text-[var(--foreground)] mb-12">
          <div
            className="whitespace-pre-wrap text-[var(--text-secondary)] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />
        </div>

        {/* Like Button */}
        <LikeButton postId={post.id} initialLikes={post.likeCount} />

        {/* Author Profile Card */}
        <div className="bg-[var(--card-bg)] rounded-lg p-6 border border-[var(--border-color)] mb-12">
          <div className="flex items-center gap-4">
            <Link href={`/user/${post.author.username}`}>
              <div className="w-16 h-16 rounded-full bg-[var(--hover-bg)] flex items-center justify-center overflow-hidden">
                {post.author.avatar ? (
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                ) : (
                  <span className="text-2xl text-[var(--text-secondary)]">
                    {post.author.name[0]}
                  </span>
                )}
              </div>
            </Link>
            <div className="flex-1">
              <Link
                href={`/user/${post.author.username}`}
                className="font-bold text-lg text-[var(--foreground)] hover:underline"
              >
                {post.author.name}
              </Link>
              <p className="text-sm text-[var(--text-secondary)]">@{post.author.username}</p>
            </div>
            <button className="px-4 py-2 rounded bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-dark)] transition-colors">
              팔로우
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <CommentSection postId={post.id} initialComments={comments} />
      </article>
    </main>
  );
}

// 간단한 마크다운 렌더링 함수
function renderMarkdown(content: string): string {
  return content
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold mt-8 mb-3 text-[var(--foreground)]">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mt-12 mb-4 text-[var(--foreground)]">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mt-12 mb-4 text-[var(--foreground)]">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="bg-[var(--hover-bg)] px-1.5 py-0.5 rounded text-sm">$1</code>')
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-[var(--hover-bg)] p-4 rounded-lg overflow-x-auto my-4"><code>$2</code></pre>')
    .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
    .replace(/\n\n/g, '</p><p class="my-4">')
    .replace(/\n/g, '<br>');
}
