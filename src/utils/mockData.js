import { format, subDays, subHours } from 'date-fns'

export const mockIssues = [
  {
    id: '#2847',
    title: 'Water leakage in bathroom',
    description: 'Continuous dripping from ceiling tap',
    category: 'Plumbing',
    location: 'KARRI - Block A - Room 245',
    status: 'In Progress',
    priority: 'Emergency',
    reportedBy: 'Rahul Kumar',
    reportedAt: subHours(new Date(), 2),
    assignedTo: 'Maintenance Team A',
    icon: '🚰',
    isPublic: true
  },
  {
    id: '#2846',
    title: 'Corridor lights not working',
    description: 'Complete darkness in evening hours',
    category: 'Electrical',
    location: 'PARRI - Block B - Floor 3',
    status: 'Assigned',
    priority: 'High',
    reportedBy: 'Priya Sharma',
    reportedAt: subHours(new Date(), 5),
    assignedTo: 'Electrical Team',
    icon: '💡',
    isPublic: true
  },
  {
    id: '#2845',
    title: 'Common bathroom not cleaned',
    description: 'Needs immediate attention',
    category: 'Cleanliness',
    location: 'OARRI - Block A - Floor 2',
    status: 'Reported',
    priority: 'Medium',
    reportedBy: 'Amit Singh',
    reportedAt: subDays(new Date(), 1),
    assignedTo: null,
    icon: '🧹',
    isPublic: false
  },
  {
    id: '#2844',
    title: 'WiFi not working in room',
    description: 'Unable to connect to network',
    category: 'Internet/WiFi',
    location: 'MANARONJITHM - Block A - 156',
    status: 'Resolved',
    priority: 'Low',
    reportedBy: 'Sneha Patel',
    reportedAt: subDays(new Date(), 2),
    assignedTo: 'IT Support',
    icon: '📶',
    isPublic: true
  },
  {
    id: '#2843',
    title: 'Broken bed frame',
    description: 'Safety hazard, needs replacement',
    category: 'Furniture',
    location: 'SANSSAI - Block B - 312',
    status: 'In Progress',
    priority: 'Medium',
    reportedBy: 'Vikram Reddy',
    reportedAt: subDays(new Date(), 3),
    assignedTo: 'Furniture Team',
    icon: '🛏️',
    isPublic: true
  }
]

export const mockAnnouncements = [
  {
    id: 1,
    title: 'Water Supply Maintenance',
    content: 'Water supply will be temporarily unavailable tomorrow from 10 AM to 2 PM for maintenance work.',
    priority: 'High',
    targetHostel: 'All',
    createdAt: subHours(new Date(), 3),
    isPinned: true,
    author: 'Hostel Administration'
  },
  {
    id: 2,
    title: 'Pest Control Drive',
    content: 'Monthly pest control will be conducted this weekend. Please keep your rooms accessible.',
    priority: 'Medium',
    targetHostel: 'KARRI',
    createdAt: subDays(new Date(), 1),
    isPinned: false,
    author: 'KARRI Warden'
  },
  {
    id: 3,
    title: 'WiFi Password Update',
    content: 'New WiFi password: SRM2026@Hostel. Please update your devices.',
    priority: 'Low',
    targetHostel: 'All',
    createdAt: subDays(new Date(), 2),
    isPinned: false,
    author: 'IT Department'
  }
]

export const mockLostAndFound = [
  {
    id: 1,
    type: 'lost',
    title: 'Black Laptop Bag',
    description: 'Contains important documents and charger',
    location: 'Library - 2nd Floor',
    reportedAt: subHours(new Date(), 6),
    reportedBy: 'Anonymous',
    contact: 'hidden',
    status: 'Active',
    image: null
  },
  {
    id: 2,
    type: 'found',
    title: 'Blue Water Bottle',
    description: 'Found near the mess hall',
    location: 'Mess Hall - Ground Floor',
    reportedAt: subDays(new Date(), 1),
    reportedBy: 'Cleaning Staff',
    contact: 'Contact Warden',
    status: 'Available',
    image: null
  },
  {
    id: 3,
    type: 'lost',
    title: 'Silver Watch',
    description: 'Casio digital watch with metal strap',
    location: 'Sports Complex',
    reportedAt: subDays(new Date(), 2),
    reportedBy: 'Rohit M.',
    contact: 'rohit.m@srmist.edu.in',
    status: 'Active',
    image: null
  }
]

export const mockStaff = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Plumber',
    department: 'Maintenance',
    hostelArea: 'KARRI - Block A',
    phone: '(+91) 98765-43210',
    email: 'rajesh.plumber@srmhostel.edu.in',
    status: 'Available',
    avatar: null,
    hiredDate: subDays(new Date(), 365),
    statusColor: 'green'
  },
  {
    id: 2,
    name: 'Suresh Patel',
    role: 'Electrician',
    department: 'Maintenance',
    hostelArea: 'PARRI - Block B',
    phone: '(+91) 98765-43211',
    email: 'suresh.electrician@srmhostel.edu.in',
    status: 'Busy',
    avatar: null,
    hiredDate: subDays(new Date(), 280),
    statusColor: 'red'
  },
  {
    id: 3,
    name: 'Mohan Singh',
    role: 'Carpenter',
    department: 'Maintenance',
    hostelArea: 'OARRI - Block C',
    phone: '(+91) 98765-43212',
    email: 'mohan.carpenter@srmhostel.edu.in',
    status: 'Available',
    avatar: null,
    hiredDate: subDays(new Date(), 450),
    statusColor: 'green'
  },
  {
    id: 4,
    name: 'Lakshmi Devi',
    role: 'Housekeeping',
    department: 'Maintenance',
    hostelArea: 'MANARONJITHM - All Blocks',
    phone: '(+91) 98765-43213',
    email: 'lakshmi.housekeeping@srmhostel.edu.in',
    status: 'Available',
    avatar: null,
    hiredDate: subDays(new Date(), 200),
    statusColor: 'green'
  },
  {
    id: 5,
    name: 'Vinod Sharma',
    role: 'Pest Control',
    department: 'Maintenance',
    hostelArea: 'All Hostels',
    phone: '(+91) 98765-43214',
    email: 'vinod.pestcontrol@srmhostel.edu.in',
    status: 'Busy',
    avatar: null,
    hiredDate: subDays(new Date(), 150),
    statusColor: 'red'
  },
  {
    id: 6,
    name: 'Arun Reddy',
    role: 'AC/Fan Repair',
    department: 'Maintenance',
    hostelArea: 'SANSSAI - Block A & B',
    phone: '(+91) 98765-43215',
    email: 'arun.acrepair@srmhostel.edu.in',
    status: 'Available',
    avatar: null,
    hiredDate: subDays(new Date(), 320),
    statusColor: 'green'
  },
  {
    id: 7,
    name: 'Kiran Tech',
    role: 'WiFi Technician',
    department: 'IT Support',
    hostelArea: 'All Hostels',
    phone: '(+91) 98765-43216',
    email: 'kiran.wifi@srmhostel.edu.in',
    status: 'Available',
    avatar: null,
    hiredDate: subDays(new Date(), 90),
    statusColor: 'green'
  },
  {
    id: 8,
    name: 'Ravi Security',
    role: 'Security Guard',
    department: 'Security',
    hostelArea: 'KARRI - Main Gate',
    phone: '(+91) 98765-43217',
    email: 'ravi.security@srmhostel.edu.in',
    status: 'Available',
    avatar: null,
    hiredDate: subDays(new Date(), 500),
    statusColor: 'green'
  }
]

export const categories = [
  { name: 'Plumbing', icon: '🚰', description: 'Water & Drainage', count: 52 },
  { name: 'Electrical', icon: '💡', description: 'Lights & Power', count: 45 },
  { name: 'Cleanliness', icon: '🧹', description: 'Cleaning Issues', count: 78 },
  { name: 'Internet/WiFi', icon: '📡', description: 'Connectivity', count: 34 },
  { name: 'Furniture', icon: '🪑', description: 'Beds & Tables', count: 25 },
  { name: 'Security', icon: '🔒', description: 'Safety & Locks', count: 18 },
  { name: 'AC/Fan', icon: '❄️', description: 'Cooling Issues', count: 31 },
  { name: 'Other', icon: '📝', description: 'Miscellaneous', count: 12 }
]

export const hostels = ['KARRI', 'PARRI', 'OARRI', 'MANARONJITHM', 'SANSSAI']
export const blocks = ['Block A', 'Block B', 'Block C']
export const priorities = ['Low', 'Medium', 'High', 'Emergency']
export const statuses = ['Reported', 'Assigned', 'In Progress', 'Resolved', 'Closed']

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

export const getCategoryIcon = (category) => {
  const icons = {
    'Plumbing': '🚰',
    'Electrical': '💡',
    'Cleanliness': '🧹',
    'Internet/WiFi': '📡',
    'Furniture': '🪑',
    'Security': '🔒',
    'AC/Fan': '❄️',
    'Other': '📝'
  }
  return icons[category] || '📝'
}