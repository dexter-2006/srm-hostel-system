import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import AnnouncementModal from '../components/AnnouncementModal'
import ConfirmationModal from '../components/ConfirmationModal'
import { mockAnnouncements } from '../utils/mockData'
import { formatTimeAgo, showToast } from '../utils/helpers'
import { useAuth } from '../context/AuthContext'
import { Plus, Pin, AlertCircle, Info } from 'lucide-react'

const Announcements = () => {
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [announcements, setAnnouncements] = useState(mockAnnouncements)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingAnnouncement, setEditingAnnouncement] = useState(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [announcementToDelete, setAnnouncementToDelete] = useState(null)

  const isAdmin = user?.role === 'admin'

  // Sort announcements: pinned first, then by creation date (newest first)
  const sortedAnnouncements = [...announcements].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return new Date(b.createdAt) - new Date(a.createdAt)
  })

  const handleCreateAnnouncement = () => {
    setEditingAnnouncement(null)
    setModalOpen(true)
  }

  const handleEditAnnouncement = (announcement) => {
    setEditingAnnouncement(announcement)
    setModalOpen(true)
  }

  const handleDeleteAnnouncement = (announcement) => {
    setAnnouncementToDelete(announcement)
    setDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    setAnnouncements(prev => prev.filter(a => a.id !== announcementToDelete.id))
    showToast('Announcement deleted successfully!', 'success')
    setDeleteModalOpen(false)
    setAnnouncementToDelete(null)
  }

  const handleTogglePin = (announcementId) => {
    setAnnouncements(prev => prev.map(announcement => {
      if (announcement.id === announcementId) {
        const newPinnedState = !announcement.isPinned
        showToast(
          newPinnedState ? 'Announcement pinned to top!' : 'Announcement unpinned!', 
          'success'
        )
        return { ...announcement, isPinned: newPinnedState }
      }
      return announcement
    }))
  }

  const handleSubmitAnnouncement = (announcementData, isEditing) => {
    if (isEditing) {
      setAnnouncements(prev => prev.map(a => 
        a.id === announcementData.id ? announcementData : a
      ))
    } else {
      setAnnouncements(prev => [announcementData, ...prev])
    }
  }

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'High': return <AlertCircle className="text-red-500" size={20} />
      case 'Medium': return <Info className="text-yellow-500" size={20} />
      default: return <Info className="text-blue-500" size={20} />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'border-l-red-500 bg-red-50'
      case 'Medium': return 'border-l-yellow-500 bg-yellow-50'
      default: return 'border-l-blue-500 bg-blue-50'
    }
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
                Announcements
              </h1>
              <p className="text-gray-600">
                {isAdmin 
                  ? 'Create and manage hostel announcements'
                  : 'Stay updated with important hostel notifications'
                }
              </p>
            </div>
            
            {isAdmin && (
              <button 
                onClick={handleCreateAnnouncement}
                className="bg-srm-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors flex items-center gap-2"
              >
                <Plus size={20} />
                New Announcement
              </button>
            )}
          </div>

          {/* Announcements List */}
          <div className="space-y-6">
            {sortedAnnouncements.map((announcement) => (
              <div 
                key={announcement.id} 
                className={`bg-white rounded-2xl shadow-sm border-l-4 ${getPriorityColor(announcement.priority)} p-6 hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    {getPriorityIcon(announcement.priority)}
                    <div>
                      <h3 className="font-semibold text-xl text-gray-800 mb-1">
                        {announcement.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>📅 {formatTimeAgo(announcement.createdAt)}</span>
                        <span>👤 {announcement.author}</span>
                        <span>🏠 {announcement.targetHostel}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {announcement.isPinned && (
                      <Pin className="text-red-500" size={20} />
                    )}
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      announcement.priority === 'High' 
                        ? 'bg-red-100 text-red-800'
                        : announcement.priority === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {announcement.priority}
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">
                  {announcement.content}
                </p>

                {isAdmin && (
                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <button 
                      onClick={() => handleEditAnnouncement(announcement)}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteAnnouncement(announcement)}
                      className="px-4 py-2 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                    >
                      Delete
                    </button>
                    <button 
                      onClick={() => handleTogglePin(announcement.id)}
                      className="px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-100 transition-colors"
                    >
                      {announcement.isPinned ? 'Unpin' : 'Pin'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {sortedAnnouncements.length === 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <div className="text-6xl mb-4">📢</div>
              <h3 className="font-semibold text-xl mb-2">No announcements yet</h3>
              <p className="text-gray-600 mb-6">
                {isAdmin 
                  ? 'Create your first announcement to keep students informed'
                  : 'Announcements will appear here when posted by administration'
                }
              </p>
              {isAdmin && (
                <button 
                  onClick={handleCreateAnnouncement}
                  className="bg-srm-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors"
                >
                  Create Announcement
                </button>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Announcement Modal */}
      <AnnouncementModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditingAnnouncement(null)
        }}
        onSubmit={handleSubmitAnnouncement}
        editingAnnouncement={editingAnnouncement}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setAnnouncementToDelete(null)
        }}
        onConfirm={confirmDelete}
        title="Delete Announcement"
        message={`Are you sure you want to delete "${announcementToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  )
}

export default Announcements