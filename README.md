# 🏠 SRM HOSTEL - Smart Issue Tracking System

A modern, full-stack web application for managing hostel facility issues at SRM Institute of Science and Technology.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.2-61DAFB.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

### For Students 🎓
- **Quick Issue Reporting**: Report maintenance issues with photos in under 30 seconds
- **Real-time Tracking**: Monitor issue status from reported to resolved
- **Announcements**: Stay updated with hostel-specific notifications
- **Lost & Found**: Report and claim lost items
- **Community Interaction**: Comment on and upvote public issues
- **Mobile Responsive**: Full functionality on smartphones

### For Administrators 🛠️
- **Dashboard Analytics**: Comprehensive insights into issue patterns
- **Issue Management**: Assign tasks to maintenance staff
- **Announcement System**: Create targeted notifications
- **Lost & Found Moderation**: Verify claims and manage items
- **Advanced Filters**: Search and filter by category, status, priority
- **Reports**: Generate insights on resolution times and issue trends

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16.x or higher
- **npm** or **yarn**
- Modern web browser

### Installation

```bash
# Clone or download the project
cd srm-hostel-complete-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:3000`

### Building for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 📱 Demo Access

### Student Login
- **Email**: `student@srmist.edu.in`
- **Password**: any password
- Or click "Continue with Google"

### Admin Login  
- **Email**: `admin@srm.edu.in`
- **Password**: any password

> **Note**: This is a demo application with simulated authentication. In production, integrate with your actual authentication system.

## 🏗️ Project Structure

```
srm-hostel-complete-app/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── IssueCard.jsx
│   │   ├── CategoryCard.jsx
│   │   ├── AnnouncementCard.jsx
│   │   └── Modal.jsx
│   ├── pages/            # Page components
│   │   ├── Login.jsx
│   │   ├── StudentDashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── MyIssues.jsx
│   │   ├── Announcements.jsx
│   │   ├── LostAndFound.jsx
│   │   └── Settings.jsx
│   ├── context/          # React Context
│   │   └── AuthContext.jsx
│   ├── utils/            # Utilities & helpers
│   │   ├── helpers.js
│   │   ├── mockData.js
│   │   └── constants.js
│   ├── assets/           # Images, icons
│   ├── styles/           # Global styles
│   │   └── index.css
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **State Management**: React Context API

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
- `npm run lint` - Run ESLint (if configured)

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
# Or use Netlify CLI: netlify deploy --prod
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

## 📋 Features Roadmap

- [x] User authentication
- [x] Issue reporting with image upload
- [x] Admin dashboard with analytics
- [x] Announcements system
- [x] Lost & Found module
- [ ] Push notifications
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] Advanced analytics & reports
- [ ] Multi-language support
- [ ] Dark mode
- [ ] QR code issue reporting

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

Developed for SRM Institute of Science and Technology

## 📞 Support

For support or questions:
- Email: support@srmhostel.edu.in
- Create an issue in the repository

## 🙏 Acknowledgments

- SRM Institute of Science and Technology
- All contributors and testers
- Open source community

---

**Made with ❤️ for SRM Students**
