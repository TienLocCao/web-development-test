'use client'

import React from 'react'
import { Comment as CommentType } from '@/app/types'
import { User, Mail, Calendar } from 'lucide-react'

interface CommentProps {
  comment: CommentType
}

export default function Comment({ comment }: CommentProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-blue-600" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <h4 className="text-sm font-medium text-gray-900 truncate">
              {comment.name}
            </h4>
            <span className="text-xs text-gray-500">•</span>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Mail className="w-3 h-3" />
              <span className="truncate">{comment.email}</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-700 leading-relaxed">
            {comment.body}
          </p>
          
          <div className="flex items-center space-x-2 mt-3 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>Comment #{comment.id}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
