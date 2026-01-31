import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useSearch } from '../context/SearchContext'
import { Bell, Search, LogOut, Menu } from 'lucide-react'

const Navbar = ({ onMobileMenuToggle, onSidebarToggle, isSidebarCollapsed }) => {
  const { user, logout } = useAuth()
  const { searchTerm, updateSearchTerm, clearSearch } = useSearch()
  const navigate = useNavigate()

  const isStudent = user?.role === 'student'
  const baseRoute = isStudent ? '/student' : '/admin'

  const handleSearchChange = (e) => {
    updateSearchTerm(e.target.value)
  }

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      // Optional: Could navigate to a dedicated search results page
    }
  }

  const handleNotificationClick = () => {
    if (isStudent) {
      navigate('/student/announcements')
    } else {
      navigate('/admin/announcements')
    }
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
    }
  }

  return (
    <nav className="bg-white border-b-2 border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Logo and Search */}
        <div className="flex items-center gap-6">
          {/* Mobile menu button */}
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>

          {/* Desktop sidebar toggle */}
          <button
            onClick={onSidebarToggle}
            className="hidden lg:block p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
          
          <Link to={baseRoute} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-srm-blue rounded-xl flex items-center justify-center text-white font-bold text-lg">
              🏠
            </div>
            <div>
              <h1 className="font-manrope font-bold text-lg text-srm-blue">SRM HOSTEL</h1>
              <p className="text-xs text-gray-500">{user?.role === 'admin' ? 'Admin Portal' : 'Student Portal'}</p>
            </div>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search issues, hostels, students..."
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={handleSearchKeyPress}
              className="pl-12 pr-4 py-3 w-full max-w-md border-2 border-gray-200 rounded-xl focus:border-srm-blue focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-4">
          {/* Notification */}
          <div className="relative">
            <button 
              onClick={handleNotificationClick}
              className="p-3 rounded-xl border-2 border-gray-200 hover:border-srm-blue transition-colors"
            >
              <Bell size={18} />
            </button>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              8
            </span>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="hidden sm:block">
              <p className="font-semibold text-sm">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-red-500 transition-colors"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden mt-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleSearchKeyPress}
            className="pl-12 pr-4 py-3 w-full border-2 border-gray-200 rounded-xl focus:border-srm-blue focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar