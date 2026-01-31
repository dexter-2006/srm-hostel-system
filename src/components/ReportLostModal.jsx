import React, { useState } from 'react'
import { X, Camera, MapPin, Calendar } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { showToast, generateId } from '../utils/helpers'

const ReportLostModal = ({ isOpen, onClose, onSubmit }) => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    location: '',
    dateTime: '',
    contactInfo: user?.email || '',
    isAnonymous: false
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
    if (selectedFiles.length + files.length > 3) {
      showToast('Maximum 3 images allowed', 'error')
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const newLostItem = {
        id: Date.now(),
        type: 'lost',
        title: formData.itemName,
        description: formData.description,
        location: formData.location,
        reportedAt: new Date(),
        reportedBy: formData.isAnonymous ? 'Anonymous' : user?.name || 'Student',
        contact: formData.isAnonymous ? 'hidden' : formData.contactInfo,
        status: 'Active',
        image: files.length > 0 ? URL.createObjectURL(files[0]) : null
      }
      
      onSubmit(newLostItem)
      showToast('Lost item reported successfully! We\'ll notify you if someone finds it.', 'success')
      
      // Reset form
      setFormData({
        itemName: '',
        description: '',
        location: '',
        dateTime: '',
        contactInfo: user?.email || '',
        isAnonymous: false
      })
      setFiles([])
      onClose()
    } catch (error) {
      showToast('Failed to report lost item. Please try again.', 'error')
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
          <h3 className="font-sora font-bold text-2xl text-red-600">Report Lost Item</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Item Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Item Name *
            </label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleInputChange}
              placeholder="e.g., Black Laptop Bag, Silver Watch, etc."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Item Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the item in detail (color, brand, distinctive features, contents, etc.)"
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none resize-vertical"
              required
            />
          </div>

          {/* Location and Date/Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin size={16} className="inline mr-1" />
                Last Seen Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Library 2nd Floor, Mess Hall, etc."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar size={16} className="inline mr-1" />
                Date & Time Lost
              </label>
              <input
                type="datetime-local"
                name="dateTime"
                value={formData.dateTime}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contact Information *
            </label>
            <input
              type="email"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleInputChange}
              placeholder="Your email address"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
              required
              disabled={formData.isAnonymous}
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Photos (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-red-500 transition-colors">
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
                <div className="text-gray-600 mb-2">Click to upload photos of the item</div>
                <div className="text-sm text-gray-500">Maximum 3 images, up to 10MB each</div>
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

          {/* Anonymous Reporting */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isAnonymous"
              name="isAnonymous"
              checked={formData.isAnonymous}
              onChange={handleInputChange}
              className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
            />
            <label htmlFor="isAnonymous" className="text-sm text-gray-700">
              Report anonymously (your contact info will be hidden from public view)
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white py-4 px-6 rounded-xl font-semibold hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="loading"></div>
                Reporting Lost Item...
              </div>
            ) : (
              'Report Lost Item'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ReportLostModal