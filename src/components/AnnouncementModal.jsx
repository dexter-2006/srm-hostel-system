import React, { useState, useEffect } from 'react'
import { X, Megaphone } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { hostels } from '../utils/mockData'
import { showToast } from '../utils/helpers'

const AnnouncementModal = ({ isOpen, onClose, onSubmit, editingAnnouncement = null }) => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'Medium',
    targetHostel: 'All'
  })
  const [loading, setLoading] = useState(false)

  const isEditing = !!editingAnnouncement

  useEffect(() => {
    if (editingAnnouncement) {
      setFormData({
        title: editingAnnouncement.title,
        content: editingAnnouncement.content,
        priority: editingAnnouncement.priority,
        targetHostel: editingAnnouncement.targetHostel
      })
    } else {
      setFormData({
        title: '',
        content: '',
        priority: 'Medium',
        targetHostel: 'All'
      })
    }
  }, [editingAnnouncement])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const announcementData = {
        ...formData,
        id: editingAnnouncement?.id || Date.now(),
        author: user?.name || 'Admin User',
        createdAt: editingAnnouncement?.createdAt || new Date(),
        isPinned: editingAnnouncement?.isPinned || false
      }
      
      onSubmit(announcementData, isEditing)
      showToast(
        isEditing 
          ? 'Announcement updated successfully!' 
          : 'Announcement created successfully!', 
        'success'
      )
      
      // Reset form if creating new
      if (!isEditing) {
        setFormData({
          title: '',
          content: '',
          priority: 'Medium',
          targetHostel: 'All'
        })
      }
      
      onClose()
    } catch (error) {
      showToast('Failed to save announcement. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-modal-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Megaphone className="text-srm-blue" size={24} />
            <h3 className="font-sora font-bold text-2xl text-srm-blue">
              {isEditing ? 'Edit Announcement' : 'New Announcement'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Announcement Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Water Supply Maintenance, New WiFi Password, etc."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-srm-blue focus:outline-none"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Message / Description *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write the announcement message here..."
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-srm-blue focus:outline-none resize-vertical"
              required
            />
          </div>

          {/* Priority and Target Audience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Priority *
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-srm-blue focus:outline-none"
                required
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Target Audience *
              </label>
              <select
                name="targetHostel"
                value={formData.targetHostel}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-srm-blue focus:outline-none"
                required
              >
                <option value="All">All Hostels</option>
                {hostels.map(hostel => (
                  <option key={hostel} value={hostel}>{hostel}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-srm-blue text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="loading"></div>
                {isEditing ? 'Updating...' : 'Creating...'}
              </div>
            ) : (
              isEditing ? 'Update Announcement' : 'Create Announcement'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AnnouncementModal