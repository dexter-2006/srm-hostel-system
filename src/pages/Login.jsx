import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Eye, EyeOff } from 'lucide-react'
import { showToast } from '../utils/helpers'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  
  const { login, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin' : '/student')
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Determine role based on email domain
      const role = email.includes('admin') || email.includes('@srm.edu.in') ? 'admin' : 'student'
      
      await login(email, password, role)
      showToast('Login successful!', 'success')
      navigate(role === 'admin' ? '/admin' : '/student')
    } catch (error) {
      showToast('Login failed. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = (role) => {
    if (role === 'admin') {
      setEmail('admin@srm.edu.in')
      setPassword('admin123')
    } else {
      setEmail('student@srmist.edu.in')
      setPassword('student123')
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex bg-gradient-to-br from-gray-50 to-gray-100 p-16 flex-col justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-srm-blue rounded-xl flex items-center justify-center text-white font-bold text-xl">
            S
          </div>
          <div className="font-manrope font-bold text-2xl text-srm-blue">
            SRM Hostel
          </div>
        </div>

        {/* Hero Content */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="font-manrope font-bold text-5xl leading-tight mb-6">
            Hostel Maintenance<br />
            <span className="text-srm-blue">Made Simple.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-lg leading-relaxed">
            Report issues instantly, track resolution status in real-time,
            and enjoy a better living experience on campus.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-4">
                🔧
              </div>
              <h3 className="font-bold mb-2">Quick Reporting</h3>
              <p className="text-sm text-gray-600">Report plumbing, electrical, or other issues in seconds.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl mb-4">
                ⏱️
              </div>
              <h3 className="font-bold mb-2">Real-time Tracking</h3>
              <p className="text-sm text-gray-600">Stay updated on the status of your complaints.</p>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex gap-8">
          <div className="flex items-center gap-2 text-green-600 font-semibold">
            <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center text-white text-xs">
              ✓
            </div>
            24/7 Support
          </div>
          <div className="flex items-center gap-2 text-green-600 font-semibold">
            <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center text-white text-xs">
              ✓
            </div>
            Fast Resolution
          </div>
          <div className="flex items-center gap-2 text-green-600 font-semibold">
            <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center text-white text-xs">
              ✓
            </div>
            Official Portal
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-col items-center justify-center p-8 lg:p-16 bg-white">
        <div className="w-full max-w-md">
          {/* Login Icon */}
          <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-8">
            📋
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-manrope font-bold text-3xl mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to access your dashboard</p>
          </div>

          {/* Demo Login Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
            >
              Demo Admin
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('student')}
              className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
            >
              Demo Student
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-srm-blue focus:outline-none transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-srm-blue focus:outline-none transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-srm-blue border-gray-300 rounded focus:ring-srm-blue"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-srm-blue text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="loading"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              By logging in, you agree to the Hostel Rules & Regulations.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex items-center gap-2 text-sm text-gray-500">
          <span>*</span>
         SRM
        </div>
      </div>
    </div>
  )
}

export default Login