# Deployment Instructions

## Quick Deploy Options

### 1. Vercel (Recommended - Easiest)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Vite and deploy automatically
   - Your app will be live at `https://your-project-name.vercel.app`

### 2. Netlify

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Or connect your GitHub repository for automatic deployments

### 3. GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json**:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Deploy**:
   ```bash
   npm run build
   npm run deploy
   ```

4. **Enable GitHub Pages**:
   - Go to repository Settings > Pages
   - Select "gh-pages" branch
   - Your app will be live at `https://username.github.io/repository-name`

## Environment Variables

No environment variables are required for this project as it uses public APIs.

## Build Configuration

The project is configured with:
- **Build tool**: Vite
- **Output directory**: `dist`
- **Base path**: `/` (root)

## Troubleshooting

### Common Issues:

1. **Build fails**: Make sure all dependencies are installed with `npm install`
2. **API errors**: Check if Open Library API is accessible
3. **Styling issues**: Ensure Tailwind CSS is properly configured

### Performance Tips:

1. **Enable compression** on your hosting platform
2. **Use CDN** for static assets
3. **Enable caching** for API responses

## Production Checklist

- [ ] Test all search functionality
- [ ] Verify responsive design on mobile
- [ ] Check error handling
- [ ] Test favorites functionality
- [ ] Verify API rate limits
- [ ] Test loading states
- [ ] Check browser compatibility

## Monitoring

Consider adding:
- Google Analytics for usage tracking
- Error monitoring (Sentry)
- Performance monitoring (Web Vitals)
