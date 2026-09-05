# 🚀 Automated Git Deployment to cPanel (`meetfuraha.org`)

This guide explains how to set up continuous deployment from your GitHub repository:  
👉 **`https://github.com/franklincopil1-eng/furaha-gallery`**  
to your cPanel server at **`/home/himzwncs/public_html`**.

Whenever you make local changes and run `git push origin main`, your website will update **automatically with zero downtime**—no more manual downloading, zipping, or extracting!

---

## 🌟 Method 1: GitHub Actions (Recommended — Best for React/Vite)

Because this website is a modern **React 19 + TypeScript + Vite** application, it requires Node.js to compile your `.tsx` source code into production `.html`, `.js`, and `.css` files. 

Shared cPanel hosting servers often do not have Node.js / Vite build tools installed in their Git hook environment. **GitHub Actions solves this completely** by compiling the site on GitHub's fast cloud servers and synchronizing the built `dist/` files directly to cPanel.

### How It Works:
1. You run `git push origin main`.
2. GitHub automatically triggers `.github/workflows/deploy.yml` (already created in your repo).
3. GitHub installs packages, builds Vite production files, and securely uploads only changed files into `/public_html/`.
4. Your site updates in ~30 seconds!

### Setup (Takes 2 Minutes):

1. Go to your GitHub repository:  
   **`https://github.com/franklincopil1-eng/furaha-gallery`**
2. Click **Settings** (tab at the top) → In the left sidebar, click **Secrets and variables** → **Actions**.
3. Click the green button **"New repository secret"** and add these 3 secrets:

| Secret Name | What to Enter |
| :--- | :--- |
| **`FTP_SERVER`** | `ftp.meetfuraha.org` (or `meetfuraha.org` or your server IP) |
| **`FTP_USERNAME`** | Your cPanel username (`himzwncs`) or an FTP account created in cPanel |
| **`FTP_PASSWORD`** | Your cPanel password or the password of the FTP account |

*(Tip: In cPanel, under **FTP Accounts**, you can create a dedicated FTP account pointing directly to `/public_html` if you prefer not to use your master cPanel password).*

4. **Test it:** Make any small commit or push to `main`. Go to the **Actions** tab on GitHub to watch the build and deploy complete!

---

## 🧰 Method 2: Native cPanel Git™ Version Control + Webhook

If you prefer to use the built-in **Git™ Version Control** interface inside cPanel, the **`.cpanel.yml`** file is already configured in the root of this repository:

```yaml
---
deployment:
  tasks:
    - export DEPLOYPATH=/home/himzwncs/public_html/
    - /bin/mkdir -p $DEPLOYPATH
    - /bin/cp -R dist/* $DEPLOYPATH
    - /bin/cp dist/.htaccess $DEPLOYPATH 2>/dev/null || :
```

### Setup Steps in cPanel:

#### Step 1: Clone the Repository in cPanel
1. Log into your cPanel dashboard (`https://meetfuraha.org:2083`).
2. Scroll to the **Files** section and click **Git™ Version Control**.
3. Click the blue **Create** button in the top-right corner.
4. Fill in the fields:
   - **Clone URL:** `https://github.com/franklincopil1-eng/furaha-gallery.git`
   - **Repository Path:** `/home/himzwncs/repositories/furaha-gallery`
   - **Repository Name:** `furaha-gallery`
5. Click **Create**. cPanel will clone the repository from GitHub.

#### Step 2: Note Regarding `dist/`
Because cPanel's built-in Git does not run `npm run build` by default, `.cpanel.yml` copies files from the `dist/` directory into `/public_html`. If you use Method 2, ensure your built `dist/` folder is committed to the repository, or use Method 1 (GitHub Actions) which builds automatically.

#### Step 3: Enable Automated Webhook Deployment
1. Inside cPanel under **Git™ Version Control**, click **Manage** next to `furaha-gallery`.
2. Select the **Pull or Deploy** tab.
3. cPanel will display a **Webhook URL** (e.g., `https://meetfuraha.org:2083/cpanel/hooks/...`). Copy this URL.
4. Go to your GitHub repository:  
   `https://github.com/franklincopil1-eng/furaha-gallery/settings/hooks`
5. Click **Add webhook**.
6. Paste the cPanel URL into **Payload URL**, set **Content type** to `application/json`, select **Just the push event**, and click **Add webhook**.
7. Now, whenever you push to GitHub, GitHub notifies cPanel to pull and deploy!

---

## 📋 Summary: Which Method Should You Choose?

- **Choose Method 1 (GitHub Actions):** This is the gold standard for Vite/React apps. You keep your repository clean, GitHub handles building with zero RAM/CPU load on your hosting, and only the generated static website files land in cPanel.
- **Choose Method 2 (cPanel Git):** If you already commit the build artifacts to Git and want cPanel to manage the pull commands directly.
