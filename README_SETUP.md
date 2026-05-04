# Setup Guide — Duplicating This Template for a New Client

This project is structured so a new client can be onboarded in well under an
hour. Almost everything client-specific lives in two files:

```
src/config/brand.js     ← identity, contact, colors, fonts (single source)
src/config/client.js    ← feature toggles, default language
```

Per-language copy (page text, FAQ, headings) lives in `src/i18n/he.js` and
`src/i18n/en.js`. Components never hardcode brand text — they read translations
from the `useLanguage()` hook, which pulls shared brand fields from `brand.js`.

---

## 1. Duplicate the project

```bash
# clone the template into a fresh folder
git clone <repo-url> new-client-website
cd new-client-website

# wipe history and start fresh (optional)
rm -rf .git
git init

# install deps
npm install
```

Optional housekeeping:

- Update the `name` field in `package.json`.
- Replace `public/og-image.svg`, `public/favicon.ico`, `public/favicon-32.png`,
  `public/apple-touch-icon.png` with the new client's assets.
- Delete or update `HANDOFF_CHECKLIST.md` and `AUDIT_REPORT.md` if they
  reference the previous client.

---

## 2. Set the client's brand (`src/config/brand.js`)

Open `src/config/brand.js` and edit the values:

| Field | What it controls |
| --- | --- |
| `slug` | localStorage namespace, analytics keys. Use lowercase-hyphenated. |
| `domain` | Production URL — used in canonical links + JSON-LD. No trailing slash. |
| `he.*` / `en.*` | Per-language brand strings (name, subtitle, tagline, address, credential line). |
| `contact.phoneDisplay` | Phone shown in Hebrew/local format. |
| `contact.phoneDisplayEn` | Phone shown in international format. |
| `contact.phoneLink` | `tel:` href (digits only, country code first). |
| `contact.email` | Public email. |
| `contact.whatsappNumber` | Digits only, country code first (e.g. `972526645959`). |
| `contact.whatsappLink` | Auto-built from the number — usually leave alone. |
| `colors.*` | Brand palette (see step 3). |
| `fonts.*` | CSS font stacks. |

After saving, the new values flow to:
- The Logo component (`src/components/Logo.jsx`)
- All `brand.*` fields inside the i18n bundles
- The contact section (phone, email, WhatsApp)
- SEO JSON-LD on the homepage
- `localStorage` namespacing for language + accessibility prefs

> **Note:** `index.html` contains an inline script that reads two localStorage
> keys (`<slug>:lang` and `<slug>:a11y`) before React boots, to avoid a flash
> when restoring the user's language and a11y preferences. If you change
> `brand.slug`, update the `SLUG` constant in the inline boot script in
> `index.html` to match.

---

## 3. Set the brand colors

Edit `brand.colors` in `src/config/brand.js`. The values are pushed to CSS
custom properties at boot (`applyBrandColors()` in `src/main.jsx`), so
Tailwind utilities like `bg-accent`, `text-primary`, `border-neutral-200`
automatically follow them.

You only need to think about:

- `primary` / `primaryLight` — dark navy used for headings + the dark footer.
- `secondary` — the page background.
- `accent` / `accentHover` / `accentDark` — the gold action color.
- The `brand-*` / `accent-*` / `neutral-*` scales — tints used throughout.

The CSS file `src/styles/index.css` still holds the *default* palette so the
page renders correctly during the brief moment before JS hydrates. For most
rebrands this is fine; if you want zero-flash branded color on first paint,
update both `brand.colors.*` and the matching `--color-*` values in the
`@theme` block of `src/styles/index.css`.

---

## 4. Update the copy (`src/i18n/he.js`, `src/i18n/en.js`)

All user-facing text comes from these two files. The structure mirrors the
sections of the page:

```
nav, authority, fit, miniAbout, hero, pain, services, comparison,
process, testimonials, faq, contactSection, contact, footer, legal, a11y
```

- Hebrew is the default. To run an English-only or HE-only site, set
  `client.i18n.defaultLang` in `src/config/client.js` and remove the unused
  language file (also remove its entry from `src/i18n/index.js`).
- Components consume translations via `const { t } = useLanguage();` — never
  add hardcoded strings to components. If you need a new label, add it to
  both `he.js` and `en.js` and reference `t.<section>.<key>`.

---

## 5. Optional: feature toggles (`src/config/client.js`)

Flip these without editing components:

```js
features: {
    languageToggle: true,    // HE/EN switcher in the navbar
    accessibilityPanel: true,
    stickyCta: true,         // mobile sticky CTA
    scrollToTop: true,
}
```

---

## 6. Wire up the contact form

Submission is handled by `src/lib/submitContact.js`. The form validates
required fields (name + phone), shows error messages, transitions to a
success state, and resets itself between submissions — those parts are
already wired and **do not need to be changed**.

The submission handler ships with two ready modes, switched by the
`CONTACT_MODE` constant at the top of the file:

- `'log'` *(default)* — `console.info`s the normalized payload. Use this
  during demo / handoff so you can see what would be sent without a backend.
  The body has a commented `fetch('/api/contact', …)` block to copy-paste
  when you have a real endpoint.
- `'mailto'` — opens the user's mail client with the message prefilled to
  `brand.contact.email`. No backend needed; works offline. Fine for low
  volume but the user has to actually press *Send* in their mail client.

To connect a real backend, replace the body of `submitContactByLog()` with
a call to your service of choice — the function just needs to throw on
error and resolve on success:

- [Formspree](https://formspree.io/) — POST the payload to your endpoint.
- [EmailJS](https://www.emailjs.com/) — client-side, no backend.
- A serverless function (Vercel / Netlify / Cloudflare).

If a submission throws, the form returns to idle and shows the localized
`form.errors.submit` message (defined in `src/i18n/he.js` + `src/i18n/en.js`).

---

## 7. Demo reset

When you duplicate the project for a new client, your browser may still
hold language / accessibility preferences from the original site (they're
stored in `localStorage` under `<brand.slug>:lang` and `<brand.slug>:a11y`).
Two ways to wipe them so the new client starts clean:

**From the browser console (dev mode):**
```js
window.__brandReset()         // clears all keys under brand.slug
window.__brandReset({ reload: true })  // and reload
```
The helper is exposed automatically by `src/config/brand.js` when
`import.meta.env.DEV` is true.

**Programmatically:**
```js
import { resetClientStorage } from './src/config/brand';
resetClientStorage();
```

The function also strips the `a11y-*` classes from `<html>` and clears the
`--a11y-font-scale` CSS var so the page reflects defaults immediately
without a hard reload.

---

## 8. Run locally

```bash
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # preview the production build
```

---

## 9. Deploy

The repo is preconfigured for both Vercel and Netlify SPA routing:

- `vercel.json` — Vercel rewrites all routes to `/index.html`.
- `public/_redirects` — Netlify rewrites all routes to `/index.html`.

### Vercel
```bash
npm i -g vercel
vercel             # link the project
vercel --prod      # deploy production
```
Or import the GitHub repo on the Vercel dashboard.

### Netlify
```bash
npm i -g netlify-cli
netlify deploy             # preview
netlify deploy --prod      # production
```

### Static host (any)
Upload the contents of `dist/` after `npm run build`. Make sure the host
rewrites all unknown paths to `/index.html` (SPA routing).

---

## 10. Post-launch checklist

- Connect Google Search Console + verify ownership.
- Add Google Analytics (or another analytics provider).
- Submit `sitemap.xml` (generate one if not already in `public/`).
- Validate the contact form by submitting a test message.
- Test on mobile + with a screen reader (VoiceOver / NVDA).
- Open the accessibility panel and confirm the toggles work.

---

## File map

```
src/
├── config/
│   ├── brand.js     ← edit for a new client (identity, contact, palette)
│   └── client.js    ← edit for feature toggles + default language
├── i18n/
│   ├── he.js        ← Hebrew copy (imports brand.js for shared fields)
│   ├── en.js        ← English copy (imports brand.js for shared fields)
│   └── index.js     ← language registry + metadata
├── components/      ← presentational components (read text via useLanguage)
├── sections/        ← page sections (Hero, Services, FAQ, ContactSection, ...)
├── pages/           ← Home, Privacy, Accessibility
├── context/         ← LanguageContext, AccessibilityContext
├── lib/
│   ├── submitContact.js ← contact form submit handler (log | mailto | API)
│   └── whatsapp.js      ← WhatsApp deeplink builder
├── styles/index.css ← Tailwind theme defaults (palette mirror)
└── main.jsx         ← entry; calls applyBrandColors() before render
```

## Rules for keeping the template scalable

1. **Never hardcode brand text in components.** Add it to `he.js` + `en.js`
   and reference via `useLanguage()`.
2. **Never hardcode hex colors in components.** Use Tailwind classes
   (`bg-accent`, `text-primary-light`, etc.) or `brand.colors.*` — both
   resolve to the values defined in `brand.js`.
3. **Never hardcode phone / email / WhatsApp.** Edit `brand.contact.*`.
4. **Never duplicate the brand slug.** It's `brand.slug` and accessed via
   `storageKey('something')` everywhere, except the inline preboot script
   in `index.html` (documented above).
