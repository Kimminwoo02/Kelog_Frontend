import PostCard from "@/components/PostCard";
import TrendingTabs from "@/components/TrendingTabs";
import Sidebar from "@/components/Sidebar";
import { PostCardData, toPostCardData, Post } from "@/lib/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// 서버에서 포스트 데이터 가져오기
async function getPosts(): Promise<PostCardData[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/posts?page=0&size=20`, {
      next: { revalidate: 60 }, // 60초마다 재검증
      cache: "no-store", // 개발 중에는 캐시 비활성화
    });

    if (!response.ok) {
      // 서버 에러 시 더미 데이터 반환
      console.log("Backend server not responding, using dummy data");
      return dummyPosts;
    }

    const data = await response.json();

    // API 응답 구조에 따라 변환
    if (data.data && data.data.content) {
      return data.data.content.map((post: Post) => toPostCardData(post));
    }

    // 데이터가 없으면 더미 데이터
    return dummyPosts;
  } catch (error) {
    // 네트워크 에러 등 - 서버가 꺼져 있을 때
    console.log("Backend server unavailable, using dummy data");
    return dummyPosts;
  }
}

// 더미 데이터 (API 실패 시 fallback)
const dummyPosts: PostCardData[] = [
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
    id: "2",
    title: "Spring Boot 3.2와 Virtual Thread 완벽 가이드",
    description: "Java 21의 Virtual Thread를 Spring Boot에서 어떻게 활용할 수 있는지 알아봅니다. 기존 Thread Pool 방식과의 차이점과 성능 비교도 함께 다룹니다.",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop",
    author: {
      name: "박스프링",
      username: "springpark",
    },
    createdAt: "2024년 1월 14일",
    tags: ["Spring Boot", "Java", "백엔드"],
    likes: 189,
    comments: 23,
  },
  {
    id: "3",
    title: "TypeScript 5.4 새로운 기능 정리",
    description: "TypeScript 5.4에서 추가된 NoInfer 유틸리티 타입과 개선된 타입 추론에 대해 알아봅니다.",
    author: {
      name: "이타입",
      username: "typelei",
    },
    createdAt: "2024년 1월 13일",
    tags: ["TypeScript", "JavaScript"],
    likes: 156,
    comments: 12,
  },
  {
    id: "4",
    title: "Docker Compose로 로컬 개발 환경 구축하기",
    description: "Docker Compose를 사용하여 PostgreSQL, Redis, Kafka 등 다양한 서비스를 포함한 로컬 개발 환경을 손쉽게 구축하는 방법을 소개합니다.",
    thumbnail: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop",
    author: {
      name: "정도커",
      username: "dockerjung",
    },
    createdAt: "2024년 1월 12일",
    tags: ["Docker", "DevOps", "인프라"],
    likes: 312,
    comments: 27,
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
    id: "6",
    title: "Kubernetes 입문자를 위한 핵심 개념 정리",
    description: "쿠버네티스를 처음 시작하는 분들을 위해 Pod, Service, Deployment 등 핵심 개념들을 쉽게 설명합니다.",
    thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop",
    author: {
      name: "한쿠버",
      username: "kuberhan",
    },
    createdAt: "2024년 1월 10일",
    tags: ["Kubernetes", "DevOps", "컨테이너"],
    likes: 267,
    comments: 19,
  },
];

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen">
      <div className="max-w-[1728px] mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Tabs */}
            <TrendingTabs />

            {/* Post Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Empty State */}
            {posts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-[var(--text-secondary)]">아직 작성된 글이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
