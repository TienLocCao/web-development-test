'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/app/contexts/AuthContext'
import { useParams } from 'next/navigation'
import { PostWithComments, Comment as CommentType } from '@/app/types'
import { ApiService } from '@/app/services/api'
import Comment from '@/app/components/comments/Comment'
import CommentForm from '@/app/components/comments/CommentForm'
import { User, Calendar, MessageCircle, Loader2 } from 'lucide-react'
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface Props {
  id: number,
  open: boolean;
  onOpenChange: (v: boolean) => void
}

export default function PostDetailDialog({ id, open, onOpenChange }: Props) {
  const { isAuthenticated, loading: authLoading, user } = useAuth()
  const params = useParams()
  const postId = Number(id)

  const [post, setPost] = useState<PostWithComments | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [comments, setComments] = useState<CommentType[]>([])
  const commentsTopRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!authLoading && isAuthenticated && postId) {
      fetchPost()
    }
  }, [isAuthenticated, authLoading, postId])

  const fetchPost = async () => {
    setLoading(true)
    setError('')
    try {
      const postData = await ApiService.getPost(postId)
      if (postData) {
        setPost(postData)
        setComments(postData.comments)
      } else {
        setError('Post not found')
      }
    } catch (err) {
      setError('Failed to fetch post. Please try again.')
      console.error('Error fetching post:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (commentsTopRef.current) {
      commentsTopRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [comments])

  /** Optimistic update: thêm comment ngay */
  const addOptimisticComment = (body: string) => {
    if (!user) return
    const newComment: CommentType = {
      id: Date.now(), // fake id
      postId,
      name: user.name || 'You',
      email: user.email || 'you@example.com',
      body,
      isPending: true, // <--- flag pending
    }
    setComments((prev) => [newComment, ...prev])
  }

  /** Sau khi server confirm thì sync lại */
  const syncComments = async () => {
    try {
      const fresh = await ApiService.getPost(postId)
      if (fresh) {
        setComments(fresh.comments)
      }
    } catch (err) {
      console.error('Sync comments error:', err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {authLoading || loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          </div>
        ) : error || !post ? (
          <div className="text-center py-12 text-red-600">
            {error || 'Post not found'}
          </div>
        ) : (
          <div className="flex flex-col flex-1 overflow-hidden">

            {/* Fixed header: Bài viết của ... */}
            <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b shadow-sm">
              <h2 className="text-center text-lg font-medium text-gray-900">
                Bài viết của {post.user?.name || `User ${post.userId}`}
              </h2>
            </div>

            {/* Scrollable content: Title, Body, Meta, Comments */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
              <h1 className="text-xl font-bold text-gray-900">{post.title}</h1>
              {post.body && (
                <p className="text-gray-700 whitespace-pre-wrap">{post.body}</p>
              )}

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
                {comments.length > 0 ? (
                  <div className="space-y-4">
                    {/* Dummy div để scroll tới đầu */}
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

            {/* Fixed CommentForm ở dưới */}
            <div className="px-4 py-2 border-t bg-white flex-shrink-0">
              <CommentForm
                postId={post.id}
                onOptimisticAdd={addOptimisticComment}
                onServerSync={syncComments}
              />
            </div>
          </div>
        )}
      </DialogContent>


    </Dialog>
  )
}
