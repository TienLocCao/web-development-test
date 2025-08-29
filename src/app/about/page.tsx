'use client'

import React from 'react'
import { useAuth } from '@/app/contexts/AuthContext'
import Header from '@/app/components/layout/Header'
import { 
  Code, 
  Database, 
  Globe, 
  Shield, 
  Users, 
  MessageCircle,
  Search,
  Filter,
  Navigation
} from 'lucide-react'

export default function AboutPage() {
  const { isAuthenticated } = useAuth()

  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'User Authentication',
      description: 'Secure sign-up, login, and logout functionality with user management.'
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: 'JSONPlaceholder Integration',
      description: 'Fetches real data from the JSONPlaceholder API for posts, users, and comments.'
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: 'Search & Filter',
      description: 'Advanced search functionality with filtering by user and sorting options.'
    },
    {
      icon: <Navigation className="w-6 h-6" />,
      title: 'Pagination',
      description: 'Efficient pagination system for browsing through large datasets.'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Comments System',
      description: 'Interactive commenting system where users can add and view comments on posts.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Protected Routes',
      description: 'Only authenticated users can access post details and comment functionality.'
    }
  ]

  const techStack = [
    { name: 'Next.js 14', description: 'React framework with App Router' },
    { name: 'TypeScript', description: 'Type-safe JavaScript development' },
    { name: 'Tailwind CSS', description: 'Utility-first CSS framework' },
    { name: 'React Hooks', description: 'State management and side effects' },
    { name: 'JSONPlaceholder API', description: 'Fake REST API for testing' },
    { name: 'Lucide React', description: 'Beautiful & consistent icon toolkit' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About JSONPlaceholder App
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A feature-rich web application built with modern technologies to demonstrate 
            full-stack development capabilities and best practices.
          </p>
        </div>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Technology Stack
          </h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techStack.map((tech, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">{tech.name}</h4>
                    <p className="text-sm text-gray-600">{tech.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* JSONPlaceholder Info */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            About JSONPlaceholder
          </h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 flex-shrink-0">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  What is JSONPlaceholder?
                </h3>
                <p className="text-gray-600 mb-4">
                  JSONPlaceholder is a free fake API for testing and prototyping. It provides 
                  endpoints for posts, comments, users, and other resources that you can use 
                  to test your frontend applications without setting up a backend server.
                </p>
                <p className="text-gray-600 mb-4">
                  This application demonstrates how to integrate with external APIs, handle 
                  data fetching, implement search and filtering, and manage application state 
                  in a real-world scenario.
                </p>
                <a
                  href="https://jsonplaceholder.typicode.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <span>Visit JSONPlaceholder</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Development Info */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Development & Testing
          </h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Development Features
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• TypeScript for type safety</li>
                  <li>• Responsive design with Tailwind CSS</li>
                  <li>• Modern React patterns and hooks</li>
                  <li>• Clean component architecture</li>
                  <li>• Error handling and loading states</li>
                  <li>• Accessibility considerations</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Testing & Quality
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• ESLint configuration</li>
                  <li>• TypeScript strict mode</li>
                  <li>• Responsive design testing</li>
                  <li>• Cross-browser compatibility</li>
                  <li>• Performance optimization</li>
                  <li>• Code organization best practices</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Credentials */}
        <section className="text-center">
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Try the Application
            </h2>
            <p className="text-blue-800 mb-4">
              Use these demo credentials to explore the full functionality:
            </p>
            <div className="bg-white rounded-lg p-4 inline-block">
              <p className="text-sm font-medium text-gray-900">
                Email: <span className="font-mono text-blue-600">demo@example.com</span>
              </p>
              <p className="text-sm font-medium text-gray-900">
                Password: <span className="font-mono text-blue-600">password</span>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
