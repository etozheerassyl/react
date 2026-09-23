# Task 2: Self-Promotional React Single Page Application (SPA)

A modern, responsive, high-aesthetic self-promotional portfolio built with **React 19**, **Vite**, and **Vanilla CSS**. Designed and developed for **Task 2: Build React App**, configured for automated deployment to **GitHub Pages**.

---

## 🌟 Assignment Requirements Checklist

- [x] **Self-promotional Single Page Application (SPA)** using React
- [x] **Your Name & Image**: Prominently features Yerassyl with a customized 3D developer avatar and glowing aesthetic frame
- [x] **About Me Section**: Interactive tabs with story, core architectural pillars, and quick facts
- [x] **Contact Information (Strict Privacy)**: Safe channels (Planet Earth, GitHub, safe email placeholder, social handle) with **NO** sensitive personal numbers or home addresses
- [x] **At least 3 React Components**: Includes **7 modular components**:
  - `Navbar.jsx` (Navigation, branding, mobile drawer, scroll listener)
  - `Hero.jsx` (Introduction, animated badges, name, avatar, CTA buttons, metrics)
  - `About.jsx` (Interactive tabs: bio, core pillars, stats, and facts)
  - `Skills.jsx` (12 skills categorized with progress indicators and filter pills)
  - `Projects.jsx` (Featured project cards with tags and preview links)
  - `Contact.jsx` (Safe contact info, copy email feature, interactive message form)
  - `Footer.jsx` (Back to top button, quick links, copyright notice)
- [x] **Nice CSS Styling**: Custom Vanilla CSS with modern CSS variables, glassmorphic cards, glowing radial gradients, Google Fonts (`Outfit` & `Plus Jakarta Sans`), and responsive design
- [x] **GitHub Pages Deployment Ready**: `base: './'` configured in `vite.config.js`, `gh-pages` package installed with predeploy/deploy scripts, plus a GitHub Actions CI/CD workflow

---

## 🚀 Getting Started Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### 3. Build & Preview Production Bundle
```bash
npm run build
npm run preview
```

---

## 🌐 Deploying to GitHub Pages

You can deploy this project to GitHub Pages in either of two ways:

### Option 1: One-Command Deployment using `gh-pages` (Recommended)

1. Initialize git and commit your files (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Task 2 React portfolio"
   ```

2. Link to your GitHub repository:
   ```bash
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
   git branch -M main
   git push -u origin main
   ```

3. Run the automated deployment script:
   ```bash
   npm run deploy
   ```
   *This automatically runs `npm run build` and publishes the `dist` folder to your repository's `gh-pages` branch.*

4. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment**, ensure **Source** is set to `Deploy from a branch` and branch is set to `gh-pages` / `/(root)`.
   - Your site will be live at:
     `https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPO_NAME>/`

### Option 2: Automated Deployment via GitHub Actions

This repository already includes `.github/workflows/deploy.yml`. When you push to the `main` branch:
1. Go to **Settings** > **Pages** in your GitHub repository.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Every push to `main` will automatically build and publish the latest version!

---

## 📝 Assignment Submission Details

Attach the following to your submission:
1. **GitHub repository link**: `https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>`
2. **Deployed application link**: `https://<YOUR_USERNAME>.github.io/<YOUR_REPO_NAME>/`
3. **Screenshot**: The captured browser screenshot is saved directly in this project root as:
   - `screenshot.png` (Desktop 1440x900 viewport view)
   - `screenshot_complete.png` (Full top-to-bottom page view)
