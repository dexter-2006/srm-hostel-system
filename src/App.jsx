import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { IssuesProvider } from './context/IssuesContext'
import { SearchProvider } from './context/SearchContext'
import DebugInfo from './components/DebugInfo'
import Login from './pages/Login'
import StudentDashboard from './pages/StudentDashboard'
import AdminDashboard from './pages/AdminDashboard'
import MyIssues from './pages/MyIssues'
import Announcements from './pages/Announcements'
import LostAndFound from './pages/LostAndFound'
import Staff from './pages/Staff'
import Settings from './pages/Settings'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <IssuesProvider>
        <SearchProvider>
          <Router>
            <div className="App">
              <DebugInfo />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Student Routes */}
                <Route
                  path="/student"
                  element={
                    <ProtectedRoute requiredRole="student">
                      <StudentDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/issues"
                  element={
                    <ProtectedRoute requiredRole="student">
                      <MyIssues />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/announcements"
                  element={
                    <ProtectedRoute requiredRole="student">
                      <Announcements />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/lost-found"
                  element={
                    <ProtectedRoute requiredRole="student">
                      <LostAndFound />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/settings"
                  element={
                    <ProtectedRoute requiredRole="student">
                      <Settings />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/issues"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <MyIssues />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/announcements"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <Announcements />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/lost-found"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <LostAndFound />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/staff"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <Staff />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/settings"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <Settings />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </Router>
        </SearchProvider>
      </IssuesProvider>
    </AuthProvider>
  )
}

export default App
