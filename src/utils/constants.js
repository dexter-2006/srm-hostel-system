export const APP_NAME = 'SRM HOSTEL'
export const APP_DESCRIPTION = 'Smart Issue Tracking System'

export const ROUTES = {
  LOGIN: '/login',
  STUDENT_DASHBOARD: '/student',
  STUDENT_ISSUES: '/student/issues',
  STUDENT_ANNOUNCEMENTS: '/student/announcements',
  STUDENT_LOST_FOUND: '/student/lost-found',
  STUDENT_SETTINGS: '/student/settings',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_ISSUES: '/admin/issues',
  ADMIN_ANNOUNCEMENTS: '/admin/announcements',
  ADMIN_LOST_FOUND: '/admin/lost-found',
  ADMIN_SETTINGS: '/admin/settings'
}

export const COLORS = {
  PRIMARY: '#003F87',
  SECONDARY: '#D4AF37',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  INFO: '#3B82F6'
}

export const ISSUE_CATEGORIES = [
  'Plumbing',
  'Electrical', 
  'Cleanliness',
  'Internet/WiFi',
  'Furniture',
  'Security',
  'AC/Fan',
  'Other'
]

export const ISSUE_PRIORITIES = [
  'Low',
  'Medium', 
  'High',
  'Emergency'
]

export const ISSUE_STATUSES = [
  'Reported',
  'Assigned',
  'In Progress', 
  'Resolved',
  'Closed'
]

export const HOSTELS = [
  'KARRI',
  'PARRI', 
  'OARRI',
  'MANARONJITHM',
  'SANSSAI'
]

export const BLOCKS = [
  'Block A',
  'Block B',
  'Block C'
]

export const DEMO_CREDENTIALS = {
  ADMIN: {
    email: 'admin@srm.edu.in',
    password: 'admin123'
  },
  STUDENT: {
    email: 'student@srmist.edu.in', 
    password: 'student123'
  }
}