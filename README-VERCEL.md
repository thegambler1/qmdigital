# Deploy Your Cyberpunk Portfolio to Vercel

## Quick Start (5 minutes)

### Option 1: GitHub + Vercel Dashboard (Easiest)

1. **Push to GitHub**:
   ```bash
   # In your Replit console
   git init
   git add .
   git commit -m "Initial cyberpunk portfolio"
   # Create repo on GitHub, then:
   git remote add origin https://github.com/yourusername/cyberpunk-portfolio.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project" → Import from GitHub
   - Select your repository
   - Vercel automatically detects settings from `vercel.json`
   - Add environment variable: `DATABASE_URL` (get from Supabase)
   - Click "Deploy"

3. **Your site is live!** at `https://your-app.vercel.app`

### Option 2: Vercel CLI (Advanced)

```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel login
vercel --prod
```

## Database Setup (Required)

Your app needs a PostgreSQL database. Choose one:

### Supabase (Recommended - Free tier)
1. Go to [supabase.com](https://supabase.com) → New Project
2. Settings → Database → Connection string
3. Copy URL, replace `[YOUR-PASSWORD]` with your password
4. Add to Vercel as `DATABASE_URL` environment variable

### Neon (Alternative)
1. Go to [neon.tech](https://neon.tech) → New Project
2. Copy connection string
3. Add to Vercel as `DATABASE_URL`

## Environment Variables

In Vercel dashboard → Settings → Environment Variables, add:

- `DATABASE_URL`: Your PostgreSQL connection string
- `NODE_ENV`: `production`

## What Gets Deployed

✓ **Frontend**: React app with cyberpunk design  
✓ **Backend**: Express API with portfolio/product management  
✓ **Admin Panel**: Password-protected admin interface  
✓ **Database**: PostgreSQL with automatic fallback  

## After Deployment

1. **Your live site**: `https://your-app.vercel.app`
2. **Admin access**: `https://your-app.vercel.app/admin` (password: `admin123`)
3. **Shop page**: `https://your-app.vercel.app/shop`

## Features Working on Vercel

- ✅ Portfolio gallery with filtering
- ✅ Product shop with Gumroad integration  
- ✅ Admin panel for content management
- ✅ Site settings customization
- ✅ Contact forms
- ✅ Responsive cyberpunk design
- ✅ Password-protected admin area

## Troubleshooting

**Build failing?** Check Vercel deployment logs  
**Database errors?** Verify `DATABASE_URL` is correct  
**Admin not working?** Password is `admin123`  
**Images not loading?** Use absolute URLs (https://)

## Performance

- **Global CDN**: Your site loads fast worldwide
- **Serverless**: Automatically scales to handle traffic
- **SSL**: HTTPS enabled by default
- **Caching**: Static assets cached automatically

Your cyberpunk portfolio will be live in minutes!