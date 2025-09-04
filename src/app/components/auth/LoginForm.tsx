'use client'

import React, { useState } from 'react'
import { useAuth } from '@/app/contexts/AuthContext'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { openAuthPopup } from "@/lib/auth-popup";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  onSwitchToSignup: () => void
}

export default function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter();
  
  const { login, signup } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    try {
      const success = await login(email, password)
      if (!success) {
        setError('Invalid credentials')
      }
    } catch (err) {
      setError('An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  const handleLoginByProvider = async (provider: "google" | "facebook") => {
    try {
      await openAuthPopup(provider);

      const name = session?.user?.name || "";
      const email = session?.user?.email || "";
      const password = "oauth_default_password"; // or generate a random one
      const success = await signup(name, email, password)
      if (!success) {
        setError('Failed to create account')
      }
    } catch (e) {
      console.warn("User cancelled login.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
          <p className="text-gray-600">Sign in to your account</p>
        </div>
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => handleLoginByProvider("google")}
            className="border border-gray-300 rounded-md p-3 hover:bg-gray-100 transition-colors"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="Google"
              className="w-5 h-5"
            />
          </button>

          <button
            onClick={() => handleLoginByProvider("facebook")}
            className="border border-gray-300 rounded-md p-3 hover:bg-gray-100 transition-colors"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg"
              alt="Facebook"
              className="w-5 h-5"
            />
          </button>
        </div>


        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToSignup}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign up
            </button>
          </p>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            <strong>Demo credentials:</strong><br />
            Email: demo@example.com<br />
            Password: password
          </p>
        </div>
      </div>
    </div>
  )
}
