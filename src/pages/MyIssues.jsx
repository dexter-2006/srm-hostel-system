import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import IssueReportModal from '../components/IssueReportModal'
import { formatTimeAgo, getStatusColor, getPriorityColor, showToast } from '../utils/helpers'
import { useAuth } from '../context/AuthContext'
import { useIssues } from '../context/IssuesContext'
import { Plus, Filter, Search } from 'lucide-react'

const MyIssues = () => {
  const { user } = useAuth()
  const { getAdminIssues, getStudentIssues, updateIssueStatus, loading, error } = useIssues()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [resolvedIssues, setResolvedIssues] = useState(new Set()) // Track resolved issues

  const isAdmin = user?.role === 'admin'
  const pageTitle = isAdmin ? 'All Issues' : 'My Issues'
  
  // Get issues from shared store based on role
  const allIssues = isAdmin ? getAdminIssues() : getStudentIssues(user?.name)
  
  // Filter issues based on filters
  let filteredIssues = allIssues
  
  if (activeFilter !== 'All') {
    filteredIssues = filteredIssues.filter(issue => issue.status === activeFilter)
  }
  
  if (searchTerm) {
    filteredIssues = filteredIssues.filter(issue => 
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const statusCounts = {
    All: allIssues.length,
    Reported: allIssues.filter(i => i.status === 'Reported').length,
    'In Progress': allIssues.filter(i => i.status === 'In Progress').length,
    Resolved: allIssues.filter(i => i.status === 'Resolved').length
  }

  // Handle marking issue as resolved
  const handleMarkResolved = async (issueId) => {
    try {
      await updateIssueStatus(issueId, 'Resolved')
      setResolvedIssues(prev => new Set([...prev, issueId]))
      showToast('Issue marked as resolved successfully!', 'success')
    } catch (error) {
      showToast('Failed to update issue status. Please try again.', 'error')
    }
  }

  // Get current status for an issue (check if manually resolved)
  const getCurrentStatus = (issue) => {
    return resolvedIssues.has(issue.id) ? 'Resolved' : issue.status
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
                {pageTitle}
              </h1>
              <p className="text-gray-600">
                {isAdmin 
                  ? 'Manage and track all reported issues across hostels'
                  : 'Track the status of your reported issues'
                }
              </p>
            </div>
            
            {!isAdmin && (
              <button
                onClick={() => setReportModalOpen(true)}
                className="bg-srm-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors flex items-center gap-2"
              >
                <Plus size={20} />
                Report Issue
              </button>
            )}
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search issues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-srm-blue focus:outline-none"
                />
              </div>

              {/* Status Filters */}
              <div className="flex gap-2 flex-wrap">
                {Object.entries(statusCounts).map(([status, count]) => (
                  <button
                    key={status}
                    onClick={() => setActiveFilter(status)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
                      activeFilter === status
                        ? 'bg-srm-blue text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {status}
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      activeFilter === status
                        ? 'bg-white bg-opacity-20'
                        : 'bg-gray-200'
                    }`}>
                      {count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Issues List */}
          <div className="space-y-4">
            {loading ? (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <div className="text-6xl mb-4">⏳</div>
                <h3 className="font-semibold text-xl mb-2">Loading issues...</h3>
                <p className="text-gray-600">Please wait while we fetch the latest data.</p>
              </div>
            ) : error ? (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <div className="text-6xl mb-4">❌</div>
                <h3 className="font-semibold text-xl mb-2">Error loading issues</h3>
                <p className="text-gray-600 mb-6">{error}</p>
              </div>
            ) : filteredIssues.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="font-semibold text-xl mb-2">
                  {searchTerm ? 'No issues found' : 'No issues reported yet'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm 
                    ? 'Try adjusting your search terms or filters'
                    : isAdmin 
                      ? 'Issues will appear here once students start reporting them'
                      : 'Start by reporting your first issue'
                  }
                </p>
                {!isAdmin && !searchTerm && (
                  <button
                    onClick={() => setReportModalOpen(true)}
                    className="bg-srm-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors"
                  >
                    Report Your First Issue
                  </button>
                )}
              </div>
            ) : (
              filteredIssues.map((issue) => {
                const currentStatus = getCurrentStatus(issue)
                const isResolved = currentStatus === 'Resolved'
                
                return (
                <div key={issue.id} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    {/* Main Issue Content */}
                    <div className="flex flex-col lg:flex-row gap-6 flex-1">
                      {/* Issue Icon */}
                      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                        {issue.icon}
                      </div>

                      {/* Issue Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-xl text-gray-800">
                                {issue.title}
                              </h3>
                              <span className="font-manrope font-bold text-sm text-gray-500">
                                {issue.id}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-3">{issue.description}</p>
                            
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                📍 {issue.location}
                              </span>
                              <span className="flex items-center gap-1">
                                👤 {issue.reportedBy}
                              </span>
                              <span className="flex items-center gap-1">
                                📅 {formatTimeAgo(issue.reportedAt)}
                              </span>
                              {issue.assignedTo && (
                                <span className="flex items-center gap-1">
                                  🔧 {issue.assignedTo}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col sm:items-end gap-3">
                            <div className="flex gap-2">
                              <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(currentStatus)}`}>
                                {currentStatus}
                              </span>
                              <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getPriorityColor(issue.priority)}`}>
                                {issue.priority}
                              </span>
                            </div>
                            
                            {isAdmin && (
                              <div className="flex gap-2">
                                <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                                  Assign
                                </button>
                                <button className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors">
                                  Update
                                </button>
                                {!isResolved && (
                                  <button
                                    onClick={() => handleMarkResolved(issue.id)}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                                  >
                                    Issue Solved
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Progress Bar for In Progress issues */}
                        {currentStatus === 'In Progress' && (
                          <div className="mb-4">
                            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                              <span>Progress</span>
                              <span>65%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }} />
                            </div>
                          </div>
                        )}

                        {/* Public/Private indicator */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              issue.isPublic 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {issue.isPublic ? '🌐 Public' : '🔒 Private'}
                            </span>
                            <span className="text-xs text-gray-500">
                              Category: {issue.category}
                            </span>
                          </div>

                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400">
                              <circle cx="12" cy="5" r="2"/>
                              <circle cx="12" cy="12" r="2"/>
                              <circle cx="12" cy="19" r="2"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                )
              })
            )}
          </div>

          {/* Load More Button */}
          {filteredIssues.length > 0 && filteredIssues.length >= 10 && (
            <div className="text-center mt-8">
              <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                Load More Issues
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Issue Report Modal */}
      {reportModalOpen && (
        <IssueReportModal
          isOpen={reportModalOpen}
          onClose={() => setReportModalOpen(false)}
        />
      )}
    </div>
  )
}

export default MyIssues