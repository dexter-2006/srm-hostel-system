import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'
import { User, Bell, Shield, Palette, Globe, Save } from 'lucide-react'
import { showToast } from '../utils/helpers'

const Settings = () => {
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(false)

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    hostel: user?.hostel || '',
    block: user?.block || '',
    room: user?.room || '',
    phone: '+91 9876543210',
    emergencyContact: '+91 9876543211'
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    issueUpdates: true,
    announcements: true,
    lostFoundAlerts: true
  })

  const isAdmin = user?.role === 'admin'

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'language', label: 'Language', icon: Globe }
  ]

  const handleProfileSave = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      showToast('Profile updated successfully!', 'success')
    } catch (error) {
      showToast('Failed to update profile', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleNotificationSave = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      showToast('Notification preferences updated!', 'success')
    } catch (error) {
      showToast('Failed to update preferences', 'error')
    } finally {
      setLoading(false)
    }
  }

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-6 mb-8">
        <img
          src={user?.avatar}
          alt={user?.name}
          className="w-24 h-24 rounded-full"
        />
        <div>
          <h3 className="font-semibold text-xl mb-2">{user?.name}</h3>
          <p className="text-gray-600 capitalize">{user?.role}</p>
          <button className="mt-2 text-srm-blue hover:text-blue-800 font-medium">
            Change Photo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={profileData.name}
            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-srm-blue focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-srm-blue focus:outline-none"
          />
        </div>

        {!isAdmin && (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hostel
              </label>
              <select
                value={profileData.hostel}
                onChange={(e) => setProfileData({...profileData, hostel: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-srm-blue focus:outline-none"
              >
                <option value="KARRI">KARRI</option>
                <option value="PARRI">PARRI</option>
                <option value="OARRI">OARRI</option>
                <option value="MANARONJITHM">MANARONJITHM</option>
                <option value="SANSSAI">SANSSAI</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Block
              </label>
              <select
                value={profileData.block}
                onChange={(e) => setProfileData({...profileData, block: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-srm-blue focus:outline-none"
              >
                <option value="Block A">Block A</option>
                <option value="Block B">Block B</option>
                <option value="Block C">Block C</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Room Number
              </label>
              <input
                type="text"
                value={profileData.room}
                onChange={(e) => setProfileData({...profileData, room: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-srm-blue focus:outline-none"
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={profileData.phone}
            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-srm-blue focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Emergency Contact
          </label>
          <input
            type="tel"
            value={profileData.emergencyContact}
            onChange={(e) => setProfileData({...profileData, emergencyContact: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-srm-blue focus:outline-none"
          />
        </div>
      </div>

      <button
        onClick={handleProfileSave}
        disabled={loading}
        className="bg-srm-blue text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors disabled:opacity-50 flex items-center gap-2"
      >
        {loading ? <div className="loading"></div> : <Save size={20} />}
        Save Changes
      </button>
    </div>
  )

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {Object.entries(notificationSettings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <h4 className="font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <p className="text-sm text-gray-600">
                  {key === 'emailNotifications' && 'Receive notifications via email'}
                  {key === 'pushNotifications' && 'Receive push notifications in browser'}
                  {key === 'smsNotifications' && 'Receive SMS notifications'}
                  {key === 'issueUpdates' && 'Get notified about issue status updates'}
                  {key === 'announcements' && 'Receive hostel announcements'}
                  {key === 'lostFoundAlerts' && 'Get alerts for lost & found items'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    [key]: e.target.checked
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-srm-blue"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleNotificationSave}
        disabled={loading}
        className="bg-srm-blue text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors disabled:opacity-50 flex items-center gap-2"
      >
        {loading ? <div className="loading"></div> : <Save size={20} />}
        Save Preferences
      </button>
    </div>
  )

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-4">Password & Security</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-srm-blue focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-srm-blue focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-srm-blue focus:outline-none"
            />
          </div>
        </div>
      </div>

      <button className="bg-srm-blue text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors">
        Update Password
      </button>
    </div>
  )

  const renderAppearanceTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-4">Theme Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border-2 border-srm-blue rounded-xl bg-blue-50">
            <div className="w-full h-20 bg-white rounded-lg mb-3"></div>
            <h4 className="font-medium">Light Theme</h4>
            <p className="text-sm text-gray-600">Default light theme</p>
          </div>
          <div className="p-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 cursor-pointer">
            <div className="w-full h-20 bg-gray-800 rounded-lg mb-3"></div>
            <h4 className="font-medium">Dark Theme</h4>
            <p className="text-sm text-gray-600">Easy on the eyes</p>
          </div>
          <div className="p-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 cursor-pointer">
            <div className="w-full h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-3"></div>
            <h4 className="font-medium">Auto</h4>
            <p className="text-sm text-gray-600">System preference</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderLanguageTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-4">Language Settings</h3>
        <div className="space-y-3">
          {['English', 'Tamil', 'Hindi'].map((lang) => (
            <label key={lang} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100">
              <input
                type="radio"
                name="language"
                defaultChecked={lang === 'English'}
                className="w-4 h-4 text-srm-blue border-gray-300 focus:ring-srm-blue"
              />
              <span className="font-medium">{lang}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileTab()
      case 'notifications': return renderNotificationsTab()
      case 'security': return renderSecurityTab()
      case 'appearance': return renderAppearanceTab()
      case 'language': return renderLanguageTab()
      default: return renderProfileTab()
    }
  }

  return (
    <div className={`main-layout bg-gray-50 ${sidebarCollapsed ? '' : 'sidebar-expanded'}`}>
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="main-content-area">
        <Navbar 
          onMobileMenuToggle={() => setSidebarOpen(true)}
          onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          isSidebarCollapsed={sidebarCollapsed}
        />
        
        <main className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-manrope font-bold text-3xl text-gray-800 mb-2">
              Settings
            </h1>
            <p className="text-gray-600">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Tabs */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                          activeTab === tab.id
                            ? 'bg-srm-blue text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Icon size={20} />
                        {tab.label}
                      </button>
                    )
                  })}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm p-8">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Settings