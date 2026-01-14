import {
  ApiResponse,
  PageResponse,
  Post,
  PostRequest,
  User,
  Comment,
  CommentRequest,
  Series,
  JwtResponse,
  LoginRequest,
  RegisterRequest,
} from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// ===== 토큰 관리 =====
let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
  if (typeof window !== "undefined") {
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
    }
  }
}

export function getAccessToken(): string | null {
  if (accessToken) return accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
  }
  return accessToken;
}

// ===== API 클라이언트 =====
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAccessToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include", // CORS credentials 포함
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: "요청 처리 중 오류가 발생했습니다.",
    }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

// ===== 인증 API =====
export const authApi = {
  login: async (data: LoginRequest): Promise<ApiResponse<JwtResponse>> => {
    const response = await fetchApi<ApiResponse<JwtResponse>>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (response.data.accessToken) {
      setAccessToken(response.data.accessToken);
    }
    return response;
  },

  register: async (data: RegisterRequest): Promise<ApiResponse<JwtResponse>> => {
    const response = await fetchApi<ApiResponse<JwtResponse>>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (response.data.accessToken) {
      setAccessToken(response.data.accessToken);
    }
    return response;
  },

  refresh: async (refreshToken: string): Promise<ApiResponse<JwtResponse>> => {
    return fetchApi<ApiResponse<JwtResponse>>("/api/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });
  },

  logout: () => {
    setAccessToken(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("refreshToken");
    }
  },
};

// ===== 포스트 API =====
export const postApi = {
  // 포스트 목록 조회 (페이징)
  getPosts: async (page = 0, size = 20): Promise<ApiResponse<PageResponse<Post>>> => {
    return fetchApi<ApiResponse<PageResponse<Post>>>(`/api/posts?page=${page}&size=${size}`);
  },

  // 트렌딩 포스트 조회
  getTrendingPosts: async (
    period: "day" | "week" | "month" | "year" = "week",
    page = 0,
    size = 20
  ): Promise<ApiResponse<PageResponse<Post>>> => {
    return fetchApi<ApiResponse<PageResponse<Post>>>(
      `/api/posts/trending?period=${period}&page=${page}&size=${size}`
    );
  },

  // 포스트 상세 조회 (ID)
  getPost: async (id: number): Promise<ApiResponse<Post>> => {
    return fetchApi<ApiResponse<Post>>(`/api/posts/${id}`);
  },

  // 포스트 상세 조회 (Slug)
  getPostBySlug: async (slug: string): Promise<ApiResponse<Post>> => {
    return fetchApi<ApiResponse<Post>>(`/api/posts/slug/${slug}`);
  },

  // 포스트 검색
  searchPosts: async (
    keyword: string,
    page = 0,
    size = 20
  ): Promise<ApiResponse<PageResponse<Post>>> => {
    return fetchApi<ApiResponse<PageResponse<Post>>>(
      `/api/posts/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=${size}`
    );
  },

  // 태그별 포스트 조회
  getPostsByTag: async (
    tagName: string,
    page = 0,
    size = 20
  ): Promise<ApiResponse<PageResponse<Post>>> => {
    return fetchApi<ApiResponse<PageResponse<Post>>>(
      `/api/posts/tag/${encodeURIComponent(tagName)}?page=${page}&size=${size}`
    );
  },

  // 포스트 작성
  createPost: async (data: PostRequest): Promise<ApiResponse<Post>> => {
    return fetchApi<ApiResponse<Post>>("/api/posts", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // 포스트 수정
  updatePost: async (id: number, data: PostRequest): Promise<ApiResponse<Post>> => {
    return fetchApi<ApiResponse<Post>>(`/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  // 포스트 삭제
  deletePost: async (id: number): Promise<ApiResponse<void>> => {
    return fetchApi<ApiResponse<void>>(`/api/posts/${id}`, {
      method: "DELETE",
    });
  },

  // 포스트 좋아요
  likePost: async (id: number): Promise<ApiResponse<void>> => {
    return fetchApi<ApiResponse<void>>(`/api/posts/${id}/like`, {
      method: "POST",
    });
  },

  // 포스트 좋아요 취소
  unlikePost: async (id: number): Promise<ApiResponse<void>> => {
    return fetchApi<ApiResponse<void>>(`/api/posts/${id}/like`, {
      method: "DELETE",
    });
  },
};

// ===== 사용자 API =====
export const userApi = {
  // 사용자 프로필 조회
  getUser: async (username: string): Promise<ApiResponse<User>> => {
    return fetchApi<ApiResponse<User>>(`/api/users/${username}`);
  },

  // 사용자 게시글 목록 조회
  getUserPosts: async (
    username: string,
    page = 0,
    size = 20
  ): Promise<ApiResponse<PageResponse<Post>>> => {
    return fetchApi<ApiResponse<PageResponse<Post>>>(
      `/api/users/${username}/posts?page=${page}&size=${size}`
    );
  },

  // 내 프로필 조회
  getMyProfile: async (): Promise<ApiResponse<User>> => {
    return fetchApi<ApiResponse<User>>("/api/users/me");
  },

  // 내 프로필 수정
  updateMyProfile: async (data: Partial<User>): Promise<ApiResponse<User>> => {
    return fetchApi<ApiResponse<User>>("/api/users/me", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  // 팔로우
  follow: async (username: string): Promise<ApiResponse<void>> => {
    return fetchApi<ApiResponse<void>>(`/api/users/${username}/follow`, {
      method: "POST",
    });
  },

  // 언팔로우
  unfollow: async (username: string): Promise<ApiResponse<void>> => {
    return fetchApi<ApiResponse<void>>(`/api/users/${username}/follow`, {
      method: "DELETE",
    });
  },
};

// ===== 댓글 API =====
export const commentApi = {
  // 포스트 댓글 목록 조회
  getComments: async (postId: number): Promise<ApiResponse<Comment[]>> => {
    return fetchApi<ApiResponse<Comment[]>>(`/api/comments/post/${postId}`);
  },

  // 댓글 작성
  createComment: async (
    postId: number,
    data: CommentRequest
  ): Promise<ApiResponse<Comment>> => {
    return fetchApi<ApiResponse<Comment>>(`/api/comments/post/${postId}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // 댓글 수정
  updateComment: async (
    commentId: number,
    data: CommentRequest
  ): Promise<ApiResponse<Comment>> => {
    return fetchApi<ApiResponse<Comment>>(`/api/comments/${commentId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  // 댓글 삭제
  deleteComment: async (commentId: number): Promise<ApiResponse<void>> => {
    return fetchApi<ApiResponse<void>>(`/api/comments/${commentId}`, {
      method: "DELETE",
    });
  },

  // 댓글 좋아요
  likeComment: async (commentId: number): Promise<ApiResponse<void>> => {
    return fetchApi<ApiResponse<void>>(`/api/comments/${commentId}/like`, {
      method: "POST",
    });
  },
};

// ===== 시리즈 API =====
export const seriesApi = {
  // 시리즈 상세 조회
  getSeries: async (id: number): Promise<ApiResponse<Series>> => {
    return fetchApi<ApiResponse<Series>>(`/api/series/${id}`);
  },

  // 사용자 시리즈 목록 조회
  getUserSeries: async (username: string): Promise<ApiResponse<Series[]>> => {
    return fetchApi<ApiResponse<Series[]>>(`/api/series/user/${username}`);
  },

  // 시리즈 생성
  createSeries: async (data: {
    title: string;
    description?: string;
    thumbnail?: string;
  }): Promise<ApiResponse<Series>> => {
    return fetchApi<ApiResponse<Series>>("/api/series", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // 시리즈 수정
  updateSeries: async (
    id: number,
    data: { title: string; description?: string; thumbnail?: string }
  ): Promise<ApiResponse<Series>> => {
    return fetchApi<ApiResponse<Series>>(`/api/series/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  // 시리즈 삭제
  deleteSeries: async (id: number): Promise<ApiResponse<void>> => {
    return fetchApi<ApiResponse<void>>(`/api/series/${id}`, {
      method: "DELETE",
    });
  },
};
