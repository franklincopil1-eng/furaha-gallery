# cPanel Deployment Guide: Furaha Ministries (`meetfuraha.org`)

This web application is built with **React 19, TypeScript, Vite, and Tailwind CSS**. For cPanel, it is compiled into production static assets (`index.html`, compiled CSS/JS chunks, images, and `.htaccess`) that Apache / LiteSpeed serves directly from:

**Target Server Directory:** `/home/himzwncs/public_html`  
**Domain:** `https://meetfuraha.org`

---

## 📦 What Has Been Pre-Configured for Your cPanel Server

1. **Pre-Built Deployment Archive**:
   - **`cpanel-deploy.zip`** is already compiled and packaged in the root of this project.
   - Contains `index.html`, `.htaccess`, `assets/`, and all optimized media in `images/`.

2. **Server-Side Routing & Caching (`.htaccess`)**:
   - **SPA URL Routing**: Automatically rewrites all incoming requests to `index.html` so users never see a 404 error when navigating or refreshing pages.
   - **Gzip & Deflate Compression**: Minimizes bandwidth usage and accelerates page load times.
   - **Browser Caching Rules**: 1-year caching for fingerprinted assets (`/assets/*.js`, `/assets/*.css`), 1-month for images, and immediate revalidation for `index.html`.
   - **Security Headers**: `X-Content-Type-Options: nosniff`, `X-XSS-Protection`, and blocked access to hidden files (`.env`, `.git`).

---

## 🚀 Step-by-Step Deployment Instructions

### Step 1: Download `cpanel-deploy.zip`
- Locate and download **`cpanel-deploy.zip`** from this project (located at the root folder).

---

### Step 2: Log In to Your cPanel
1. Open your browser and go to your cPanel login page (typically `https://meetfuraha.org:2083` or your hosting provider's cPanel link).
2. Enter your cPanel username (`himzwncs`) and your password.

---

### Step 3: Enable "Show Hidden Files" in cPanel File Manager
1. In the cPanel dashboard, click **File Manager** (under the **Files** section).
2. In the top-right corner of File Manager, click **Settings**.
3. Check the box **"Show Hidden Files (dotfiles)"** and click **Save**.
   *(This ensures that `.htaccess` will be visible and active after extraction).*

---

### Step 4: Upload and Extract to `/home/himzwncs/public_html`
1. In the left navigation pane of File Manager, click on **`public_html`** (the full path displayed in File Manager will be `/home/himzwncs/public_html`).
2. *(Optional Clean-up)*: If there is an existing default placeholder (e.g., `default.html`, old `index.php`, or previous temporary files), delete or back them up into a subfolder.
3. Click the **Upload** button in the top toolbar.
4. Drag and drop **`cpanel-deploy.zip`** into the upload window.
5. Wait until the progress bar reaches 100% and turns green.
6. Click the link at the bottom: **"Go Back to /home/himzwncs/public_html"**.
7. In File Manager, right-click **`cpanel-deploy.zip`** and select **Extract** (or select the file and click **Extract** in the top bar).
8. In the extraction confirmation popup, verify that the destination path is:
   ```text
   /public_html
   ```
   (which corresponds to `/home/himzwncs/public_html`).
9. Click **Extract Files**.
10. Confirm that the following files and folders appear directly inside `/home/himzwncs/public_html`:
    - `index.html`
    - `.htaccess`
    - `assets/` (compiled CSS and JS bundles)
    - `images/` (all site images and icons)
11. **Delete `cpanel-deploy.zip`** from `public_html` to reclaim disk space.

---

### Step 5: Ensure HTTPS / SSL is Enforced
1. In the cPanel main dashboard, navigate to **Domains**.
2. Locate **`meetfuraha.org`** and toggle **Force HTTPS Redirect** to **ON**.
3. Alternatively, `.htaccess` already includes rewrite directives for SSL.

---

### Step 6: Test Your Live Website
1. Visit **`https://meetfuraha.org`** in your browser.
2. Test navigating between views:
   - Our Story & Causes
   - Donation page (`https://meetfuraha.org/#donate`)
   - Who We Serve (`https://meetfuraha.org/#who-we-serve`)
   - Our Work (`https://meetfuraha.org/#our-work`)
   - Our Impact (`https://meetfuraha.org/#our-impact`)
   - Gallery (`https://meetfuraha.org/#gallery`)
3. Press **Refresh (F5 / Cmd+R)** on any page to verify that `.htaccess` smoothly serves the site without 404 errors.

---

## 🛠️ Deploying to a Subdirectory (e.g., `yourdomain.com/furaha/`)
If you are deploying into a subfolder rather than the domain root:
1. Before building, set the base path:
   ```bash
   VITE_BASE_PATH=/furaha/ npm run build:cpanel
   ```
2. In `public/.htaccess`, adjust `RewriteBase`:
   ```apache
   RewriteBase /furaha/
   RewriteRule ^ /furaha/index.html [L]
   ```
3. Upload and extract inside `public_html/furaha/`.
