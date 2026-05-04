# Yuval Digital Website

A professional web-development studio site built with React, Vite, and Tailwind CSS.
Supports full RTL (Hebrew) and English, with brand identity and content centralized for easy rebrand.

## 🛠 Prerequisites

- Node.js (v18 or higher recommended)
- npm

## 🚀 Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run Local Development Server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 🏗 Building for Production

To create a production-ready build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 📝 Content Management

All text content lives in `src/i18n/he.js` and `src/i18n/en.js` and is exposed through the `useLanguage()` hook.
Brand identity (name, contact, color palette, fonts, slug) lives in `src/config/brand.js` — edit it to rebrand the entire site.

## ⚙️ Configuration & Deployment

*   **Routing:** The site uses `react-router-dom`.
*   **Netlify:** A `public/_redirects` file is included for SPA routing support.
*   **Vercel:** A `vercel.json` file is included for SPA routing support.

## ⚠️ Important Note regarding Contact Form

The contact form in `src/sections/ContactSection.jsx` runs through `src/lib/submitContact.js`, which currently logs the payload as a placeholder.
To make it functional, swap the `submitContactByLog` body for a real API call (Formspree, EmailJS, your own `/api/contact`, etc.).

## 📄 License

Proprietary. All rights reserved.
