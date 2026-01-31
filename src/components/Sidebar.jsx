import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  LayoutDashboard, 
  FileText, 
  Megaphone, 
  Search, 
  Settings, 
  Users, 
  Building, 
  Clock,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const Sidebar = ({ isOpen, onClose, isCollapsed, onToggleCollapse }) => {
  const { user } = useAuth()
  const location = useLocation()
  
  const isStudent = user?.role === 'student'
  const baseRoute = isStudent ? '/student' : '/admin'

  const studentNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/student', badge: null },
    { icon: FileText, label: 'My Issues', path: '/student/issues', badge: '3' },
    { icon: Megaphone, label: 'Announcements', path: '/student/announcements', badge: null },
    { icon: Search, label: 'Lost & Found', path: '/student/lost-found', badge: null },
    { icon: Settings, label: 'Settings', path: '/student/settings', badge: null }
  ]

  const adminNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin', badge: null },
    { icon: FileText, label: 'All Issues', path: '/admin/issues', badge: '67' },
    { icon: Megaphone, label: 'Announcements', path: '/admin/announcements', badge: null },
    { icon: Search, label: 'Lost & Found', path: '/admin/lost-found', badge: null },
    { icon: Users, label: 'Staff', path: '/admin/staff', badge: null },
    { icon: Building, label: 'Hostels', path: '/admin/hostels', badge: null },
    { icon: Settings, label: 'Settings', path: '/admin/settings', badge: null }
  ]

  const navItems = isStudent ? studentNavItems : adminNavItems

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        ${isCollapsed && !isOpen ? 'w-16 lg:w-16' : 'w-72'}
        bg-gradient-to-b from-srm-blue to-blue-900
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 h-full overflow-y-auto">
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg"
          >
            <X size={20} />
          </button>

          {/* Logo Section */}
          <div className={`flex items-center gap-3 mb-8 pb-6 border-b border-white border-opacity-20 ${isCollapsed && !isOpen ? 'justify-center' : ''}`}>
            <div className="w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              🏠
            </div>
            {(!isCollapsed || isOpen) && (
              <div className="min-w-0">
                <h3 className="font-manrope font-bold text-lg text-white truncate">SRM HOSTEL</h3>
                <p className="text-sm text-white text-opacity-70 truncate">
                  {isStudent ? 'Student Portal' : 'Admin Portal'}
                </p>
              </div>
            )}
            
            {/* Desktop Toggle Button */}
            <button
              onClick={onToggleCollapse}
              className="hidden lg:block ml-auto text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg flex-shrink-0"
            >
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {(!isCollapsed || isOpen) && (
              <div className="text-xs font-bold text-white text-opacity-60 uppercase tracking-wider mb-4">
                Main
              </div>
            )}
            
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                    ${isActive(item.path)
                      ? 'bg-white bg-opacity-20 text-white shadow-lg'
                      : 'text-white text-opacity-80 hover:bg-white hover:bg-opacity-10 hover:text-white'
                    }
                    ${isCollapsed && !isOpen ? 'justify-center' : ''}
                  `}
                  title={isCollapsed && !isOpen ? item.label : ''}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {(!isCollapsed || isOpen) && (
                    <>
                      <span className="font-medium truncate">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold flex-shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                  {isCollapsed && !isOpen && item.badge && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* User Info */}
          {(!isCollapsed || isOpen) && (
            <div className="mt-8 pt-6 border-t border-white border-opacity-20">
              <div className="flex items-center gap-3 p-4 bg-white bg-opacity-10 rounded-xl">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm truncate">{user?.name}</p>
                  <p className="text-white text-opacity-70 text-xs capitalize">{user?.role}</p>
                  {isStudent && user?.hostel && (
                    <p className="text-white text-opacity-60 text-xs truncate">
                      {user.hostel} - {user.block} - {user.room}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

export default Sidebar