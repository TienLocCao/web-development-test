'use client'

import React, { useState, useEffect } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { User } from '@/app/types'
import { ApiService } from '@/app/services/api'

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
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await ApiService.getUsers()
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

  const handleSort = (sortBy: 'title' | 'id' | 'userId') => {
    const newSortOrder = currentSortBy === sortBy && currentSortOrder === 'asc' ? 'desc' : 'asc'
    onSort(sortBy, newSortOrder)
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
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
          {/* Filter Button */}
          {/* <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {[query, selectedUserId].filter(Boolean).length}
              </span>
            )}
          </button> */}

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

        {/* Sort Controls */}
        {/* <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          {(['title', 'id', 'userId'] as const).map((sortBy) => (
            <button
              key={sortBy}
              onClick={() => handleSort(sortBy)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                currentSortBy === sortBy
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {sortBy === 'userId' ? 'User' : sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
              {currentSortBy === sortBy && (
                <span className="ml-1">
                  {currentSortOrder === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </button>
          ))}
        </div> */}
      </div>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by User
              </label>
              <select
                value={selectedUserId || ''}
                onChange={(e) => setSelectedUserId(e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All users</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} (@{user.username})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
