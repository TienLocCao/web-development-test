'use client'

import React, { useState, useEffect } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { User } from '@/app/types/user'
import { getUsers } from '@/app/services/users'

interface SearchAndFilterProps {
  onSearch: (query: string, userId?: number) => void
  onSort: (sortBy: 'title' | 'id' | 'userId', sortOrder: 'asc' | 'desc') => void
  currentQuery: string
  currentUserId?: number
  currentSortBy: 'title' | 'id' | 'userId'
  currentSortOrder: 'asc' | 'desc'
}

export default function SearchAndFilter({
  onSearch,
  onSort,
  currentQuery,
  currentUserId,
  currentSortBy,
  currentSortOrder
}: SearchAndFilterProps) {
  const [query, setQuery] = useState(currentQuery)
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>(currentUserId)
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers()
        setUsers(usersData)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    fetchUsers()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query, selectedUserId)
  }

  const handleClearFilters = () => {
    setQuery('')
    setSelectedUserId(undefined)
    onSearch('', undefined)
  }

  const hasActiveFilters = query || selectedUserId

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts by title or content..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {/* Filter and Sort Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <X className="h-4 w-4" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
