import React, { useState } from 'react'
import { X, Users } from 'lucide-react'
import { showToast } from '../utils/helpers'

const AddStaffModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: 'Maintenance',
    hostelArea: '',
    phone: '',
    email: '',
    status: 'Available',
    hiredDate: new Date().toISOString().split('T')[0] // Today's date in YYYY-MM-DD format
  })
  const [loading, setLoading] = useState(false)

  const staffRoles = [
    'Plumber',
    'Electrician', 
    'Carpenter',
    'Housekeeping',
    'Pest Control',
    'AC/Fan Repair',
    'WiFi Technician',
    'Security Guard'
  ]

  const departments = [
    'Maintenance',
    'IT Support',
    'Security',
    'Administration'
  ]

  const hostelAreas = [
    'All Hostels',
    'KARRI - Block A',
    'KARRI - Block B', 
    'KARRI - Block C',
    'PARRI - Block A',
    'PARRI - Block B',
    'PARRI - Block C',
    'OARRI - Block A',
    'OARRI - Block B',
    'OARRI - Block C',
    'MANARONJITHM - All Blocks',
    'SANSSAI - Block A & B'
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    const requiredFields = ['name', 'role', 'department', 'hostelArea', 'phone', 'email']
    const missingFields = requiredFields.filter(field => !formData[field].trim())
    
    if (missingFields.length > 0) {
      showToast(`Please fill in all required fields: ${missingFields.join(', ')}`, 'error')
      return false
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      showToast('Please enter a valid email address', 'error')
      return false
    }

    // Basic phone validation (Indian format)
    const phoneRegex = /^(\+91[\s-]?)?[6-9]\d{9}$|^\(\+91\)\s?[6-9]\d{4}-?\d{5}$/
    if (!phoneRegex.test(formData.phone.replace(/[\s-()]/g, ''))) {
      showToast('Please enter a valid phone number', 'error')
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const newStaffMember = {
        id: Date.now(),
        name: formData.name,
        role: formData.role,
        department: formData.department,
        hostelArea: formData.hostelArea,
        phone: formData.phone,
        email: formData.email,
        status: formData.status,
        avatar: null,
        hiredDate: new Date(formData.hiredDate),
        statusColor: formData.status === 'Available' ? 'green' : 'red'
      }
      
      onSubmit(newStaffMember)
      showToast(`${formData.name} has been added to the staff successfully!`, 'success')
      
      // Reset form
      setFormData({
        name: '',
        role: '',
        department: 'Maintenance',
        hostelArea: '',
        phone: '',
        email: '',
        status: 'Available',
        hiredDate: new Date().toISOString().split('T')[0]
      })
      
      onClose()
    } catch (error) {
      showToast('Failed to add staff member. Please try again.', 'error')
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
            <Users className="text-orange-500" size={24} />
            <h3 className="font-sora font-bold text-2xl text-orange-500">
              Add New Staff Member
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
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Rajesh Kumar, Priya Sharma"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
              required
            />
          </div>

          {/* Role and Department */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Role *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                required
              >
                <option value="">Select Role</option>
                {staffRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Department *
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                required
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Assigned Hostel/Block */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Assigned Hostel / Block *
            </label>
            <select
              name="hostelArea"
              value={formData.hostelArea}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
              required
            >
              <option value="">Select Assignment</option>
              {hostelAreas.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(+91) 98765-43210"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="staff.member@srmhostel.edu.in"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Status and Hire Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Availability Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                required
              >
                <option value="Available">Available</option>
                <option value="Busy">Busy</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hire Date *
              </label>
              <input
                type="date"
                name="hiredDate"
                value={formData.hiredDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-4 px-6 rounded-xl font-semibold hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="loading"></div>
                Adding Staff Member...
              </div>
            ) : (
              'Add Staff Member'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddStaffModal