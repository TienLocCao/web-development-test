'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/app/contexts/AuthContext'
import { Post } from "@/app/types/post";
import { Comment as CommentType } from "@/app/types/comment";

import { getPost } from '@/app/services/posts'
import Comment from '@/app/components/comments/Comment'
import CommentForm from '@/app/components/comments/CommentForm'
import { Calendar, MessageCircle, Loader2 } from 'lucide-react'
import { Dialog, DialogContent } from "@/app/components/ui/dialog"
import PostDetailSkeleton from './Skeleton'
import { toast } from 'react-toastify';

interface Props {
  post: Post,  
  open: boolean
  onOpenChange: (v: boolean) => void
}

export default function PostDetailDialog({ post, open, onOpenChange }: Props) {
  const { isAuthenticated, loading: authLoading, user } = useAuth()
  const [comments, setComments] = useState<CommentType[]>([])
  const [loadingComments, setLoadingComments] = useState(true)
  const commentsTopRef = useRef<HTMLDivElement | null>(null)

  const postId = post.id

  useEffect(() => {
    if (open && !authLoading && isAuthenticated) {
      fetchComments()
    }
  }, [open, isAuthenticated, authLoading, postId])

  const fetchComments = async () => {
    setLoadingComments(true)
    try {
      const postData = await getPost(postId)
      if (postData) {
        setComments(postData.comments)
      }
    } catch (err) {
      toast.error('Error fetching comments.');
      console.error('Error fetching comments:', err)
    } finally {
      setLoadingComments(false)
    }
  }

  /** Optimistic update */
  const addOptimisticComment = (body: string) => {
    if (!user) return
    const newComment: CommentType = {
      id: Date.now(),
      postId,
      name: user.name || 'You',
      email: user.email || 'you@example.com',
      body,
      isPending: true,
    }
    setComments((prev) => [newComment, ...prev])
  }

  const syncComments = async () => {
    try {
      const fresh = await getPost(postId)
      if (fresh) setComments(fresh.comments)
    } catch (err) {
      console.error('Sync comments error:', err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden"
        aria-labelledby="dialog-title"
        aria-describedby="post-content"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b shadow-sm">
          <h2 className="text-center text-lg font-medium text-gray-900" id="dialog-title">
            {post.user?.name || `User ${post.userId}`}'s Post
          </h2>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          <h1 className="text-xl font-bold text-gray-900">{post.title}</h1>
          <div id="post-content">
            {post.body && (
              <p className="text-gray-700 whitespace-pre-wrap">{post.body}</p>
            )}
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Post #{post.id}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>{comments.length} comments</span>
            </div>
          </div>

          <section className="space-y-4 pt-4 border-t">
            {loadingComments ? (
              <PostDetailSkeleton />
            ) : comments.length > 0 ? (
              <div className="space-y-4">
                <div ref={commentsTopRef} />
                {comments.map((c) => (
                  <Comment key={c.id} comment={c} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </section>
        </div>

        {/* CommentForm */}
        <div className="px-4 py-2 border-t bg-white flex-shrink-0">
          <CommentForm
            postId={post.id}
            onOptimisticAdd={addOptimisticComment}
            onServerSync={syncComments}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
