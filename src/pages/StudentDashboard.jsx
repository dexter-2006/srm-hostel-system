import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import IssueReportModal from '../components/IssueReportModal'
import { categories } from '../utils/mockData'
import { formatTimeAgo, getStatusColor } from '../utils/helpers'
import { useSearch } from '../context/SearchContext'
import { useIssues } from '../context/IssuesContext'
import { useAuth } from '../context/AuthContext'
import { Plus } from 'lucide-react'

const StudentDashboard = () => {
  const { filterStudentIssues, hasActiveSearch, debouncedSearchTerm } = useSearch()
  const { getStudentIssues, loading, error } = useIssues()
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true) // Default collapsed
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')

  // Apply search filter to student's issues
  const allMyIssues = getStudentIssues(user?.name).slice(0, 3) // Show only first 3 issues
  const myIssues = filterStudentIssues(allMyIssues)

  const openReportModal = (category = '') => {
    setSelectedCategory(category)
    setReportModalOpen(true)
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
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 mb-8 text-white">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="mb-6 lg:mb-0">
                <h1 className="font-sora font-bold text-3xl mb-2">
                  Report Your Hostel Issues
                </h1>
                <p className="text-lg opacity-90">
                  Quick and easy issue reporting for better hostel maintenance
                </p>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="font-sora font-bold text-3xl mb-1">24/7</div>
                <div className="text-sm">Support Available</div>
              </div>
            </div>
          </div>

          {/* Quick Report Button */}
          <div className="mb-8">
            <button
              onClick={() => openReportModal()}
              className="w-full lg:w-auto bg-srm-blue text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center gap-3 text-lg"
            >
              <Plus size={24} />
              Report New Issue
            </button>
          </div>

          {/* Issue Categories */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-sora font-bold text-2xl text-gray-800">
                Select Issue Category
              </h2>
              <Link to="/student/issues" className="text-srm-blue hover:text-blue-800 font-semibold flex items-center gap-2">
                View All →
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <div
                  key={category.name}
                  onClick={() => openReportModal(category.name)}
                  className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-2 border-3 border-transparent hover:border-srm-blue group"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    <h3 className="font-sora font-bold text-lg mb-2 text-gray-800">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Recent Issues */}
          <div className="bg-white rounded-2xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="font-sora font-bold text-xl text-gray-800">
                  My Recent Issues
                </h2>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-srm-blue text-white rounded-lg text-sm font-medium">
                    All
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200">
                    Pending
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200">
                    Resolved
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {loading ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">⏳</div>
                  <h3 className="font-semibold text-lg mb-2">Loading your issues...</h3>
                  <p className="text-gray-600">Please wait while we fetch your data.</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">❌</div>
                  <h3 className="font-semibold text-lg mb-2">Error loading issues</h3>
                  <p className="text-gray-600">{error}</p>
                </div>
              ) : myIssues.length === 0 && hasActiveSearch ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="font-semibold text-lg mb-2">No results found</h3>
                  <p className="text-gray-600 mb-4">
                    No issues match "{debouncedSearchTerm}". Try adjusting your search terms.
                  </p>
                </div>
              ) : myIssues.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="font-semibold text-lg mb-2">No issues reported yet</h3>
                  <p className="text-gray-600 mb-4">Start by reporting your first issue</p>
                  <button
                    onClick={() => openReportModal()}
                    className="bg-srm-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors"
                  >
                    Report Issue
                  </button>
                </div>
              ) : (
                <>
                  {myIssues.map((issue) => (
                    <div
                      key={issue.id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">
                        {issue.icon}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-1">{issue.title}</h4>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            📍 {issue.location}
                          </span>
                          <span className="flex items-center gap-1">
                            📅 {formatTimeAgo(issue.reportedAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            ⏰ {issue.priority} Priority
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(issue.status)}`}>
                          {issue.status}
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="text-center pt-4">
                    <Link
                      to="/student/issues"
                      className="text-srm-blue hover:text-blue-800 font-semibold"
                    >
                      View All My Issues →
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Issue Report Modal */}
      {reportModalOpen && (
        <IssueReportModal
          isOpen={reportModalOpen}
          onClose={() => setReportModalOpen(false)}
          selectedCategory={selectedCategory}
        />
      )}
    </div>
  )
}

export default StudentDashboard