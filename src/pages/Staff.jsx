import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import AddStaffModal from '../components/AddStaffModal'
import { mockStaff } from '../utils/mockData'
import { formatDate } from '../utils/helpers'
import { useAuth } from '../context/AuthContext'
import { Plus, MoreVertical, Phone, Mail, MapPin, Filter } from 'lucide-react'

const Staff = () => {
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [staff, setStaff] = useState(mockStaff)
  const [filterRole, setFilterRole] = useState('All')
  const [addStaffModalOpen, setAddStaffModalOpen] = useState(false)

  const isAdmin = user?.role === 'admin'

  // Get unique roles for filter
  const roles = ['All', ...new Set(staff.map(member => member.role))]

  // Filter staff by role
  const filteredStaff = filterRole === 'All' 
    ? staff 
    : staff.filter(member => member.role === filterRole)

  const getStatusColor = (status) => {
    return status === 'Available' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-red-100 text-red-800 border-red-200'
  }

  const getStatusDot = (status) => {
    return status === 'Available' ? 'bg-green-500' : 'bg-red-500'
  }

  const getRoleIcon = (role) => {
    const icons = {
      'Plumber': '🔧',
      'Electrician': '⚡',
      'Carpenter': '🔨',
      'Housekeeping': '🧹',
      'Pest Control': '🐛',
      'AC/Fan Repair': '❄️',
      'WiFi Technician': '📡',
      'Security Guard': '🛡️'
    }
    return icons[role] || '👷'
  }

  const handleAddStaff = (newStaffMember) => {
    setStaff(prev => [newStaffMember, ...prev])
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className={`main-layout bg-gray-50 ${sidebarCollapsed ? '' : 'sidebar-expanded'}`}>
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="main-content-area">
        <Navbar 
          onMobileMenuToggle={() => setSidebarOpen(true)}
          onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          isSidebarCollapsed={sidebarCollapsed}
        />
        
        <main className="p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-manrope font-bold text-3xl text-gray-800">
                  {filteredStaff.length} Staff
                </h1>
                {filterRole !== 'All' && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {filterRole}
                  </span>
                )}
              </div>
              <p className="text-gray-600">
                Manage hostel maintenance staff
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Filter */}
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200">
                <Filter size={16} className="text-gray-400" />
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm font-medium text-gray-700"
                >
                  {roles.map(role => (
                    <option key={role} value={role}>
                      {role === 'All' ? 'Filter' : role}
                    </option>
                  ))}
                </select>
              </div>

              {/* Add Staff Button */}
              {isAdmin && (
                <button 
                  onClick={() => setAddStaffModalOpen(true)}
                  className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
                >
                  <Plus size={20} />
                  Add Staff
                </button>
              )}
            </div>
          </div>

          {/* Staff Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStaff.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {getInitials(member.name)}
                      </div>
                      {/* Status Dot */}
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusDot(member.status)} rounded-full border-2 border-white`}></div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        {member.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  
                  {/* Three Dots Menu */}
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical size={16} className="text-gray-400" />
                  </button>
                </div>

                {/* Department and Hired Date */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-500">Department</span>
                    <p className="font-medium text-gray-800">{member.department}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Hired Date</span>
                    <p className="font-medium text-gray-800">{formatDate(member.hiredDate)}</p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail size={14} />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone size={14} />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={14} />
                    <span className="truncate">{member.hostelArea}</span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(member.status)}`}>
                    <span className="text-lg mr-2">{getRoleIcon(member.role)}</span>
                    {member.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredStaff.length === 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <div className="text-6xl mb-4">👷</div>
              <h3 className="font-semibold text-xl mb-2">No staff found</h3>
              <p className="text-gray-600 mb-6">
                {filterRole === 'All' 
                  ? 'No staff members have been added yet'
                  : `No ${filterRole} staff members found`
                }
              </p>
              {isAdmin && filterRole === 'All' && (
                <button 
                  onClick={() => setAddStaffModalOpen(true)}
                  className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors"
                >
                  Add First Staff Member
                </button>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Add Staff Modal */}
      <AddStaffModal
        isOpen={addStaffModalOpen}
        onClose={() => setAddStaffModalOpen(false)}
        onSubmit={handleAddStaff}
      />
    </div>
  )
}

export default Staff