# ⚡ Quick Start Guide

Get the SRM Hostel app running in 3 minutes!

## Option 1: Standalone HTML (Fastest - No Installation)

**Perfect for**: Quick demo, testing, or simple deployment

### Steps:

1. **Open the file**: `srm-hostel-enhanced-responsive.html`
   - Double-click the file
   - OR right-click → Open with → Your browser

2. **That's it!** The app is running locally in your browser.

3. **Demo Login**:
   - Admin: `admin@srm.edu.in` / any password
   - Student: `student@srmist.edu.in` / any password

### Deploy to Web:

Just upload `srm-hostel-enhanced-responsive.html` to any web hosting:
- Rename to `index.html`
- Upload via FTP/cPanel
- Access via your domain

**Pros**: Zero setup, works immediately, single file
**Cons**: Limited features, no real backend

---

## Option 2: Full React App (Recommended for Production)

**Perfect for**: Production deployment, full features, scalability

### Prerequisites:
- Node.js 16+ installed ([Download](https://nodejs.org))

### Steps:

```bash
# 1. Navigate to project folder
cd srm-hostel-complete-app

# 2. Install dependencies (first time only)
npm install

# 3. Start development server
npm run dev
```

Open browser to `http://localhost:3000`

### Build for Production:

```bash
npm run build
# Output will be in 'dist/' folder
```

**Pros**: Full features, scalable, production-ready
**Cons**: Requires Node.js, build step

---

## Which Option Should I Choose?

| Need | Use This |
|------|----------|
| Quick demo for presentation | Standalone HTML |
| Testing/POC for stakeholders | Standalone HTML |
| Simple internal tool | Standalone HTML |
| Production deployment | Full React App |
| Mobile app integration | Full React App |
| Custom backend integration | Full React App |
| Scaling to 1000+ users | Full React App |

---

## Next Steps After Quick Start

### For Standalone HTML:
1. Customize colors in `<style>` section
2. Add your logo/branding
3. Deploy to web hosting

### For React App:
1. Read `README.md` for full documentation
2. Read `DEPLOYMENT_GUIDE.md` for deployment options
3. Integrate with your backend API
4. Customize design in `tailwind.config.js`

---

## Common Issues & Solutions

### Issue: Can't install npm packages
**Solution**: Ensure Node.js is installed. Run `node --version` to check.

### Issue: Port 3000 already in use
**Solution**: Use different port: `npm run dev -- --port 3001`

### Issue: Standalone HTML not working on phone
**Solution**: Upload to web server, don't use file:// protocol

### Issue: White screen after npm run build
**Solution**: Check browser console for errors. Ensure all imports are correct.

---

## File Structure Overview

```
Your Download/
├── srm-hostel-enhanced-responsive.html  # Standalone version
├── srm-hostel-complete-app/            # Full React app
│   ├── src/                            # Source code
│   ├── public/                         # Static files
│   ├── package.json                    # Dependencies
│   ├── README.md                       # Full documentation
│   └── DEPLOYMENT_GUIDE.md             # Deploy instructions
├── QUICK_START.md                      # This file
└── PROJECT_OVERVIEW.md                 # Feature documentation
```

---

## Testing Checklist

After starting the app:

- [ ] Login page loads correctly
- [ ] Can log in as student
- [ ] Can log in as admin
- [ ] Can report an issue
- [ ] Can view dashboard
- [ ] Works on mobile (resize browser)
- [ ] All navigation links work

---

## Support

Need help? Check:
1. `README.md` - Full documentation
2. `DEPLOYMENT_GUIDE.md` - Deployment help
3. Browser console for errors (F12)

---

**🎉 Congratulations! You're all set!**

Start with the Standalone HTML for quick testing, then upgrade to the Full React App for production.
