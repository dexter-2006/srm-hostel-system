import React, { useState } from 'react'
import { X, Upload, Camera } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useIssues } from '../context/IssuesContext'
import { hostels, blocks, priorities, categories } from '../utils/mockData'
import { showToast } from '../utils/helpers'

const IssueReportModal = ({ isOpen, onClose, selectedCategory = '' }) => {
  const { user } = useAuth()
  const { addIssue } = useIssues()
  const [formData, setFormData] = useState({
    category: selectedCategory,
    hostel: user?.hostel || '',
    block: user?.block || '',
    room: user?.room || '',
    priority: '',
    description: '',
    isPublic: false
  })
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    if (selectedFiles.length + files.length > 5) {
      showToast('Maximum 5 images allowed', 'error')
      return
    }
    setFiles(prev => [...prev, ...selectedFiles])
  }

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Add issue to Firestore
      const newIssue = await addIssue(formData, user)
      showToast(`Issue ${newIssue.id} reported successfully! You will receive updates via email.`, 'success')
      
      // Reset form
      setFormData({
        category: '',
        hostel: user?.hostel || '',
        block: user?.block || '',
        room: user?.room || '',
        priority: '',
        description: '',
        isPublic: false
      })
      setFiles([])
      onClose()
    } catch (error) {
      showToast(error.message || 'Failed to report issue. Please try again.', 'error')
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
          <h3 className="font-sora font-bold text-2xl">Report New Issue</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-srm-blue focus:outline-none"
              required
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.name} value={cat.name}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hostel *
              </label>
              <select
                name="hostel"
                value={formData.hostel}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-srm-blue focus:outline-none"
                required
              >
                <option value="">Select Hostel</option>
                {hostels.map(hostel => (
                  <option key={hostel} value={hostel}>{hostel}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Block *
              </label>
              <select
                name="block"
                value={formData.block}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-srm-blue focus:outline-none"
                required
              >
                <option value="">Select Block</option>
                {blocks.map(block => (
                  <option key={block} value={block}>{block}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Room Number *
              </label>
              <input
                type="text"
                name="room"
                value={formData.room}
                onChange={handleInputChange}
                placeholder="e.g., 205"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-srm-blue focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Priority */}
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
              <option value="">Select Priority</option>
              {priorities.map(priority => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Issue Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the issue in detail..."
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-srm-blue focus:outline-none resize-vertical"
              required
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Photos (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-srm-blue transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Camera size={48} className="mx-auto text-gray-400 mb-4" />
                <div className="text-gray-600 mb-2">Click to upload images</div>
                <div className="text-sm text-gray-500">Maximum 5 images, up to 10MB each</div>
              </label>
            </div>

            {/* File Preview */}
            {files.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                {files.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Public Issue Checkbox */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isPublic"
              name="isPublic"
              checked={formData.isPublic}
              onChange={handleInputChange}
              className="w-4 h-4 text-srm-blue border-gray-300 rounded focus:ring-srm-blue"
            />
            <label htmlFor="isPublic" className="text-sm text-gray-700">
              Make this issue public (visible to all students)
            </label>
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
                Submitting Issue...
              </div>
            ) : (
              'Submit Issue Report'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default IssueReportModal