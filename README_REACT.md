# 🏠 SRM HOSTEL - Full React Application

A complete, production-ready React application for managing hostel facility issues at SRM Institute of Science and Technology.

## ✨ Features

### For Students 🎓
- **Quick Issue Reporting**: Report maintenance issues with photos in under 30 seconds
- **Real-time Tracking**: Monitor issue status from reported to resolved
- **Announcements**: Stay updated with hostel-specific notifications
- **Lost & Found**: Report and claim lost items
- **Mobile Responsive**: Full functionality on smartphones

### For Administrators 🛠️
- **Dashboard Analytics**: Comprehensive insights into issue patterns
- **Issue Management**: Assign tasks to maintenance staff
- **Announcement System**: Create targeted notifications
- **Lost & Found Moderation**: Verify claims and manage items
- **Advanced Filters**: Search and filter by category, status, priority

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16.x or higher
- **npm** or **yarn**

### Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:3000`

### Demo Login Credentials

#### Student Login
- **Email**: `student@srmist.edu.in`
- **Password**: any password
- Or click "Demo Student" button

#### Admin Login  
- **Email**: `admin@srm.edu.in`
- **Password**: any password
- Or click "Demo Admin" button

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── IssueReportModal.jsx
│   └── ProtectedRoute.jsx
├── pages/              # Page components
│   ├── Login.jsx
│   ├── StudentDashboard.jsx
│   ├── AdminDashboard.jsx
│   ├── MyIssues.jsx
│   ├── Announcements.jsx
│   ├── LostAndFound.jsx
│   └── Settings.jsx
├── context/            # React Context
│   └── AuthContext.jsx
├── utils/              # Utilities & helpers
│   ├── helpers.js
│   ├── mockData.js
│   └── constants.js
├── styles/             # Global styles
│   └── index.css
├── App.jsx            # Main app component
└── main.jsx           # Entry point
```

## 🎨 Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **State Management**: React Context API

## 📱 Features Overview

### Student Dashboard
- Welcome banner with quick report button
- Issue category selection with icons
- Recent issues tracking
- Mobile-optimized interface

### Admin Dashboard
- Real-time statistics cards
- Issues table with filtering
- Category breakdown charts
- Comprehensive issue management

### Issue Reporting
- Category-based reporting
- Photo upload support
- Priority selection
- Location auto-fill
- Public/private visibility options

### Issue Tracking
- Status progression (Reported → Assigned → In Progress → Resolved)
- Real-time updates
- Comment system
- Progress indicators

### Announcements
- Priority-based notifications
- Hostel-specific targeting
- Pin important announcements
- Rich text content

### Lost & Found
- Report lost items
- Report found items
- Claim system
- Contact information
- Admin moderation

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### Tailwind CSS Customization

Edit `tailwind.config.js` to customize colors, fonts, and spacing:

```javascript
theme: {
  extend: {
    colors: {
      'srm-blue': '#003F87',
      'srm-gold': '#D4AF37',
      // Add more custom colors
    }
  }
}
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build the project
npm run build

# Deploy the 'dist' folder
```

### Traditional Hosting

```bash
# Build the project
npm run build

# Upload the contents of 'dist/' folder to your web server
```

## 🔌 API Integration

The app currently uses mock data in `src/utils/mockData.js`. To integrate with a real backend:

1. Create an API service file:

```javascript
// src/services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const issueAPI = {
  getAll: () => axios.get(`${API_URL}/issues`),
  create: (data) => axios.post(`${API_URL}/issues`, data),
  update: (id, data) => axios.put(`${API_URL}/issues/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/issues/${id}`)
};
```

2. Replace mock data calls with API calls in your components

## 🎯 Key Features Implemented

✅ **Authentication System**
- Role-based access control (Student/Admin)
- Protected routes
- Session persistence

✅ **Issue Management**
- Create, read, update, delete issues
- Photo upload support
- Status tracking
- Priority levels

✅ **Dashboard Analytics**
- Real-time statistics
- Visual charts and graphs
- Category breakdowns

✅ **Responsive Design**
- Mobile-first approach
- Touch-friendly interface
- Adaptive layouts

✅ **Modern UI/UX**
- Clean, professional design
- Smooth animations
- Intuitive navigation

## 🚀 Performance Features

- **Fast Loading**: Optimized bundle size
- **Lazy Loading**: Components loaded on demand
- **Caching**: Smart data caching
- **PWA Ready**: Can be installed as app

## 🔒 Security Features

- **Protected Routes**: Role-based access
- **Input Validation**: Form validation
- **XSS Protection**: Sanitized inputs
- **HTTPS Ready**: Secure deployment

## 📱 Mobile Features

- **Responsive Design**: Works on all screen sizes
- **Touch Optimized**: Large tap targets
- **Fast Performance**: Optimized for mobile
- **Offline Support**: Basic offline functionality

## 🎨 Customization

### Colors
Edit `src/styles/index.css` and `tailwind.config.js` to customize the color scheme.

### Branding
Replace logos and update brand colors in the configuration files.

### Features
Add or remove features by modifying the routing in `src/App.jsx` and creating new page components.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For support or questions:
- Create an issue in the repository
- Email: support@srmhostel.edu.in

---

**Made with ❤️ for SRM Students using React + Vite + Tailwind CSS**