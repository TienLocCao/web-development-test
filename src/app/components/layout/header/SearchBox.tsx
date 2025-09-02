"use client";

import { Search, X } from "lucide-react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasText, setHasText] = useState(false);
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      const value = inputRef.current.value.trim();
      if (value) {
        router.push(`/search?q=${encodeURIComponent(value)}`);
      }
    }
  };

  const handleChange = () => {
    setHasText(!!inputRef.current?.value);
  };

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setHasText(false);
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative hidden md:block">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search content"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="pl-4 pr-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 text-sm"
      />
      
      {hasText && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
