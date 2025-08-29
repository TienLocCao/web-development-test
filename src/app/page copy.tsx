'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/app/contexts/AuthContext'
import { Post, SearchFilters } from '@/app/types'
import { ApiService } from '@/app/services/api'
import Header from '@/app/components/layout/Header'
import SearchAndFilter from '@/app/components/posts/SearchAndFilter'
import PostCard from '@/app/components/posts/PostCard'
import Pagination from '@/app/components/common/Pagination'
import { useRouter } from 'next/navigation'
import { useRedirectIfHome } from '@/app/hooks/useRedirectIfHome';

export default function HomePage() {
  useRedirectIfHome();
  const { isAuthenticated, loading: authLoading } = useAuth()
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    userId: undefined,
    sortBy: 'id',
    sortOrder: 'desc'
  })

  const itemsPerPage = 10

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth')
      return
    }

    if (isAuthenticated) {
      fetchPosts()
    }
  }, [isAuthenticated, authLoading, currentPage, filters, router])

  const fetchPosts = async () => {
    setLoading(true)
    setError('')

    try {
      let result
      
      if (filters.query) {
        result = await ApiService.searchPosts(filters.query, currentPage, itemsPerPage)
      } else if (filters.userId) {
        result = await ApiService.getPostsByUser(filters.userId, currentPage, itemsPerPage)
      } else {
        result = await ApiService.getPosts(currentPage, itemsPerPage)
      }

      // Sort posts based on current filters
      let sortedPosts = [...result.posts]
      sortedPosts.sort((a, b) => {
        let aValue: any
        let bValue: any

        switch (filters.sortBy) {
          case 'title':
            aValue = a.title.toLowerCase()
            bValue = b.title.toLowerCase()
            break
          case 'userId':
            aValue = a.userId
            bValue = b.userId
            break
          default:
            aValue = a.id
            bValue = b.id
        }

        if (filters.sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1
        } else {
          return aValue < bValue ? 1 : -1
        }
      })

      setPosts(sortedPosts)
      setTotalItems(result.total)
      setTotalPages(Math.ceil(result.total / itemsPerPage))
    } catch (err) {
      setError('Failed to fetch posts. Please try again.')
      console.error('Error fetching posts:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (query: string, userId?: number) => {
    setFilters(prev => ({ ...prev, query, userId }))
    setCurrentPage(1)
  }

  const handleSort = (sortBy: 'title' | 'id' | 'userId', sortOrder: 'asc' | 'desc') => {
    setFilters(prev => ({ ...prev, sortBy, sortOrder }))
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Posts</h1>
          <p className="text-gray-600">
            Explore posts from our community. Use the search and filters below to find what you're looking for.
          </p>
        </div>

        <SearchAndFilter
          onSearch={handleSearch}
          onSort={handleSort}
          currentQuery={filters.query}
          currentUserId={filters.userId}
          currentSortBy={filters.sortBy}
          currentSortOrder={filters.sortOrder}
        />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="h-5 bg-gray-200 rounded mb-3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <>
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} posts
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600">
              {filters.query || filters.userId 
                ? 'Try adjusting your search criteria or filters.'
                : 'There are no posts available at the moment.'
              }
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
