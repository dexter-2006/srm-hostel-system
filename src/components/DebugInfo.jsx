import React from 'react'
import { useIssues } from '../context/IssuesContext'

const DebugInfo = () => {
  const { loading, error, useFirebase, issues } = useIssues()

  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px'
    }}>
      <div><strong>🔧 Debug Info</strong></div>
      <div>Firebase: {useFirebase ? '✅ Connected' : '❌ Using Mock Data'}</div>
      <div>Loading: {loading ? '⏳ Yes' : '✅ No'}</div>
      <div>Error: {error ? `❌ ${error}` : '✅ None'}</div>
      <div>Issues: {issues.length} loaded</div>
    </div>
  )
}

export default DebugInfo