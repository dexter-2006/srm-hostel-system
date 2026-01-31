import React, { createContext, useContext, useState, useCallback } from 'react'

const SearchContext = createContext()

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  // Debounce search term updates
  const updateSearchTerm = useCallback((term) => {
    setSearchTerm(term)
    
    // Debounce the search term for performance
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(term)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [])

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchTerm('')
    setDebouncedSearchTerm('')
  }, [])

  // Filter function for admin dashboard issues
  const filterAdminIssues = useCallback((issues) => {
    if (!debouncedSearchTerm.trim()) return issues

    const searchLower = debouncedSearchTerm.toLowerCase()
    
    return issues.filter(issue => {
      return (
        issue.title.toLowerCase().includes(searchLower) ||
        issue.id.toLowerCase().includes(searchLower) ||
        issue.location.toLowerCase().includes(searchLower) ||
        issue.reportedBy.toLowerCase().includes(searchLower) ||
        issue.description.toLowerCase().includes(searchLower) ||
        issue.category.toLowerCase().includes(searchLower)
      )
    })
  }, [debouncedSearchTerm])

  // Filter function for student dashboard issues
  const filterStudentIssues = useCallback((issues) => {
    if (!debouncedSearchTerm.trim()) return issues

    const searchLower = debouncedSearchTerm.toLowerCase()
    
    return issues.filter(issue => {
      return (
        issue.title.toLowerCase().includes(searchLower) ||
        issue.status.toLowerCase().includes(searchLower) ||
        issue.category.toLowerCase().includes(searchLower) ||
        issue.description.toLowerCase().includes(searchLower)
      )
    })
  }, [debouncedSearchTerm])

  // Filter function for announcements
  const filterAnnouncements = useCallback((announcements) => {
    if (!debouncedSearchTerm.trim()) return announcements

    const searchLower = debouncedSearchTerm.toLowerCase()
    
    return announcements.filter(announcement => {
      return (
        announcement.title.toLowerCase().includes(searchLower) ||
        announcement.content.toLowerCase().includes(searchLower) ||
        announcement.author.toLowerCase().includes(searchLower) ||
        announcement.targetHostel.toLowerCase().includes(searchLower)
      )
    })
  }, [debouncedSearchTerm])

  // Filter function for lost and found items
  const filterLostAndFound = useCallback((items) => {
    if (!debouncedSearchTerm.trim()) return items

    const searchLower = debouncedSearchTerm.toLowerCase()
    
    return items.filter(item => {
      return (
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.location.toLowerCase().includes(searchLower) ||
        item.reportedBy.toLowerCase().includes(searchLower)
      )
    })
  }, [debouncedSearchTerm])

  const value = {
    searchTerm,
    debouncedSearchTerm,
    updateSearchTerm,
    clearSearch,
    filterAdminIssues,
    filterStudentIssues,
    filterAnnouncements,
    filterLostAndFound,
    hasActiveSearch: debouncedSearchTerm.trim().length > 0
  }

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  )
}

export default SearchContext