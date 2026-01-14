"use client";

import { useState } from "react";
import Link from "next/link";
import { Comment, formatDate } from "@/lib/types";
import { commentApi } from "@/lib/api";

interface CommentSectionProps {
  postId: number;
  initialComments: Comment[];
}

export default function CommentSection({ postId, initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await commentApi.createComment(postId, {
        content: newComment,
      });
      setComments([response.data, ...comments]);
      setNewComment("");
    } catch (error) {
      console.error("Comment error:", error);
      alert("로그인이 필요합니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <h3 className="text-xl font-bold text-[var(--foreground)] mb-6">
        {comments.length}개의 댓글
      </h3>

      {/* Comment Input */}
      <div className="mb-8">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 작성하세요"
          className="w-full h-24 p-4 rounded-lg bg-[var(--background)] border border-[var(--border-color)] text-[var(--foreground)] placeholder-[var(--text-tertiary)] resize-none focus:outline-none focus:border-[var(--primary)]"
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !newComment.trim()}
            className="px-4 py-2 rounded bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "작성 중..." : "댓글 작성"}
          </button>
        </div>
      </div>

      {/* Comment List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>

      {/* Empty State */}
      {comments.length === 0 && (
        <div className="text-center py-12 text-[var(--text-tertiary)]">
          아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
        </div>
      )}
    </section>
  );
}

function CommentItem({ comment }: { comment: Comment }) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  return (
    <div className="pb-6 border-b border-[var(--border-color)]">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-[var(--hover-bg)] flex items-center justify-center">
          {comment.user.avatar ? (
            <img
              src={comment.user.avatar}
              alt={comment.user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <span className="text-sm text-[var(--text-secondary)]">
              {comment.user.name[0]}
            </span>
          )}
        </div>
        <div>
          <Link
            href={`/user/${comment.user.username}`}
            className="font-bold text-[var(--foreground)] hover:underline"
          >
            {comment.user.name}
          </Link>
          <span className="text-sm text-[var(--text-tertiary)] ml-2">
            {formatDate(comment.createdAt)}
          </span>
        </div>
      </div>
      <p className="text-[var(--text-secondary)] ml-11 whitespace-pre-wrap">{comment.content}</p>
      <div className="flex items-center gap-4 mt-3 ml-11">
        <button className="flex items-center gap-1 text-sm text-[var(--text-tertiary)] hover:text-[var(--primary)]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          {comment.likeCount}
        </button>
        <button
          onClick={() => setShowReplyInput(!showReplyInput)}
          className="text-sm text-[var(--text-tertiary)] hover:text-[var(--foreground)]"
        >
          답글 달기
        </button>
      </div>

      {/* Reply Input */}
      {showReplyInput && (
        <div className="ml-11 mt-4">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="답글을 작성하세요"
            className="w-full h-20 p-3 rounded-lg bg-[var(--background)] border border-[var(--border-color)] text-[var(--foreground)] placeholder-[var(--text-tertiary)] resize-none focus:outline-none focus:border-[var(--primary)] text-sm"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => setShowReplyInput(false)}
              className="px-3 py-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)]"
            >
              취소
            </button>
            <button className="px-3 py-1.5 text-sm bg-[var(--primary)] text-white rounded font-medium hover:bg-[var(--primary-dark)]">
              답글 작성
            </button>
          </div>
        </div>
      )}

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-11 mt-4 space-y-4 pl-4 border-l-2 border-[var(--border-color)]">
          {comment.replies.map((reply) => (
            <div key={reply.id}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-[var(--hover-bg)] flex items-center justify-center">
                  <span className="text-xs text-[var(--text-secondary)]">
                    {reply.user.name[0]}
                  </span>
                </div>
                <Link
                  href={`/user/${reply.user.username}`}
                  className="font-bold text-sm text-[var(--foreground)] hover:underline"
                >
                  {reply.user.name}
                </Link>
                <span className="text-xs text-[var(--text-tertiary)]">
                  {formatDate(reply.createdAt)}
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] ml-8">{reply.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
