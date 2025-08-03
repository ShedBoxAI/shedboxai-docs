# ShedboxAI Documentation Site Deployment Plan

## Overview
This plan outlines the steps to deploy your Docusaurus documentation site to the domain https://shedboxai.com/

## Recommended Hosting Options

### Option 1: GitHub Pages (Free) - Using ShedBoxAI Organization
1. **Create GitHub Repository in ShedBoxAI Organization**
   - Go to https://github.com/organizations/ShedBoxAI/
   - Click "New repository"
   - Repository name: `docs` or `shedboxai-docs` (recommended for clean URLs)
   - Make it public (required for free GitHub Pages)
   - Initialize with README if needed
   - Push your code to the repository

2. **Configure Docusaurus for GitHub Pages**
   - Update `docusaurus.config.ts`:
     - Set `url: 'https://shedboxai.com'`
     - Set `baseUrl: '/'`
     - Set `organizationName: 'ShedBoxAI'`
     - Set `projectName: 'docs'` (or whatever you name the repo)
     - Set `deploymentBranch: 'gh-pages'`

3. **Setup GitHub Actions for Automatic Deployment**
   - Create `.github/workflows/deploy.yml` for automatic deployment
   - Configure build and deploy to gh-pages branch
   - Ensure organization has Actions enabled

4. **Enable GitHub Pages in Repository Settings**
   - Go to repository Settings → Pages
   - Set source to "Deploy from a branch"
   - Select "gh-pages" branch and "/ (root)" folder
   - Add custom domain: `shedboxai.com`

5. **Custom Domain Configuration**
   - Add CNAME file to static folder with `shedboxai.com`
   - Configure DNS records at your domain registrar:
     - Add CNAME record: `www` → `shedboxai.github.io`
     - Add A records for apex domain to GitHub Pages IPs

### Option 2: Netlify (Free tier available)
1. **Connect Repository**
   - Link your GitHub repository to Netlify
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `build`

2. **Custom Domain**
   - Add custom domain in Netlify dashboard
   - Follow DNS configuration instructions

### Option 3: Vercel (Free tier available)
1. **Import Project**
   - Import from GitHub repository
   - Vercel auto-detects Docusaurus settings

2. **Custom Domain**
   - Add domain in Vercel dashboard
   - Configure DNS records as instructed

## Required DNS Configuration
Regardless of hosting provider, you'll need to configure DNS at your domain registrar:

### For GitHub Pages:
```
Type    Name    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     shedboxai.github.io
```

### For Netlify/Vercel:
Follow the specific DNS instructions provided by your chosen platform.

## Pre-deployment Checklist

1. **Update Configuration**
   - [ ] Set correct URL in `docusaurus.config.ts`
   - [ ] Update site metadata (title, description, etc.)
   - [ ] Verify all internal links work correctly

2. **Test Build**
   - [ ] Run `npm run build` locally
   - [ ] Run `npm run serve` to test production build
   - [ ] Check for any build errors or warnings

3. **Content Review**
   - [ ] Review all documentation pages
   - [ ] Ensure sample data and examples are appropriate
   - [ ] Verify images and assets load correctly

4. **SEO and Performance**
   - [ ] Add proper meta descriptions
   - [ ] Optimize images in `/static/img/`
   - [ ] Test mobile responsiveness

## Step-by-Step Implementation

### Phase 1: Prepare Repository
1. Initialize git repository (if not already done)
2. Create GitHub repository in ShedBoxAI organization
   - Name: `docs` (recommended for clean github.io URL)
   - Visibility: Public
3. Add organization members as collaborators if needed
4. Push code to GitHub

### Phase 2: Configure Docusaurus
1. Update `docusaurus.config.ts` with production settings
2. Add CNAME file to static folder
3. Test build locally

### Phase 3: Setup Hosting
1. Choose hosting provider (recommend GitHub Pages for simplicity)
2. Configure deployment workflow
3. Setup custom domain

### Phase 4: DNS Configuration
1. Access your domain registrar's DNS settings
2. Add required DNS records
3. Wait for DNS propagation (24-48 hours)

### Phase 5: Verify Deployment
1. Test site accessibility at shedboxai.com
2. Verify all pages load correctly
3. Test search functionality
4. Check mobile responsiveness

## Additional Considerations

### SSL Certificate
- GitHub Pages, Netlify, and Vercel all provide free SSL certificates
- Ensure HTTPS is enforced

### Analytics
- Consider adding Google Analytics or similar
- Update privacy policy if collecting analytics

### SEO
- Submit sitemap to Google Search Console
- Verify structured data markup

### Monitoring
- Setup uptime monitoring
- Configure error tracking

## Maintenance
- Regular dependency updates
- Content updates through git workflow
- Monitor site performance and uptime

## Estimated Timeline
- Repository setup: 30 minutes
- Configuration: 1 hour
- DNS setup: 15 minutes (+ 24-48 hours propagation)
- Testing and verification: 1 hour

**Total active time: ~2.5 hours**
**Total time including DNS propagation: 1-2 days**

## GitHub Actions Workflow Template

Create `.github/workflows/deploy.yml` with this content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  pull_request:

jobs:
  deploy:
    name: Deploy to GitHub Pages
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm

      - name: Install dependencies
        run: npm ci
      - name: Build website
        run: npm run build

      - name: Upload to GitHub Pages
        uses: actions/upload-pages-artifact@v2
        with:
          path: build

      - name: Deploy to GitHub Pages
        id: deployment
        if: github.ref == 'refs/heads/main'
        uses: actions/deploy-pages@v2
```

## Organization Permissions Checklist

Before proceeding, ensure:
- [ ] You have admin access to ShedBoxAI organization
- [ ] GitHub Actions is enabled for the organization
- [ ] GitHub Pages is allowed for public repositories
- [ ] Repository will be set to public (required for free GitHub Pages)