"use client";

import { useState } from "react";
import { postApi } from "@/lib/api";

interface LikeButtonProps {
  postId: number;
  initialLikes: number;
}

export default function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    setIsLoading(true);
    try {
      if (isLiked) {
        await postApi.unlikePost(postId);
        setLikes((prev) => prev - 1);
      } else {
        await postApi.likePost(postId);
        setLikes((prev) => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Like error:", error);
      // 로그인이 필요할 수 있음
      alert("로그인이 필요합니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center my-12">
      <button
        onClick={handleLike}
        disabled={isLoading}
        className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 font-medium transition-colors ${
          isLiked
            ? "bg-[var(--primary)] border-[var(--primary)] text-white"
            : "border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        {likes}
      </button>
    </div>
  );
}
