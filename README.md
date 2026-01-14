# Kelog

Velog 스타일의 개발 블로그 플랫폼입니다.

## Tech Stack

### Frontend
- **Next.js** 16.1.1 (App Router)
- **React** 19.2.3
- **TypeScript** 5
- **Tailwind CSS** 4

### Backend
- **Spring Boot** 3.2.1
- **MySQL** 8.0
- **JWT** 인증
- **JPA/Hibernate**

## Features

- 포스트 작성/수정/삭제 (마크다운 에디터)
- 트렌딩/최신 포스트 조회
- 태그 기반 검색
- 카테고리별 포스트 분류
- 댓글 시스템
- 좋아요 기능
- 사용자 프로필
- 시리즈 기능
- 팔로우/팔로워
- 다크모드 지원
- 반응형 디자인

## Project Structure

```
kelog/
├── app/
│   ├── page.tsx              # 메인 페이지 (포스트 목록)
│   ├── layout.tsx            # 루트 레이아웃
│   ├── login/page.tsx        # 로그인 페이지
│   ├── write/page.tsx        # 글쓰기 페이지
│   ├── post/[id]/            # 포스트 상세
│   │   ├── page.tsx
│   │   ├── CommentSection.tsx
│   │   └── LikeButton.tsx
│   ├── user/[username]/      # 사용자 프로필
│   │   └── page.tsx
│   └── category/[categoryId]/ # 카테고리별 포스트
│       └── page.tsx
├── components/
│   ├── Header.tsx            # 상단 네비게이션
│   ├── Sidebar.tsx           # 카테고리 사이드바
│   ├── MobileSidebar.tsx     # 모바일용 사이드바
│   ├── PostCard.tsx          # 포스트 카드 컴포넌트
│   └── TrendingTabs.tsx      # 트렌딩/최신 탭
├── lib/
│   ├── api.ts                # API 클라이언트
│   └── types.ts              # TypeScript 타입 정의
└── public/
```

## Getting Started

### 1. 프론트엔드 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.


### 2. 환경 변수 설정

`.env.local` 파일 생성:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## API Endpoints

### Auth
- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인
- `POST /api/auth/refresh` - 토큰 갱신

### Posts
- `GET /api/posts` - 포스트 목록
- `GET /api/posts/:id` - 포스트 상세
- `GET /api/posts/trending` - 트렌딩 포스트
- `POST /api/posts` - 포스트 작성
- `PUT /api/posts/:id` - 포스트 수정
- `DELETE /api/posts/:id` - 포스트 삭제

### Users
- `GET /api/users/:username` - 사용자 프로필
- `GET /api/users/:username/posts` - 사용자 포스트 목록
- `GET /api/users/me` - 내 프로필

### Comments
- `GET /api/comments/post/:postId` - 댓글 목록
- `POST /api/comments/post/:postId` - 댓글 작성
- `PUT /api/comments/:id` - 댓글 수정
- `DELETE /api/comments/:id` - 댓글 삭제

## Scripts

```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 실행
```
