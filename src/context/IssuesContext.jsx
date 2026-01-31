import React, { createContext, useContext, useState, useEffect } from 'react'
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  onSnapshot, 
  serverTimestamp,
  query,
  orderBy,
  where
} from 'firebase/firestore'
import { db } from '../firebase'
import { mockIssues } from '../utils/mockData'

const IssuesContext = createContext()

export const useIssues = () => {
  const context = useContext(IssuesContext)
  if (!context) {
    throw new Error('useIssues must be used within an IssuesProvider')
  }
  return context
}

// Get category icon helper
const getCategoryIcon = (category) => {
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

export const IssuesProvider = ({ children }) => {
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [useFirebase, setUseFirebase] = useState(false)

  // Check if Firebase is available and set up real-time listener
  useEffect(() => {
    if (!db) {
      console.log('🔄 Firebase not available, using mock data')
      setIssues(mockIssues)
      setLoading(false)
      setUseFirebase(false)
      return
    }

    console.log('🔥 Setting up Firebase real-time listener')
    setUseFirebase(true)
    
    const issuesRef = collection(db, 'issues')
    const q = query(issuesRef, orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const issuesData = []
        snapshot.forEach((doc) => {
          const data = doc.data()
          issuesData.push({
            id: doc.id,
            ...data,
            // Convert Firestore timestamp to Date object
            reportedAt: data.createdAt?.toDate() || new Date(),
            createdAt: data.createdAt?.toDate() || new Date(),
            // Add UI-specific fields
            title: data.description ? 
              data.description.split(' ').slice(0, 5).join(' ') + '...' : 
              'Issue Report',
            location: `${data.hostel} - ${data.block} - Room ${data.room}`,
            icon: getCategoryIcon(data.category)
          })
        })
        console.log(`📊 Loaded ${issuesData.length} issues from Firestore`)
        setIssues(issuesData)
        setLoading(false)
        setError(null)
      },
      (err) => {
        console.error('❌ Firestore error, falling back to mock data:', err)
        setIssues(mockIssues)
        setLoading(false)
        setError(null) // Don't show error, just use mock data
        setUseFirebase(false)
      }
    )

    return () => unsubscribe()
  }, [])

  // Add new issue to Firestore or local state
  const addIssue = async (formData, user) => {
    try {
      if (useFirebase && db) {
        const issueData = {
          category: formData.category,
          hostel: formData.hostel,
          block: formData.block,
          room: formData.room,
          priority: formData.priority,
          description: formData.description,
          status: 'Reported',
          reportedBy: user?.name || 'Student User',
          createdAt: serverTimestamp(),
          isPublic: formData.isPublic || false,
          assignedTo: null
        }

        const docRef = await addDoc(collection(db, 'issues'), issueData)
        console.log('✅ Issue added to Firestore:', docRef.id)
        
        // Return the new issue with generated ID for immediate feedback
        return {
          id: docRef.id,
          ...issueData,
          title: issueData.description.split(' ').slice(0, 5).join(' ') + '...',
          location: `${issueData.hostel} - ${issueData.block} - Room ${issueData.room}`,
          icon: getCategoryIcon(issueData.category),
          reportedAt: new Date(),
          createdAt: new Date()
        }
      } else {
        // Fallback to local state
        const newIssue = {
          id: '#' + Math.floor(Math.random() * 9000 + 1000),
          category: formData.category,
          hostel: formData.hostel,
          block: formData.block,
          room: formData.room,
          priority: formData.priority,
          description: formData.description,
          status: 'Reported',
          reportedBy: user?.name || 'Student User',
          reportedAt: new Date(),
          createdAt: new Date(),
          isPublic: formData.isPublic || false,
          assignedTo: null,
          title: formData.description.split(' ').slice(0, 5).join(' ') + '...',
          location: `${formData.hostel} - ${formData.block} - Room ${formData.room}`,
          icon: getCategoryIcon(formData.category)
        }
        
        setIssues(prev => [newIssue, ...prev])
        console.log('✅ Issue added to local state:', newIssue.id)
        return newIssue
      }
    } catch (err) {
      console.error('❌ Error adding issue:', err)
      throw new Error('Failed to submit issue. Please try again.')
    }
  }

  // Update issue status in Firestore or local state
  const updateIssueStatus = async (issueId, newStatus, assignedTo = null) => {
    try {
      if (useFirebase && db) {
        const issueRef = doc(db, 'issues', issueId)
        const updateData = { 
          status: newStatus,
          updatedAt: serverTimestamp()
        }
        
        if (assignedTo) {
          updateData.assignedTo = assignedTo
        }

        await updateDoc(issueRef, updateData)
        console.log('✅ Issue status updated in Firestore:', issueId)
      } else {
        // Fallback to local state
        setIssues(prev => prev.map(issue => 
          issue.id === issueId 
            ? { ...issue, status: newStatus, assignedTo }
            : issue
        ))
        console.log('✅ Issue status updated in local state:', issueId)
      }
    } catch (err) {
      console.error('❌ Error updating issue status:', err)
      throw new Error('Failed to update issue status.')
    }
  }

  // Get issues for admin dashboard (all issues)
  const getAdminIssues = () => {
    return issues
  }

  // Get issues for student dashboard (user's issues only)
  const getStudentIssues = (userName) => {
    return issues.filter(issue => issue.reportedBy === userName)
  }

  // Get recent issues (for dashboard display)
  const getRecentIssues = (limit = 5) => {
    return issues.slice(0, limit)
  }

  // Get issues by status
  const getIssuesByStatus = (status) => {
    if (status === 'All') return issues
    return issues.filter(issue => issue.status === status)
  }

  // Get issue statistics
  const getIssueStats = () => {
    const total = issues.length
    const pending = issues.filter(issue => 
      issue.status === 'Reported' || issue.status === 'Assigned' || issue.status === 'In Progress'
    ).length
    const resolved = issues.filter(issue => issue.status === 'Resolved').length
    
    return {
      total,
      pending,
      resolved,
      categories: getCategoryStats()
    }
  }

  // Get category statistics
  const getCategoryStats = () => {
    const categoryCount = {}
    issues.forEach(issue => {
      categoryCount[issue.category] = (categoryCount[issue.category] || 0) + 1
    })
    
    return Object.entries(categoryCount).map(([name, count]) => ({
      name,
      count,
      percentage: issues.length > 0 ? Math.round((count / issues.length) * 100) : 0
    }))
  }

  const value = {
    issues,
    loading,
    error,
    useFirebase,
    addIssue,
    updateIssueStatus,
    getAdminIssues,
    getStudentIssues,
    getRecentIssues,
    getIssuesByStatus,
    getIssueStats,
    getCategoryStats
  }

  return (
    <IssuesContext.Provider value={value}>
      {children}
    </IssuesContext.Provider>
  )
}

export default IssuesContext