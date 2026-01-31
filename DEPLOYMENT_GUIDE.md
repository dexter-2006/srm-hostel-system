#  Deployment Guide - SRM Hostel App

This guide provides step-by-step instructions for deploying the SRM Hostel Issue Tracking System to various platforms.

## 📋 Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Deploy to Vercel](#deploy-to-vercel-recommended)
3. [Deploy to Netlify](#deploy-to-netlify)
4. [Deploy to GitHub Pages](#deploy-to-github-pages)
5. [Deploy to Traditional Hosting](#deploy-to-traditional-hosting)
6. [Deploy with Docker](#deploy-with-docker)
7. [Environment Variables](#environment-variables)
8. [Post-Deployment](#post-deployment)

---

## Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] Tested the app locally (`npm run dev`)
- [ ] Built the production version (`npm run build`)
- [ ] Verified all features work in production mode (`npm run preview`)
- [ ] Configured environment variables
- [ ] Set up your backend API (if using real backend)
- [ ] Prepared your domain name (optional)

---

## Deploy to Vercel (Recommended)

Vercel offers zero-configuration deployment optimized for Vite/React apps.

### Method 1: Using Vercel CLI

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Navigate to project directory
cd srm-hostel-complete-app

# 3. Login to Vercel
vercel login

# 4. Deploy (follow prompts)
vercel

# 5. For production deployment
vercel --prod
```

### Method 2: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your Git repository (GitHub/GitLab/Bitbucket)
4. Vercel auto-detects Vite settings
5. Click "Deploy"

### Configuration

Create `vercel.json` in project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

**URL**: Your app will be available at `https://your-project.vercel.app`

---

## Deploy to Netlify

### Method 1: Netlify CLI

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Login
netlify login

# 3. Initialize site
netlify init

# 4. Deploy
netlify deploy --prod
```

### Method 2: Netlify Drop

1. Build your project: `npm run build`
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag and drop the `dist` folder
4. Your site is live!

### Method 3: Git Integration

1. Push code to GitHub/GitLab
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click "Deploy site"

### Redirects Configuration

Create `public/_redirects` file for SPA routing:

```
/*    /index.html   200
```

**URL**: Your app will be at `https://your-app.netlify.app`

---

## Deploy to GitHub Pages

### Step-by-Step

1. **Install gh-pages**:
```bash
npm install --save-dev gh-pages
```

2. **Update package.json**:
```json
{
  "homepage": "https://yourusername.github.io/srm-hostel-app",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Update vite.config.js**:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/srm-hostel-app/', // your repo name
})
```

4. **Deploy**:
```bash
npm run deploy
```

5. **Enable GitHub Pages**:
   - Go to repository → Settings → Pages
   - Source: gh-pages branch
   - Click Save

**URL**: `https://yourusername.github.io/srm-hostel-app`

---

## Deploy to Traditional Hosting

For shared hosting (cPanel, Apache, Nginx):

### Build the Application

```bash
npm run build
```

### Upload Files

1. Open `dist` folder (created after build)
2. Upload ALL contents via FTP/SFTP to your web server
3. Ensure files are in the public_html or www directory

### Configure Web Server

**For Apache** - Create `.htaccess` in root:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**For Nginx** - Add to server config:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

**URL**: `https://yourdomain.com`

---

## Deploy with Docker

### Create Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Create nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Build and Run

```bash
# Build image
docker build -t srm-hostel-app .

# Run container
docker run -p 8080:80 srm-hostel-app
```

**URL**: `http://localhost:8080`

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "8080:80"
    environment:
      - NODE_ENV=production
```

Run: `docker-compose up`

---

## Environment Variables

### Create `.env.production`

```env
VITE_API_URL=https://api.yourdomain.com
VITE_APP_NAME=SRM HOSTEL
VITE_GOOGLE_CLIENT_ID=your_client_id_here
```

### Platform-Specific Setup

**Vercel**:
- Dashboard → Project → Settings → Environment Variables

**Netlify**:
- Site settings → Build & deploy → Environment → Environment variables

**Docker**:
```bash
docker run -p 8080:80 \
  -e VITE_API_URL=https://api.yourdomain.com \
  srm-hostel-app
```

---

## Post-Deployment

### 1. Verify Deployment

- [ ] Open the deployed URL
- [ ] Test login functionality
- [ ] Report a test issue
- [ ] Check responsive design on mobile
- [ ] Test all navigation links
- [ ] Verify images load correctly

### 2. Set Up Custom Domain (Optional)

**Vercel**:
1. Project → Settings → Domains
2. Add your domain
3. Configure DNS records as instructed

**Netlify**:
1. Site settings → Domain management
2. Add custom domain
3. Update nameservers or add DNS records

### 3. Enable HTTPS

Most platforms (Vercel, Netlify) provide free SSL automatically.

For traditional hosting:
- Use Let's Encrypt (free)
- Or purchase SSL certificate from hosting provider

### 4. Set Up Monitoring

- **Vercel Analytics**: Auto-enabled on paid plans
- **Google Analytics**: Add tracking code to `index.html`
- **Sentry**: For error tracking

### 5. Performance Optimization

- Enable Gzip/Brotli compression
- Set up CDN (if using traditional hosting)
- Configure caching headers
- Optimize images

---

## Troubleshooting

### Issue: 404 errors on page refresh

**Solution**: Ensure SPA routing is configured (see platform-specific sections above)

### Issue: Environment variables not working

**Solution**: 
- Prefix with `VITE_` in Vite apps
- Rebuild after changing variables
- Check platform-specific docs

### Issue: Build fails

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue: Slow load times

**Solution**:
- Enable lazy loading for routes
- Compress images
- Use CDN
- Enable caching

---

## Rollback Procedure

### Vercel/Netlify
- Go to Deployments tab
- Click "Promote to Production" on previous deployment

### Manual Hosting
- Keep backup of previous dist folder
- Upload backup files via FTP

---

## Cost Estimates

| Platform | Free Tier | Paid Plans Start At |
|----------|-----------|---------------------|
| Vercel | Yes, unlimited | $20/month |
| Netlify | Yes, 100GB bandwidth | $19/month |
| GitHub Pages | Yes, unlimited | Free |
| DigitalOcean | No | $5/month |
| AWS | Free tier 12 months | $0.023/hour |

---

## Support & Resources

- **Vite Docs**: https://vitejs.dev/guide/
- **React Router**: https://reactrouter.com/
- **Vercel Support**: https://vercel.com/support
- **Netlify Docs**: https://docs.netlify.com/

---

## Next Steps

After successful deployment:

1. [ ] Set up continuous deployment (CI/CD)
2. [ ] Configure monitoring and alerts
3. [ ] Set up backup strategy
4. [ ] Document deployment process for team
5. [ ] Plan scaling strategy

---

**Need help?** Contact: support@srmhostel.edu.in
