import Image from "next/image";
import Link from "next/link";
import PostCard, { Post } from "@/components/PostCard";

// 더미 데이터 (나중에 SpringBoot API로 대체)
const dummyUser = {
  username: "devkim",
  name: "김개발",
  bio: "프론트엔드 개발자 | React, Next.js, TypeScript를 좋아합니다. 매일 조금씩 성장하는 개발자가 되고 싶습니다.",
  avatar: null,
  socialLinks: {
    github: "https://github.com/devkim",
    twitter: "https://twitter.com/devkim",
    email: "devkim@example.com",
  },
  stats: {
    posts: 42,
    followers: 1234,
    following: 56,
  },
};

const dummyUserPosts: Post[] = [
  {
    id: "1",
    title: "Next.js 15에서 달라진 점들 - App Router의 완성",
    description: "Next.js 15가 출시되면서 App Router가 더욱 안정화되었습니다. 이번 글에서는 주요 변경사항과 새로운 기능들을 살펴보겠습니다.",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
    author: {
      name: "김개발",
      username: "devkim",
    },
    createdAt: "2024년 1월 15일",
    tags: ["Next.js", "React", "프론트엔드"],
    likes: 234,
    comments: 18,
  },
  {
    id: "7",
    title: "React Server Components 깊이 이해하기",
    description: "RSC의 동작 원리와 클라이언트 컴포넌트와의 차이점을 자세히 알아봅니다.",
    author: {
      name: "김개발",
      username: "devkim",
    },
    createdAt: "2024년 1월 8일",
    tags: ["React", "RSC", "서버 컴포넌트"],
    likes: 189,
    comments: 15,
  },
  {
    id: "8",
    title: "Tailwind CSS v4 마이그레이션 가이드",
    description: "Tailwind CSS v4로 업그레이드하면서 알게 된 것들을 공유합니다.",
    thumbnail: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=400&fit=crop",
    author: {
      name: "김개발",
      username: "devkim",
    },
    createdAt: "2024년 1월 5일",
    tags: ["Tailwind CSS", "CSS", "프론트엔드"],
    likes: 156,
    comments: 12,
  },
];

const dummySeries = [
  {
    id: "s1",
    title: "Next.js 마스터하기",
    postCount: 8,
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop",
  },
  {
    id: "s2",
    title: "React 디자인 패턴",
    postCount: 5,
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
  },
];

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  // TODO: SpringBoot API에서 사용자 데이터 가져오기
  const user = dummyUser;
  const posts = dummyUserPosts;
  const series = dummySeries;

  return (
    <main className="min-h-screen">
      {/* Profile Header */}
      <div className="bg-[var(--card-bg)] border-b border-[var(--border-color)]">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full bg-[var(--hover-bg)] flex items-center justify-center overflow-hidden">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={128}
                  height={128}
                  className="object-cover"
                />
              ) : (
                <span className="text-5xl text-[var(--text-secondary)]">
                  {user.name[0]}
                </span>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
                {user.name}
              </h1>
              <p className="text-[var(--text-secondary)] mb-4 max-w-xl">
                {user.bio}
              </p>

              {/* Social Links */}
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
                {user.socialLinks.github && (
                  <a
                    href={user.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-[var(--hover-bg)] transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                )}
                {user.socialLinks.twitter && (
                  <a
                    href={user.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-[var(--hover-bg)] transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                )}
                {user.socialLinks.email && (
                  <a
                    href={`mailto:${user.socialLinks.email}`}
                    className="p-2 rounded-full hover:bg-[var(--hover-bg)] transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </a>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-center sm:justify-start gap-6 text-sm">
                <div>
                  <span className="font-bold text-[var(--foreground)]">{user.stats.posts}</span>
                  <span className="text-[var(--text-secondary)] ml-1">포스트</span>
                </div>
                <div>
                  <span className="font-bold text-[var(--foreground)]">{user.stats.followers.toLocaleString()}</span>
                  <span className="text-[var(--text-secondary)] ml-1">팔로워</span>
                </div>
                <div>
                  <span className="font-bold text-[var(--foreground)]">{user.stats.following}</span>
                  <span className="text-[var(--text-secondary)] ml-1">팔로잉</span>
                </div>
              </div>
            </div>

            {/* Follow Button */}
            <button className="px-6 py-2 rounded bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-dark)] transition-colors">
              팔로우
            </button>
          </div>
        </div>
      </div>

      {/* Content Tabs & Posts */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-[var(--border-color)] mb-8">
          <button className="pb-3 px-1 font-bold text-[var(--foreground)] border-b-2 border-[var(--foreground)]">
            글
          </button>
          <button className="pb-3 px-1 text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]">
            시리즈
          </button>
          <button className="pb-3 px-1 text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]">
            소개
          </button>
        </div>

        {/* Series Section */}
        {series.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-4">시리즈</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {series.map((s) => (
                <Link
                  key={s.id}
                  href={`/user/${username}/series/${s.id}`}
                  className="flex gap-4 p-4 bg-[var(--card-bg)] rounded-lg border border-[var(--border-color)] hover:border-[var(--primary)] transition-colors"
                >
                  {s.thumbnail && (
                    <div className="relative w-20 h-20 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={s.thumbnail}
                        alt={s.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-[var(--foreground)] mb-1">{s.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">{s.postCount}개의 포스트</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Posts Grid */}
        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col sm:flex-row gap-6 pb-8 border-b border-[var(--border-color)]"
            >
              {post.thumbnail && (
                <Link href={`/post/${post.id}`} className="flex-shrink-0">
                  <div className="relative w-full sm:w-48 h-32 rounded-lg overflow-hidden">
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
              )}
              <div className="flex-1">
                <Link href={`/post/${post.id}`}>
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-2 hover:text-[var(--primary)] transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-[var(--text-secondary)] mb-3 line-clamp-2">
                  {post.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${tag}`}
                      className="px-2 py-0.5 text-xs rounded bg-[var(--hover-bg)] text-[var(--primary)]"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-sm text-[var(--text-tertiary)]">
                  <span>{post.createdAt}</span>
                  <span>·</span>
                  <span>{post.comments}개의 댓글</span>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    {post.likes}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
