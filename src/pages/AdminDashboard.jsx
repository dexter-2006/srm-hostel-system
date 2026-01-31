import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import PieChart from '../components/PieChart'
import { categories } from '../utils/mockData'
import { formatTimeAgo, getStatusColor, getPriorityColor, showToast } from '../utils/helpers'
import { useSearch } from '../context/SearchContext'
import { useIssues } from '../context/IssuesContext'

const AdminDashboard = () => {
  const { filterAdminIssues, hasActiveSearch, debouncedSearchTerm } = useSearch()
  const { getAdminIssues, updateIssueStatus, getIssueStats, loading, error } = useIssues()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true) // Default collapsed
  const [activeFilter, setActiveFilter] = useState('All')
  const [resolvedIssues, setResolvedIssues] = useState(new Set()) // Track resolved issues
  const [timeFilter, setTimeFilter] = useState('Month') // Week, Month, Year

  // Get all issues from shared store
  const allIssues = getAdminIssues()
  const issueStats = getIssueStats()

  const stats = [
    {
      label: 'Total Issues',
      value: issueStats.total.toString(),
      change: '↑ 12% from last week',
      changeType: 'positive',
      icon: '📊',
      color: 'from-blue-400 to-blue-600'
    },
    {
      label: 'Pending Issues',
      value: issueStats.pending.toString(),
      change: '↑ 8 new today',
      changeType: 'negative',
      icon: '⏳',
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      label: 'Resolved This Month',
      value: issueStats.resolved.toString(),
      change: '↑ 23% improvement',
      changeType: 'positive',
      icon: '✅',
      color: 'from-green-400 to-green-600'
    },
    {
      label: 'Avg Response Time',
      value: '2.3h',
      change: '↓ 45min faster',
      changeType: 'positive',
      icon: '⚡',
      color: 'from-purple-400 to-purple-600'
    }
  ]

  // Apply search filter first, then status filter
  const searchFilteredIssues = filterAdminIssues(allIssues)
  const filteredIssues = activeFilter === 'All' 
    ? searchFilteredIssues 
    : searchFilteredIssues.filter(issue => issue.status === activeFilter)

  // Filter issues based on time period
  const getFilteredIssuesByTime = (timeRange) => {
    const now = new Date()
    let cutoffDate

    switch (timeRange) {
      case 'Week':
        cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case 'Month':
        cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      case 'Year':
        cutoffDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
        break
      default:
        cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    }

    return allIssues.filter(issue => new Date(issue.reportedAt) >= cutoffDate)
  }

  // Get category stats based on time filter
  const getTimeFilteredCategoryStats = () => {
    // Simulate different data for different time periods
    const timeBasedData = {
      'Week': [
        { name: 'Cleanliness', count: 23 },
        { name: 'Plumbing', count: 16 },
        { name: 'Electrical', count: 14 },
        { name: 'Internet/WiFi', count: 10 },
        { name: 'AC/Fan', count: 9 }
      ],
      'Month': [
        { name: 'Cleanliness', count: 78 },
        { name: 'Plumbing', count: 52 },
        { name: 'Electrical', count: 45 },
        { name: 'Internet/WiFi', count: 34 },
        { name: 'AC/Fan', count: 31 }
      ],
      'Year': [
        { name: 'Cleanliness', count: 195 },
        { name: 'Plumbing', count: 130 },
        { name: 'Electrical', count: 113 },
        { name: 'Internet/WiFi', count: 85 },
        { name: 'AC/Fan', count: 78 }
      ]
    }

    return timeBasedData[timeFilter] || timeBasedData['Month']
  }

  const categoryStats = getTimeFilteredCategoryStats()

  // Handle time filter change
  const handleTimeFilterChange = (newTimeFilter) => {
    setTimeFilter(newTimeFilter)
  }

  // Prepare data for pie chart - top 5 categories
  const pieChartData = categoryStats.map(cat => ({
    name: cat.name,
    count: cat.count
  }))

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
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-2xl`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
                <div className="font-manrope font-bold text-3xl text-gray-800 mb-2">
                  {stat.value}
                </div>
                <div className={`text-sm font-semibold ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </div>
              </div>
            ))}
          </div>

          {/* Recent Issues */}
          <div className="bg-white rounded-2xl shadow-sm mb-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="font-manrope font-bold text-xl">Recent Issues</h2>
                <div className="flex gap-2">
                  {['All', 'Reported', 'In Progress', 'Resolved'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeFilter === filter
                          ? 'bg-srm-blue text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              {loading ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">⏳</div>
                  <h3 className="font-semibold text-xl mb-2">Loading issues...</h3>
                  <p className="text-gray-600">Please wait while we fetch the latest data.</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">❌</div>
                  <h3 className="font-semibold text-xl mb-2">Error loading issues</h3>
                  <p className="text-gray-600">{error}</p>
                </div>
              ) : filteredIssues.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="font-semibold text-xl mb-2">
                    {hasActiveSearch ? 'No results found' : 'No issues found'}
                  </h3>
                  <p className="text-gray-600">
                    {hasActiveSearch 
                      ? `No issues match "${debouncedSearchTerm}". Try adjusting your search terms.`
                      : 'No issues match the selected filter.'
                    }
                  </p>
                </div>
              ) : (
                <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Issue
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Reported
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredIssues.map((issue) => {
                    const currentStatus = getCurrentStatus(issue)
                    const isResolved = currentStatus === 'Resolved'
                    
                    return (
                    <tr key={issue.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-manrope font-bold text-gray-600">
                          {issue.id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-xl">
                            {issue.icon}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">{issue.title}</div>
                            <div className="text-sm text-gray-600">{issue.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {issue.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(currentStatus)}`}>
                          {currentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getPriorityColor(issue.priority)}`}>
                          {issue.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {formatTimeAgo(issue.reportedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {!isResolved && (
                            <button
                              onClick={() => handleMarkResolved(issue.id)}
                              className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                            >
                              Issue Solved
                            </button>
                          )}
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400">
                              <circle cx="12" cy="5" r="2"/>
                              <circle cx="12" cy="12" r="2"/>
                              <circle cx="12" cy="19" r="2"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                    )
                  })}
                </tbody>
              </table>
              )}
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Issue Trends Chart */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-manrope font-bold text-lg">Issue Trends</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleTimeFilterChange('Week')}
                    className={`px-3 py-1 text-sm border-2 rounded-lg transition-colors ${
                      timeFilter === 'Week' 
                        ? 'bg-srm-blue text-white border-srm-blue' 
                        : 'border-gray-200 hover:border-srm-blue'
                    }`}
                  >
                    Week
                  </button>
                  <button 
                    onClick={() => handleTimeFilterChange('Month')}
                    className={`px-3 py-1 text-sm border-2 rounded-lg transition-colors ${
                      timeFilter === 'Month' 
                        ? 'bg-srm-blue text-white border-srm-blue' 
                        : 'border-gray-200 hover:border-srm-blue'
                    }`}
                  >
                    Month
                  </button>
                  <button 
                    onClick={() => handleTimeFilterChange('Year')}
                    className={`px-3 py-1 text-sm border-2 rounded-lg transition-colors ${
                      timeFilter === 'Year' 
                        ? 'bg-srm-blue text-white border-srm-blue' 
                        : 'border-gray-200 hover:border-srm-blue'
                    }`}
                  >
                    Year
                  </button>
                </div>
              </div>
              <div className="h-64">
                <PieChart data={pieChartData} title="Issues by Category" />
              </div>
            </div>

            {/* Issues by Category */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-manrope font-bold text-lg mb-6">Issues by Category</h3>
              <div className="space-y-4">
                {categoryStats.map((category, index) => (
                  <div key={category.name} className="flex items-center gap-4">
                    <div 
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-800">{category.name}</span>
                        <span className="font-manrope font-bold text-lg">{category.count}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${category.percentage}%`,
                            backgroundColor: `hsl(${index * 60}, 70%, 50%)`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard