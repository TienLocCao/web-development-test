'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/app/contexts/AuthContext'
import { useRouter, useParams } from 'next/navigation'
import { PostWithComments } from '@/app/types'
import { ApiService } from '@/app/services/api'
import Header from '@/app/components/layout/Header'
import Comment from '@/app/components/comments/Comment'
import CommentForm from '@/app/components/comments/CommentForm'
import { ArrowLeft, User, Calendar, MessageCircle, Loader2 } from 'lucide-react'

export default function PostDetailPage() {
  const { isAuthenticated, loading: authLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const postId = Number(params.id)

  const [post, setPost] = useState<PostWithComments | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [comments, setComments] = useState<PostWithComments['comments']>([])

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth')
      return
    }

    if (isAuthenticated && postId) {
      fetchPost()
    }
  }, [isAuthenticated, authLoading, postId, router])

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

  const handleCommentAdded = () => {
    // Refresh comments after adding a new one
    fetchPost()
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        </main>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error</h3>
            <p className="text-gray-600 mb-4">{error || 'Post not found'}</p>
            <button
              onClick={() => router.push('/')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Posts
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Posts</span>
        </button>

        {/* Post Content */}
        <article className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          {/* Post Header */}
          <header className="mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  {post.user?.name || `User ${post.userId}`}
                </h2>
                <p className="text-sm text-gray-500">
                  @{post.user?.username || `user${post.userId}`}
                </p>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>
            
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
          </header>

          {/* Post Body */}
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {post.body}
            </p>
          </div>
        </article>

        {/* Comments Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Comments ({comments.length})
            </h2>
          </div>

          {/* Add Comment Form */}
          <CommentForm postId={post.id} onCommentAdded={handleCommentAdded} />

          {/* Comments List */}
          {comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-600">No comments yet. Be the first to share your thoughts!</p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
