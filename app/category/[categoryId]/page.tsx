import PostCard, { Post } from "@/components/PostCard";
import Sidebar, { Category } from "@/components/Sidebar";

// 더미 데이터 (나중에 SpringBoot API로 대체)
const categories: Record<string, { name: string; icon: string; description: string }> = {
  react: { name: "React", icon: "⚛️", description: "React 관련 글 모음" },
  nextjs: { name: "Next.js", icon: "▲", description: "Next.js 관련 글 모음" },
  typescript: { name: "TypeScript", icon: "📘", description: "TypeScript 관련 글 모음" },
  spring: { name: "Spring", icon: "🌱", description: "Spring Framework 관련 글 모음" },
  java: { name: "Java", icon: "☕", description: "Java 관련 글 모음" },
  python: { name: "Python", icon: "🐍", description: "Python 관련 글 모음" },
  docker: { name: "Docker", icon: "🐳", description: "Docker 관련 글 모음" },
  kubernetes: { name: "Kubernetes", icon: "☸️", description: "Kubernetes 관련 글 모음" },
  daily: { name: "업무일지", icon: "📝", description: "일일 업무 기록" },
  project: { name: "프로젝트", icon: "📁", description: "프로젝트 진행 기록" },
  review: { name: "회고", icon: "🔄", description: "주간/월간/연간 회고" },
  til: { name: "TIL", icon: "💡", description: "Today I Learned" },
};

const dummyPosts: Post[] = [
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
    id: "5",
    title: "React Query vs SWR 실전 비교",
    description: "서버 상태 관리 라이브러리 React Query와 SWR의 차이점을 실제 프로젝트 경험을 바탕으로 비교 분석합니다.",
    author: {
      name: "최리액트",
      username: "reactchoi",
    },
    createdAt: "2024년 1월 11일",
    tags: ["React", "React Query", "SWR"],
    likes: 198,
    comments: 34,
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
];

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  const category = categories[categoryId];

  // TODO: SpringBoot API에서 해당 카테고리의 포스트 가져오기
  const posts = dummyPosts;

  if (!category) {
    return (
      <main className="min-h-screen">
        <div className="max-w-[1728px] mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">
            카테고리를 찾을 수 없습니다
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-[1728px] mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <Sidebar selectedCategory={categoryId} />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Category Header */}
            <div className="mb-8 pb-6 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{category.icon}</span>
                <h1 className="text-3xl font-bold text-[var(--foreground)]">
                  {category.name}
                </h1>
              </div>
              <p className="text-[var(--text-secondary)]">{category.description}</p>
              <p className="text-sm text-[var(--text-tertiary)] mt-2">
                {posts.length}개의 포스트
              </p>
            </div>

            {/* Sort Options */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button className="text-[var(--foreground)] font-medium">최신순</button>
                <button className="text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]">인기순</button>
              </div>
            </div>

            {/* Post List */}
            <div className="space-y-6">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-[var(--card-bg)] rounded-lg p-6 border border-[var(--border-color)] hover:border-[var(--primary)] transition-colors"
                >
                  <div className="flex gap-6">
                    {post.thumbnail && (
                      <div className="flex-shrink-0 w-48 h-32 rounded-lg overflow-hidden bg-[var(--hover-bg)]">
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <a href={`/post/${post.id}`}>
                        <h2 className="text-xl font-bold text-[var(--foreground)] mb-2 hover:text-[var(--primary)] transition-colors">
                          {post.title}
                        </h2>
                      </a>
                      <p className="text-[var(--text-secondary)] mb-3 line-clamp-2">
                        {post.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-xs rounded bg-[var(--hover-bg)] text-[var(--primary)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-[var(--text-tertiary)]">
                        <a href={`/user/${post.author.username}`} className="hover:text-[var(--foreground)]">
                          {post.author.name}
                        </a>
                        <span>·</span>
                        <span>{post.createdAt}</span>
                        <span>·</span>
                        <div className="flex items-center gap-1">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                          {post.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                          {post.comments}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
