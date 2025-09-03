'use client'

import React, { useState } from 'react'
import { useAuth } from '@/app/contexts/AuthContext'
import { addComment } from '@/app/services/comments'
import { Send, ImageIcon } from 'lucide-react'
import { toast } from 'react-toastify'
import EmojiPicker from '@/app/components/comments/EmojiPicker'

interface CommentFormProps {
  postId: number
  onOptimisticAdd: (body: string) => void
  onServerSync: () => void
}

export default function CommentForm({ postId, onOptimisticAdd, onServerSync }: CommentFormProps) {
  const { user } = useAuth()
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)

  const addEmoji = (emoji: any) => {
    setBody((prev) => prev + (emoji.native || ''))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!body.trim()) return

    onOptimisticAdd(body.trim())
    const currentBody = body.trim()
    setBody('')
    setLoading(true)

    try {
      await new Promise((res) => setTimeout(res, 10000))

      await addComment(postId, {
        postId,
        name: user?.name || 'You',
        email: user?.email || 'you@example.com',
        body: currentBody,
      })
      onServerSync()
    } catch (err) {
      console.error(err)
      toast.error('Failed to add comment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border-t border-gray-200 p-2 bg-white flex items-center space-x-2 rounded-lg">
      {/* Icons left */}
      <div className="flex space-x-1">
        <EmojiPicker onSelect={addEmoji} />
      </div>

      {/* Input */}
      <form className="flex-1 flex items-center" onSubmit={handleSubmit}>
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Type a comment..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              handleSubmit(e)
            }
          }}
        />
        {/* Send button */}
        <button
          type="submit"
          disabled={loading || !body.trim()}
          className="ml-2 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </form>
    </div>
  )
}
