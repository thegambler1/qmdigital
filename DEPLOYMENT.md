# Deployment Guide for Vercel

## Option 1: GitHub + Vercel (Recommended)

### Step 1: Push to GitHub
1. Create a new repository on GitHub
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your repository
4. Vercel will auto-detect the configuration from `vercel.json`
5. Add environment variables:
   - `DATABASE_URL` (your Supabase or PostgreSQL connection string)
   - `NODE_ENV=production`
6. Click "Deploy"

## Option 2: Direct Upload

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Deploy
```bash
vercel login
vercel --prod
```

## Environment Variables Required

Set these in Vercel dashboard under Project → Settings → Environment Variables:

- `DATABASE_URL`: Your PostgreSQL database connection string
- `NODE_ENV`: production
- `SESSION_SECRET`: Random string for session encryption

## Database Setup

1. **Supabase** (Recommended):
   - Create account at [supabase.com](https://supabase.com)
   - Create new project
   - Go to Settings → Database
   - Copy connection string (replace [YOUR-PASSWORD])
   - Add to Vercel as `DATABASE_URL`

2. **Neon** (Alternative):
   - Create account at [neon.tech](https://neon.tech)
   - Create database
   - Copy connection string
   - Add to Vercel as `DATABASE_URL`

## Post-Deployment

1. Your app will be available at `https://your-app.vercel.app`
2. Admin panel: `https://your-app.vercel.app/admin` (password: admin123)
3. Run database migrations if needed

## Troubleshooting

### Common Issues:

1. **Build Errors**: Check build logs in Vercel dashboard
2. **Database Connection**: Verify `DATABASE_URL` is correct
3. **CORS Issues**: Frontend and backend are on same domain, should work
4. **404 Errors**: Check `vercel.json` routing configuration

### Build Commands:
- Frontend build: `npm run build` in client directory
- Backend build: Automatic TypeScript compilation by Vercel

## Custom Domain (Optional)

1. In Vercel dashboard, go to Domains
2. Add your custom domain
3. Configure DNS records as shown
4. SSL certificate is automatically generated

## Performance Tips

1. Static assets are automatically cached by Vercel CDN
2. API routes run as serverless functions
3. Database connection pooling is handled automatically
4. Enable gzip compression (automatic on Vercel)

Your cyberpunk portfolio will be live and accessible worldwide!