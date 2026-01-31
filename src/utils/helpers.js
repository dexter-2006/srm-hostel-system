import { format, formatDistanceToNow } from 'date-fns'

export const formatDate = (date) => {
  return format(new Date(date), 'MMM dd, yyyy')
}

export const formatDateTime = (date) => {
  return format(new Date(date), 'MMM dd, yyyy HH:mm')
}

export const formatTimeAgo = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export const generateId = () => {
  return '#' + Math.floor(Math.random() * 9000 + 1000)
}

export const showToast = (message, type = 'success') => {
  // Create toast element
  const toast = document.createElement('div')
  toast.className = `fixed bottom-5 right-5 bg-white p-4 rounded-lg shadow-lg z-50 animate-slide-in max-w-sm ${
    type === 'success' ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'
  }`
  
  toast.innerHTML = `
    <div class="flex items-center gap-3">
      <div class="text-xl">
        ${type === 'success' ? '✅' : '❌'}
      </div>
      <div class="text-sm font-medium text-gray-800">
        ${message}
      </div>
    </div>
  `
  
  document.body.appendChild(toast)
  
  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.remove()
  }, 3000)
}

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

export const getStatusColor = (status) => {
  const colors = {
    'Reported': 'bg-yellow-100 text-yellow-800',
    'Assigned': 'bg-blue-100 text-blue-800',
    'In Progress': 'bg-purple-100 text-purple-800',
    'Resolved': 'bg-green-100 text-green-800',
    'Closed': 'bg-gray-100 text-gray-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

export const getPriorityColor = (priority) => {
  const colors = {
    'Low': 'bg-blue-100 text-blue-800',
    'Medium': 'bg-yellow-100 text-yellow-800',
    'High': 'bg-orange-100 text-orange-800',
    'Emergency': 'bg-red-100 text-red-800'
  }
  return colors[priority] || 'bg-gray-100 text-gray-800'
}