import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import ReportLostModal from '../components/ReportLostModal'
import { mockLostAndFound } from '../utils/mockData'
import { formatTimeAgo } from '../utils/helpers'
import { useAuth } from '../context/AuthContext'
import { Plus, Search, MapPin, User, Clock } from 'lucide-react'

const LostAndFound = () => {
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [activeTab, setActiveTab] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [lostItems, setLostItems] = useState(mockLostAndFound)

  const isAdmin = user?.role === 'admin'

  const handleReportLost = (newLostItem) => {
    setLostItems(prev => [newLostItem, ...prev])
  }

  const filteredItems = lostItems.filter(item => {
    const matchesTab = activeTab === 'All' || 
      (activeTab === 'Lost' && item.type === 'lost') ||
      (activeTab === 'Found' && item.type === 'found')
    
    const matchesSearch = !searchTerm || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesTab && matchesSearch
  })

  const getItemTypeColor = (type) => {
    return type === 'lost' 
      ? 'bg-red-100 text-red-800 border-red-200' 
      : 'bg-green-100 text-green-800 border-green-200'
  }

  const getItemTypeIcon = (type) => {
    return type === 'lost' ? '🔍' : '✨'
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
              <h1 className="font-manrope font-bold text-3xl text-gray-800 mb-2">
                Lost & Found
              </h1>
              <p className="text-gray-600">
                Report lost items or help others find their belongings
              </p>
            </div>
            
            <button 
              onClick={() => setReportModalOpen(true)}
              className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              Report Lost
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-srm-blue focus:outline-none"
                />
              </div>

              {/* Tabs */}
              <div className="flex gap-2">
                {['All', 'Lost', 'Found'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-xl text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? 'bg-srm-blue text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                {/* Item Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {getItemTypeIcon(item.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        {item.title}
                      </h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getItemTypeColor(item.type)}`}>
                        {item.type === 'lost' ? 'Lost Item' : 'Found Item'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Item Description */}
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* Item Details */}
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{formatTimeAgo(item.reportedAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{item.reportedBy}</span>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    item.status === 'Active' || item.status === 'Available'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {item.status}
                  </span>

                  <div className="flex gap-2">
                    {item.type === 'found' && item.status === 'Available' && (
                      <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                        Claim
                      </button>
                    )}
                    <button className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                      Contact
                    </button>
                  </div>
                </div>

                {/* Admin Actions */}
                {isAdmin && (
                  <div className="flex gap-2 pt-4 mt-4 border-t border-gray-100">
                    <button className="px-3 py-1 bg-green-50 text-green-700 rounded text-sm hover:bg-green-100 transition-colors">
                      Verify
                    </button>
                    <button className="px-3 py-1 bg-red-50 text-red-700 rounded text-sm hover:bg-red-100 transition-colors">
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-semibold text-xl mb-2">
                {searchTerm ? 'No items found' : 'No items reported yet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm 
                  ? 'Try adjusting your search terms'
                  : 'Be the first to report a lost item'
                }
              </p>
              {!searchTerm && (
                <button 
                  onClick={() => setReportModalOpen(true)}
                  className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors"
                >
                  Report Lost Item
                </button>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Report Lost Modal */}
      <ReportLostModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        onSubmit={handleReportLost}
      />
    </div>
  )
}

export default LostAndFound