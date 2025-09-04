'use client'

import React, { useState } from 'react'
import { Post } from '@/app/types/post'
import { User, MessageCircle, Calendar, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import PostDetailDialog from '@/app/components/posts/detail/Dialog'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleClick = () => {
    setOpen(true);
    // router.push(`/posts/${post.id}`)
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden mb-4">
      <div className="p-6">
        {/* Post Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">
                {post.user?.name || `User ${post.userId}`}
              </h3>
              <p className="text-sm text-gray-500">
                @{post.user?.username || `user${post.userId}`}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>Post #{post.id}</span>
          </div>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
            {post.title}
          </h2>
          <p className="text-gray-600 leading-relaxed line-clamp-3">
            {truncateText(post.body, 150)}
          </p>
        </div>

        {/* Post Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <button className="flex items-center space-x-1 hover:text-blue-500" onClick={handleClick}>
              <MessageCircle className="w-4 h-4" />
              <span>Comments</span>
            </button>
          </div>
        </div>
      </div>

      <PostDetailDialog post={post} open={open} onOpenChange={setOpen} />
    </article>
  )
}
