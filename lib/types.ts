// ===== 공통 타입 =====
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
  path: string;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface ErrorResponse {
  status: number;
  code: string;
  message: string;
  path: string;
  timestamp: string;
  fieldErrors?: FieldError[];
}

export interface FieldError {
  field: string;
  message: string;
}

// ===== 사용자 관련 타입 =====
export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  githubUrl?: string;
  twitterUrl?: string;
  websiteUrl?: string;
  followerCount: number;
  followingCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthorInfo {
  id: number;
  username: string;
  name: string;
  avatar?: string;
}

export interface UserInfo {
  id: number;
  username: string;
  name: string;
  avatar?: string;
}

// ===== 인증 관련 타입 =====
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  name: string;
  email: string;
  password: string;
}

export interface JwtResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: UserInfo;
}

// ===== 포스트 관련 타입 =====
export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  description?: string;
  thumbnail?: string;
  viewCount: number;
  isPublic: boolean;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  author: AuthorInfo;
  tags: string[];
  series?: SeriesInfo;
}

export interface PostRequest {
  title: string;
  content: string;
  description?: string;
  thumbnail?: string;
  isPublic?: boolean;
  tags?: string[];
  seriesId?: number;
}

export interface SeriesInfo {
  id: number;
  title: string;
}

// ===== 댓글 관련 타입 =====
export interface Comment {
  id: number;
  content: string;
  likeCount: number;
  user: UserInfo;
  replies?: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface CommentRequest {
  content: string;
  parentId?: number;
}

// ===== 시리즈 관련 타입 =====
export interface Series {
  id: number;
  title: string;
  description?: string;
  thumbnail?: string;
  postCount: number;
  user: UserInfo;
  createdAt: string;
  updatedAt: string;
}

// ===== 카테고리 관련 타입 =====
export interface Category {
  id: string;
  name: string;
  icon?: string;
  count: number;
  type: "tech" | "work" | "custom";
}

// ===== 프론트엔드 전용 타입 (PostCard 등에서 사용) =====
export interface PostCardData {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  author: {
    name: string;
    avatar?: string;
    username: string;
  };
  createdAt: string;
  tags: string[];
  likes: number;
  comments: number;
}

// Post -> PostCardData 변환 함수
export function toPostCardData(post: Post): PostCardData {
  return {
    id: post.id.toString(),
    title: post.title,
    description: post.description || "",
    thumbnail: post.thumbnail,
    author: {
      name: post.author.name,
      avatar: post.author.avatar,
      username: post.author.username,
    },
    createdAt: formatDate(post.createdAt),
    tags: post.tags,
    likes: post.likeCount,
    comments: post.commentCount,
  };
}

// 날짜 포맷 함수
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
}
