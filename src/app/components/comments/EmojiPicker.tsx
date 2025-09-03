'use client'

import React, { useEffect, useRef } from 'react'
import { Smile } from 'lucide-react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

interface EmojiPickerProps {
  onSelect: (emoji: any) => void
}

export default function EmojiPicker({ onSelect }: EmojiPickerProps) {
  const [show, setShow] = React.useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  // đóng khi click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShow(false)
      }
    }
    if (show) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [show])

  return (
    <div className="relative" ref={pickerRef}>
      <button
        type="button"
        className="p-2 rounded-full hover:bg-gray-100"
        onClick={() => setShow((v) => !v)}
      >
        <Smile className="w-5 h-5 text-gray-500" />
      </button>
      {show && (
        <div className="absolute bottom-10 left-0 z-50">
          <Picker data={data} onEmojiSelect={onSelect} />
        </div>
      )}
    </div>
  )
}
