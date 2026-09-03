<div align="center">
<!-- <img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" /> -->
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/6a819e1c-90b4-44e4-b4aa-82e0ddf80584

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key (optional)
3. Run the app:
   `npm run dev`

## Deploy to cPanel

This repository is pre-configured for instant cPanel deployment:
1. Run `npm run build:cpanel` (or use the pre-built `cpanel-deploy.zip`).
2. Upload `cpanel-deploy.zip` to your cPanel `public_html` directory via **File Manager**.
3. Right-click and **Extract** the zip file.

For the complete step-by-step instructions, see [CPANEL_DEPLOYMENT.md](./CPANEL_DEPLOYMENT.md).
