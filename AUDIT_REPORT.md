# Website Audit Report
**Project:** ester-mediation-website (אסתר גישור)
**Audit date:** 2026-05-04
**Auditor scope:** Full code, configuration, content, design system, UX, a11y, SEO, performance, build artifacts.
**Verdict at a glance:** A clean, well-organised "starter brochure" SPA — but it is **not yet a real production website for a law/mediation firm**. The form is a fake. The phone number, email, address and domain are placeholders. There is no real photograph of Ester, no credentials, no testimonials, no case studies. SEO is shallow (single indexable HTML, no SSR). The "design system" is a colour palette in a CSS file plus inline Tailwind classes — there is no real component primitive layer. Several styling tokens used in JSX do not exist (`bg-accent-dark`, `text-gold`, `bg-primary-light`), meaning the site is shipping with silently-broken hover states. A typo (`transition-opactiy`) is shipping in production CSS. Conceptually the codebase is sound; legally, commercially and from a credibility standpoint it would not survive scrutiny by a real client today.

---

## 1. Overview

`ester-mediation-website` is a **single-page React SPA** (Vite + React 19 + Tailwind v4) for a Hebrew-language mediation/law practice. It contains one real marketing page (HomePage) split into five scrollable sections (Hero, Services, Process, FAQ, Contact) plus two thin legal sub-pages (Privacy, Accessibility). Routing is handled client-side by `react-router-dom@7`, SEO is injected via `react-helmet-async`, and a `LegalService` JSON-LD blob is emitted on the home page.

All copy lives in **one centralized file** (`src/content/siteContent.js`) — this is the strongest architectural decision in the project. Everything else (icons, layouts, CTAs) is repeated across components in raw inline JSX/SVG.

The repo includes a `HANDOFF_CHECKLIST.md` that explicitly admits the project is **pre-launch**: contact details are placeholders, the form is a simulation, and the OG image is a stub SVG. The audit confirms these statements and finds further problems the checklist does not mention.

The project deploys to Vercel (or Netlify via `_redirects`) as a static SPA. Build size: **~298 KB JS + ~38 KB CSS** (uncompressed) — small for a React app, but inflated for a site of this content density (effectively five static sections). No code-splitting, no image optimisation pipeline, no analytics, no error monitoring.

---

## 2. Pages Structure

### Defined routes (`src/App.jsx`)

| Path             | Component            | Purpose                                                                  |
| ---------------- | -------------------- | ------------------------------------------------------------------------ |
| `/`              | `HomePage`           | One-page marketing site composed of 5 sections (Hero/Services/Process/FAQ/Contact) |
| `/privacy`       | `PrivacyPage`        | Hebrew privacy policy, four short paragraphs                             |
| `/accessibility` | `AccessibilityPage`  | WCAG 2.1 AA accessibility statement (text only, no real widget)          |

Catch-all rewrites in `vercel.json` and `public/_redirects` send any unknown path to `index.html`. There is **no 404 page** — an unknown URL renders as a blank `<main>` shell with header and footer (the `<Routes>` block has no fallback). For a legal/professional service, that is a credibility risk.

### Sitemap declared (`public/sitemap.xml`)

Same three URLs (`/`, `/privacy`, `/accessibility`). No `lastmod`. Domain hard-coded to `https://www.ester-mediation.co.il/` even though the checklist says the domain is not yet finalised.

### Section anchors on the home page

`#hero`, `#services`, `#process`, `#faq`, `#contact` — driven by the `useActiveSection` hook (scroll listener, no IntersectionObserver).

### Hierarchy assessment

There is **no real hierarchy** — it is a flat one-page site with two legal appendices. Genuinely missing pages for a law/mediation practice:

- **About / אודות** (biography of אסתר אלבלק, photograph, license number, education, years of practice, professional memberships) — currently nothing exists about who Ester actually is, beyond the line "עו״ד ומגשרת" in the logo.
- **Per-service detail pages** — `/services/family`, `/services/business` etc. The current "Services" section has 5 cards with one paragraph each. This is too thin both for SEO (no long-tail content for "גישור גירושין", "גישור ירושות", "גישור תמ״א 38") and for a prospect who wants to understand depth.
- **Articles / blog / מאמרים** — primary SEO engine for any Israeli law-firm site. Absent.
- **Testimonials / case anonymised summaries / המלצות** — there is **zero social proof** anywhere. The Hero shows "+50" with three blank grey circles as a fake avatar stack — actively misleading.
- **Pricing / תעריפים / Fee structure FAQ** — nothing addresses cost.
- **Contact landing** with map / address / hours — contact only exists as a section anchor.
- **404** — none.

### Redundant / weak pages

- The `/privacy` page is a **template stub** (4 generic clauses, nothing about cookies, analytics consent, retention period, Israeli Protection of Privacy Law 5741-1981, or data subject rights). Legally insufficient for a real Israeli law office.
- The `/accessibility` page **claims WCAG 2.1 AA conformance**. The audit shows several violations (see §8). Publishing this statement as-is is a legal exposure — Israeli regulations (תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות) תשע״ג–2013) require accuracy.

---

## 3. Components Breakdown

### `src/components/` — global

| File             | Lines | Purpose                                                                                                       | Issues                                                                                                                                                                                                                                                                                                |
| ---------------- | ----- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Navbar.jsx`     | 178   | Sticky header, transparent → white-on-scroll, top utility bar, mobile drawer, active-section highlighting.    | (a) WhatsApp + phone + email icons inlined as raw SVG, duplicated again in mobile drawer, again in Hero, again in Contact. (b) `setTimeout(..., 100)` to scroll after navigate is fragile — race with React render. (c) Mobile drawer uses `z-50` same as overlay → stacking order works only by source-order luck. (d) Drawer does not trap focus. (e) `useActiveSection` reads DOM on every scroll event, no rAF/throttle. (f) `aria-label="פתח תפריט"` is good; the close button has it too. |
| `Footer.jsx`     | 51    | Brand block, nav links, copyright, disclaimer.                                                                | (a) Uses `bg-primary-light` — **this Tailwind class is not defined**; the `--color-primary-light` token in `index.css` does not auto-generate a `bg-*` utility in Tailwind v4 unless explicitly mapped. The footer is rendering with a transparent / fallback background. (b) "צור קשר" link uses `#contact` (no leading `/`) — broken from `/privacy` and `/accessibility`. (c) `nav.links` includes "ראשי" which is just `/#hero` — odd to expose in a footer. |
| `Logo.jsx`       | 33    | Inline SVG icon + brand text. Two variants (`dark`/`light`).                                                  | OK as a primitive. The "light" variant is never used anywhere in the codebase (footer renders its own h3 instead) — dead branch.                                                                                                                                                                       |
| `ServiceCard.jsx`| 82    | Card for a single service, picks an icon by **substring match on the Hebrew title**.                          | (a) `getIcon()` is a fragile string-match dispatch (`title.includes('משפחת')`). Adding a service requires editing this component, defeating the purpose of `siteContent.js`. The icon should live in the data, not the component. (b) The "Building" icon is reused for both `נדל״ן` and `שכנים`. (c) Uses `text-gold` on hover — **`gold` is not a defined Tailwind colour anywhere**. Hover state is broken. (d) `group-hover:text-accent` overrides `group-hover:text-gold` in the same DOM, so the bug is hidden — but the intent is unclear. |

### `src/sections/` — page-local sections

| File             | Lines | Notes                                                                                                                                                                                                                                                                                                                                |
| ---------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Hero.jsx`       | 105   | Two-column hero, "trust card" on the right with a fake `+50` avatar pile (grey circles). Inline checkmark SVG repeated for each bullet. WhatsApp SVG duplicated (also lives in Navbar and Contact). Uses `animate-fade-in-up` — **animation keyframes are not defined** in `index.css`; class is a no-op silently. |
| `Services.jsx`   | 58    | Header + grid + "not sure?" CTA. Contains a CSS typo: `transition-opactiy duration-700` (should be `transition-opacity`). Class is silently invalid → no transition applies. Inline `scrollToContact` is duplicated in `Process.jsx` and `FAQ.jsx`. |
| `Process.jsx`    | 103   | 5-step horizontal stepper, trust-strip, CTA. `getTrustIcon()` switch over hard-coded type strings — same anti-pattern as `ServiceCard.getIcon()`. CTA logic again duplicated. |
| `FAQ.jsx`        | 119   | Accordion + sticky trust card. `aria-labelledby` on the answer panel points to `faq-question-${index}` — **no element in the DOM has that id**, so screen readers will get a dangling reference. The accordion answer is clipped at `max-h-96` — long answers will silently truncate (currently fits, but a fragile constraint). Function name is misspelt: `toggleExact` (should be `toggleExpand`). |
| `Contact.jsx`    | 285   | Two-column layout: trust list + form. **The form is a 1.5-second `setTimeout` that never sends anything anywhere** (line 66). Hard-coded telephone number `050-1234567` is duplicated in JSX (line 118) instead of reading from `brand.phone`. Submit button uses `bg-accent-dark` — **not defined**, so the hover state collapses to base accent. Success-state class `animation-fade-in` is non-existent (should be `animate-*`). Phone regex (`^05\d-?\d{7}$|^0[23489]-?\d{7}$`) is bypassed because the actual condition is `formData.phone.length < 9` — the regex is dead code. |

### `src/pages/`

| File                    | Lines | Notes                                                                                  |
| ----------------------- | ----- | -------------------------------------------------------------------------------------- |
| `HomePage.jsx`          | 64    | Composes the five sections + emits SEO/JSON-LD. JSON-LD `name` uses `brand.name` ("אסתר") instead of `brand.fullName` ("אסתר גישור") — Google will index the practice as just "אסתר". |
| `PrivacyPage.jsx`       | 43    | Renders four content blocks. `useEffect(() => window.scrollTo(0,0), [])` is a per-page workaround for the missing global `<ScrollToTop>` component in router v7. |
| `AccessibilityPage.jsx` | 59    | Same shape as PrivacyPage; same scroll workaround.                                     |

### `src/hooks/`

`useActiveSection.js` — 32 lines, pure scroll listener. No throttle, no rAF, no `IntersectionObserver`. Acceptable on a 5-section page, but it fires on every scroll event on every section while iterating the whole list.

### Layout

`Layout.jsx` is just `<Navbar /><main><Outlet /></main><Footer />`. No skip-link, no `<a href="#main">`, no `lang` attribute (it relies on the `<html lang="he">` in `index.html`).

### Duplication / bad separation summary

- **Inline SVG icon definitions** are repeated 3–5 times each (WhatsApp, phone, mail, checkmark, chevron). There is no `<Icon name="whatsapp"/>` primitive.
- **`scrollToContact` helper** is reimplemented in `Services.jsx`, `Process.jsx`, `FAQ.jsx`, plus the `handleNavClick` logic inside Navbar. Should live in one hook (`useScrollTo`).
- **CTA button styling** ("primary pill", "ghost outline") is reinvented inline at every call site instead of `<Button variant="primary"/>`.
- **No primitives layer at all** — no `Button`, `Card`, `Section`, `Container`, `Heading`, `Icon`, `Input`. Tailwind's utility classes are doing the job of a design system, which is fine for a prototype and brittle for a 2027 redesign.

---

## 4. Design & UI Analysis

### Design tokens (`src/index.css`)

```
--font-sans: "Assistant", sans-serif;
--color-primary:        #0F172A   /* Deep Navy (Slate-900) */
--color-primary-light:  #1E293B   /* Slate-800 */
--color-secondary:      #F8FAFC   /* Slate-50 */
--color-accent:         #CA8A04   /* Gold-600 */
--color-accent-hover:   #A16207   /* Gold-700 */
```

- These are declared in Tailwind v4's `@theme` block, which auto-generates `text-primary`, `bg-accent` etc. **Good.**
- But `--color-primary-light` and `--color-accent-hover` are declared and **never reached as Tailwind utilities** by the components that try to use them (`bg-primary-light` in Footer, `bg-accent-dark` in Contact). The naming convention also drifts — code uses `accent-dark` while the token is `accent-hover`. This is a **broken contract** between the token layer and the component layer.
- A separate `tailwind.config.js` exists and declares `fontFamily: ['"Segoe UI"', 'Tahoma', ...]` — this **conflicts** with the `@theme` block (`Assistant`). In Tailwind v4 `@theme` wins, so the JS config is effectively dead but misleading to future maintainers.

### Typography

- One font family: **Assistant** from Google Fonts, weights 300/400/600/700, loaded via render-blocking `<link>` in `index.html`. No `font-display: swap` override, no `<link rel="preload">` for the WOFF2.
- No fluid typography (`clamp()`). Sizes jump at breakpoints (`text-3xl md:text-5xl`).
- No line-length constraint: paragraphs use `max-w-xl`/`max-w-lg` ad-hoc, never a typographic measure.
- Hebrew RTL is handled at the `<html>` level only. No `dir="auto"` on user-influenced inputs (phone field is forced LTR — good — but messages textarea isn't, so a mixed-language paste would break).

### Spacing & layout

- No declared spacing scale beyond Tailwind defaults. Section vertical rhythm is `py-24` everywhere — visually monotonous.
- Layout container is `container mx-auto px-6` repeated in every section instead of a `<Section>` primitive.
- The `App.css` file is **leftover Vite boilerplate** (`#root { max-width: 1280px; padding: 2rem; text-align: center; }`, `.logo` spinner, etc.). It is not imported by `App.jsx` — but it lives in the repo signalling neglect. Either delete it or note its purpose.

### Visual hierarchy

- All five home-page sections look very similar: centred header, gold underline rule (only on Services), grid of cards or list items, soft pastel blob in the background. After the first section the pattern becomes wallpaper.
- The Hero's "trust card" with `transform rotate-2 hover:rotate-0` is the only element with personality. Everything else is restrained-corporate.
- The avatar pile (`+50` users with three grey blobs) is a **fake credibility marker**. For a law firm this is reputationally dangerous — visitors recognise the pattern.
- Iconography is mixed: outline `heroicons`-style monochrome with gold-on-hover. Consistent in style but icons are reused (building icon for נדל״ן and שכנים) and one icon (the "scale" default) is never reached.
- Brand colour `#CA8A04` (a saturated mustard-gold) on `#F8FAFC` background carries 5.5:1 contrast — passes AA for normal text **only**. Gold-on-white as a button background would fail.

### Design consistency issues (concrete)

- Border radii drift: cards use `rounded-2xl`, the form uses `rounded-3xl`, buttons use `rounded-xl`, `rounded-full`, and `rounded-lg` interchangeably. Five different curvatures across one page.
- Shadow scale drifts: `shadow-sm`, `shadow-lg`, `shadow-xl`, `shadow-2xl`, `shadow-2xl shadow-slate-200/50` all appear with no rule.
- Two different "underline" affordances on links (`border-b-2 border-accent` static vs. animated underline span in Navbar).
- Two different focus rings (`focus:ring-2 focus:ring-accent/50`, `focus:ring-2 focus:ring-accent/20`).
- The Hero CTA has shadow `shadow-primary/20`; the Process CTA uses the same; the Contact submit uses `shadow-accent/20`. Inconsistent semantic colour pairing.

### Is there a design system?

**No.** There is a token layer (5 CSS variables), a font, and a convention. There are no primitives, no documented variants, no Storybook, no Figma reference in the repo, no `components/ui/` directory, no consistent prop API. Everything composes raw Tailwind utilities. For a five-section prototype that's tolerable; for a 2027 rebuild it's the first thing to address.

---

## 5. Legal UX Evaluation

This is the most important section, because it is where the site fails hardest.

### Fitness for a law / mediation practice

- The site reads like a generic "modern startup landing page" with the words "גישור" pasted in. It does not feel like a law office.
- The **professional has no presence**: no photograph, no headshot in the Hero, no signature, no biography, no list of degrees, no bar number (`מ.ר.`), no membership in *לשכת עורכי הדין* or *מוסד הגישור*, no mention of court-list certification under תקנות בתי המשפט (גישור) תשנ״ג–1993. The only proof Ester exists is the line `אסתר אלבלק • עו״ד ומגשרת` in the logo subtitle — 22 pixels tall.
- The address `רחוב המגשרים 10, תל אביב` is a placeholder joke ("Mediators Street 10").
- The phone number `050-1234567` is the canonical Israeli placeholder — it is the equivalent of `(555) 555-5555` in the US and **immediately destroys credibility**.
- The email `office@ester-law.co.il` is on a different domain (`ester-law.co.il`) than the brand domain (`ester-mediation.co.il`) — confusing and unprofessional.

### Trust signals

| Signal expected on a legal site                | Present? |
| ---------------------------------------------- | -------- |
| Real photograph of the practitioner            | ❌       |
| Bar registration number (מ.ר.)                 | ❌       |
| Years of experience                            | ❌       |
| List of degrees and institutions               | ❌       |
| Court-list mediator certification              | ❌       |
| Professional memberships / לוגו של לשכת עורכי הדין | ❌       |
| Press mentions / "as seen in"                  | ❌       |
| Verified Google reviews / star rating          | ❌       |
| Client testimonials                            | ❌       |
| Anonymised case studies / success stories      | ❌       |
| Office address with map                        | ❌ (placeholder text only) |
| Hours of operation                             | ❌       |
| Clear pricing or "free consultation" promise   | Partial — "ללא התחייבות" mentioned once in Contact |
| Verifiable license / link to registry          | ❌       |
| Disclaimer that content is not legal advice    | ✅ (footer) — present and correct |
| Privacy policy                                 | ⚠ Stub only |
| Accessibility statement                        | ⚠ Stub only — and the claim of WCAG AA is **inaccurate** |

The "+50" stat in the Hero next to three grey ghost avatars is **not a trust signal — it is an anti-signal**. A real prospect immediately sees it as fabricated.

### Clarity of services

- Five service cards, one paragraph each, no depth.
- No explanation of what gisbur (גישור) actually is for a first-time visitor — the FAQ partially covers this in the first question, but it is buried in an accordion.
- Specialisation is unclear. The cards cover family + business + workplace + real estate + community — a very wide net for a single mediator. Either Ester is a generalist (which conflicts with "specialisation" framing) or the cards over-promise. There is no narrative explaining why one person handles all five.
- **Mediation vs. lawyering ambiguity**: the logo says "עו״ד ומגשרת" (advocate AND mediator). Nowhere does the site explain whether Ester represents clients in litigation, or whether she is exclusively a neutral mediator. This is a critical distinction under the Israeli Bar's ethical rules — a mediator cannot then represent either party. The site does not address this.

### CTA clarity

- Primary CTA across the site is **"קביעת שיחה" / "שיחת ייעוץ"** ("schedule a call" / "consultation call"). Consistent. **Good.**
- Secondary CTA is WhatsApp. Consistent. **Good.**
- However: the Contact section says "אחזור אליכם השיחה תוך 24 שעות עסקים" but then offers a `tel:` link to `050-1234567` — promising both a callback *and* immediate phone reach. Choose one promise.
- The form has a "subject" dropdown that defaults to `disabled` empty — but the field is **not marked required**, and validation never checks it. A submission with no subject succeeds.
- The success message ("הפרטים התקבלו בהצלחה") is **a lie** — no data was transmitted. From a legal-UX standpoint this is worse than a broken form: it is misleading the user about consent and processing of personal data, which itself is a privacy concern under Israel's חוק הגנת הפרטיות.

---

## 6. Responsiveness

### Breakpoints in use

Default Tailwind: `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536. The codebase uses only `md:` and `lg:`. No `sm:` and no `xl:`.

### Behaviour by viewport

- **Mobile (< 768)**: Hero collapses to single column, trust card moves below text; Services grid becomes 1 column; Process becomes a vertical list with a left-side connector line; FAQ becomes single column with the trust card *above* the accordion (`order-last lg:order-none` flips it on desktop). Contact form stacks. Mobile drawer opens from the right (correct for RTL). All acceptable.
- **Tablet (768–1023)**: Services grid becomes 2 columns; Process keeps the 5-column horizontal stepper that was designed for desktop — it will be cramped at 768px and the connector line risks cutting through text. Contact remains 1 column up to `lg`, leaving lots of whitespace.
- **Desktop (≥ 1024)**: Full 2-column heroes, 3-column services, 5-step horizontal process. Top utility bar appears (`hidden lg:block`).

### Concrete breakage points

- **Process at 768–900px**: 5 columns at 768px = ~150px per column for an icon, title, and 12-word description. Lines wrap awkwardly.
- **Hero trust card** at 320–360px (small phones): the card's `p-6 sm:p-10` drops to `p-6` but the rotation `rotate-2` plus `shadow-2xl` may push edges past container padding. The blue blur halo is `bg-accent/20 blur-3xl rounded-full transform rotate-12 scale-75` and on iPhone SE-width screens may cause horizontal-scroll bleed.
- **Navbar utility bar** is `hidden lg:block` so it disappears on mobile/tablet. The phone/email/WhatsApp shortcuts only reappear in the *open* mobile drawer — a user who hasn't tapped the hamburger has no quick-contact affordance from a phone.
- **Footer** stacks `flex flex-col md:flex-row justify-between items-center` — on tablet (768–900) the three blocks compress unevenly. The disclaimer at the bottom is constrained to `max-w-2xl mx-auto` and reads centred — fine.
- **Body container width**: `container` Tailwind default expands to `max-w-7xl` (1280px) before locking. On `2xl` displays content remains 1280px while the page is 1920+ — large unused side margins.
- **The `App.css` `#root { max-width: 1280px; padding: 2rem; }` rule** is *not* applied (App.css is not imported), but if anyone re-imports it, the entire site's layout will collapse to a 1280px-wide, centred, padded box.

### What was not testable from code review

- Whether `dir="rtl"` on `<html>` plus Tailwind's logical properties (`pr-4`, `mr-4`, `right-0`) interact correctly. Tailwind v4 has logical-property utilities (`ps-`, `pe-`, `start-`, `end-`) and the codebase **does not use them** — it uses physical `pr-`, `mr-`, `left-`, `right-` everywhere. This works because RTL is set globally, but it makes future LTR support (e.g., English version) painful. This needs a browser test to confirm no visual regressions in mirrored layouts.

---

## 7. Performance

### Build artifacts (`dist/`)

- `index-92JTxOD8.js` — **298 KB** uncompressed (~95 KB gzipped, estimated). Includes React 19 + react-router 7 + react-helmet-async + all five sections in one chunk.
- `index-BmKyQPpW.css` — **38 KB** uncompressed. Tailwind v4 output for a small page; not great, suggests either Tailwind isn't tree-shaking aggressively or the `@theme` is generating many unused utilities.
- `og-image.svg` — **556 bytes**, an ugly text-only fallback.

### Issues

1. **No code splitting.** `App.jsx` imports `HomePage`, `PrivacyPage`, `AccessibilityPage` statically. For a SPA where 99% of traffic only sees `/`, the privacy & accessibility page bundles ship to every visitor. Should use `React.lazy` + `<Suspense>`.
2. **Render-blocking Google Fonts.** `index.html` loads `Assistant` 300/400/600/700 with no `&display=swap` already on the URL — wait, the URL **does** include `&display=swap`. Good. But no `font-display` fallback metric, no `link rel="preload"`, no self-hosted WOFF2. Israeli connections to Google Fonts can be slow.
3. **No SSR / no prerender.** A SPA serving a static marketing site to Google means initial paint is blank `<div id="root"></div>` until React hydrates. Lighthouse SEO and LCP will both suffer. For 2027 standards this should be Next.js / Astro / Vite SSG.
4. **JSON-LD is scoped to home only**, but not the privacy/accessibility pages — fine, but the JSON-LD itself uses `brand.name` ("אסתר") as `name`, not `brand.fullName` ("אסתר גישור"). Google will index the practice incorrectly.
5. **No analytics, no error monitoring.** No GA, no Plausible, no Cloudflare web analytics, no Sentry. The handoff checklist mentions adding GA *after* launch — none configured yet.
6. **No service worker / no cache headers** (Vercel defaults apply). `vercel.json` only handles SPA rewrite.
7. **Scroll listeners** in `Navbar.jsx` (line 19) and `useActiveSection.js` are not throttled or rAF-batched. On low-end Android devices scrolling will jank.
8. **`max-h-96` accordion animation** transitions `max-height` — a known performance footgun (it triggers layout on every frame). For nine FAQ items it is fine; if the list grew it would not be.
9. **Inline SVG bloat.** Every icon is duplicated as inline JSX — the WhatsApp icon path appears 5 times across the bundle. A sprite or `<svg><use href="#wa"/></svg>` pattern would shrink the JS bundle measurably.
10. **No image optimisation pipeline.** There are no real images in the site (good for now), but as soon as a headshot or photo is added there is no `<picture>`, no `srcset`, no AVIF/WebP, no Vite image plugin.
11. **Web Vitals exposure.** Without SSR the LCP element is the Hero `<h1>`, but it cannot paint until the JS executes — expect LCP > 2.5s on 3G.

### SEO basics

- ✅ `<html lang="he" dir="rtl">`
- ✅ `<title>` and `<meta description>` per route (via Helmet)
- ✅ Open Graph + Twitter card meta (via Helmet)
- ✅ JSON-LD `LegalService` on home
- ✅ `sitemap.xml` and `robots.txt` declared
- ❌ `<title>` of the **shipped `index.html`** is still `ester-mediation-website` (the literal Vite default). Crawlers that don't execute JS see this; some social previews will too.
- ❌ No `<link rel="canonical">`.
- ❌ No `hreflang` (relevant if an English version is planned).
- ❌ No favicon — `index.html` references `/vite.svg` (the Vite default).
- ❌ Sitemap has no `<lastmod>`; priorities are guesses.
- ❌ `og-image.svg` — Facebook/LinkedIn/WhatsApp preview crawlers do not always render SVG. Should be PNG/JPEG 1200×630.
- ❌ No structured data for FAQ (`@type: FAQPage`) — the site has 9 FAQs and is throwing away free SERP real estate.
- ❌ JSON-LD `priceRange: "$$"` is a guess and may be misleading.

---

## 8. Accessibility

The site **claims WCAG 2.1 AA** in `/accessibility`. Audit reality:

### What works

- `<html lang="he" dir="rtl">` is correct.
- Semantic landmarks: `<header>` (Navbar), `<main>` (Layout), `<footer>` (Footer), `<section>` for each home block.
- `aria-labelledby` on every section pointing to a heading id.
- FAQ accordion buttons have `aria-expanded` and `aria-controls`.
- Hamburger and close buttons have `aria-label`.
- Form fields use proper `<label htmlFor>` association.
- Form errors use `aria-invalid` and `aria-describedby` (only on the name field — see below).
- Submit button has `disabled` while submitting.
- `prefers-reduced-motion` is referenced in `App.css` (but App.css isn't loaded).

### What fails

1. **No skip-to-main-content link.** Mandatory for keyboard users on a page with a long sticky header.
2. **Mobile drawer does not trap focus.** Tab keeps moving into the page behind the overlay.
3. **Mobile drawer does not return focus to the hamburger** when closed.
4. **`<button onClick={() => setIsOpen(true)}>` (hamburger) does not have `aria-expanded`** to reflect drawer state.
5. **Focus styles are removed on the hamburger** (`focus:outline-none` with no replacement). WCAG 2.4.7 violation.
6. **FAQ aria-labelledby points to non-existent id `faq-question-${index}`** — the question's `<span>` has no id, the `<button>` has no id either. Screen readers will announce a dangling reference.
7. **Form field `aria-invalid` and `aria-describedby` are present only on the *name* field**; phone, email, message lack them. Inconsistent error announcement.
8. **The `<select>` placeholder option** (`<option value="" disabled>בחרו נושא...</option>`) is not marked required, and the form does not validate that a subject was chosen. Submitting blank "subject" is silently accepted.
9. **Status changes are not announced.** The submit transition `idle → submitting → success` swaps a whole subtree without `aria-live="polite"`. Screen-reader users will not know the form succeeded.
10. **Checkmark icons** are decorative but lack `aria-hidden="true"`. Same for every inline SVG (WhatsApp, phone, mail, chevron — none have `aria-hidden`).
11. **Text contrast risks**: gold `#CA8A04` on white = 4.27:1 — passes large-text AA but **fails** for normal-size body text (needs 4.5:1). The Navbar active link, the FAQ "more" link, and several "(לא מצאת תשובה?)" links use `text-accent` at 15px — borderline failure.
12. `text-slate-400` on white = ~3.4:1 — used for the privacy note ("הפנייה נשמרת בדיסקרטיות מלאה") and microcopy. **Fails AA** at 12px.
13. `text-slate-500` on white = ~4.4:1 — borderline. Used for "באילו נושאים..." secondary CTA labels.
14. **Phone field is forced `dir="ltr"`** on what is otherwise an RTL form. Cursor jumps may confuse some users.
15. **The `<button onClick={() => setIsOpen(true)}>` mobile toggle has no `aria-controls`** referencing the drawer panel.
16. **Keyboard scroll-anchor navigation**: clicking nav links calls `e.preventDefault()` then `scrollIntoView({ behavior: 'smooth' })` — fine, but focus is **not moved to the destination section**. A keyboard user clicks "שירותים", page scrolls, but focus is still on the nav link. Re-tabbing returns to the next nav item, not into the section.
17. **Smooth scroll is forced** in `index.css` (`scroll-behavior: smooth`) — should respect `@media (prefers-reduced-motion: reduce)`.
18. **No `<noscript>` fallback** — a user with JS disabled (or before hydration) sees a blank page.
19. The `/accessibility` page promises "האתר מותאם לניווט במקלדת" and "ישנו שימוש בכותרות ותגיות לשיפור ההתמצאות" — partially true, but issues 1, 2, 3, 4, 5, 16 above contradict the first claim, and 6, 9, 10 contradict the second.

**Conclusion:** The accessibility statement is **inaccurate as published**. This is a legal liability under Israeli accessibility regulations.

---

## 9. Content Review

### Tone

Overall tone is **professional, restrained, gently warm** — appropriate for the domain. Language is unforced Hebrew, no awkward translation feel. Hero's `"גישור שמחזיר שקט — בדרך מכבדת, מהירה וברורה"` is the strongest line on the site.

### Strengths

- The FAQ is **the best content on the site**. Nine questions, each answered in 2–4 sentences, no fluff. Covers process, timing, confidentiality, enforceability, what happens if mediation fails, lawyer involvement.
- Disclaimer ("המידע באתר אינו מהווה ייעוץ משפטי") is correct and present in the footer.
- The 5-step process is clear and walks a prospect through the funnel logically.

### Weaknesses & repetitions

- **"דיסקרטיות" appears 4 times** across Hero bullets, Process trust strip, FAQ trust card, FAQ Q7 — overuse weakens it. Pick one prominent placement.
- **"בדרכי נועם"** appears in tagline, SEO description, OG image. Cliché.
- **Hero subtitle is lazy**: `"אסתר אלבלק | אסתר גישור — עו״ד ומגשרת. ליווי בתהליך שמטרתו הסכמה, כבוד הדדי וחיסכון בזמן ובעלויות."` — reads like a CV bullet, not a value proposition. No hook, no specificity.
- **Service descriptions are 1-sentence stubs**. "גישור עסקי / פתרון סכסוכים בין שותפים, ספקים ולקוחות, תוך שמירה על המוניטין והמשך הפעילות העסקית" — true, but says nothing only Ester would say. Rewrite each in the voice of "what changes for the client when they hire me, specifically".
- **Hero microtext** "חזרה בתוך 24 שעות עסקים" appears, and Contact says "אחזור אליכם השיחה תוך 24 שעות עסקים" — same promise, slightly different phrasing. Pick one.
- **Trust card titles** repeat "בתיאום אישי" as a badge in both Hero and FAQ — feels copy-pasted.
- **Bullets use mixed structures**: Hero bullets are noun phrases ("דיסקרטיות מלאה"), FAQ trust card bullets are sentences ("דיסקרטיות מלאה לאורך כל הדרך"). Standardise.

### Missing content

- Bio (about the lawyer)
- Years of practice / case count
- Mediator certification details
- Any testimonial
- Any case study (anonymised)
- Pricing or "first session free / paid" clarity
- Geographic coverage (Tel Aviv only? Anywhere by Zoom?)
- Languages spoken
- Office accessibility (ramp, elevator, etc. — should be in the accessibility statement)
- Any blog / article / educational content
- A real explanation of what mediation is, before any sales copy
- Anything explaining the difference between "עו״ד" and "מגשרת" roles when both come from the same person

### Microcopy nits

- The form's "אימייל (אופציונלי)" label conflicts with the validation that does run on email — silent confusion.
- "שליחת פרטים" on submit is clinical. "שלחי לי הודעה" / "שליחה" would be warmer. (The current wording also assumes a generic addressee — a mediator's site would normally use "שלחי לאסתר".)
- Footer privacy note in form (`"הפנייה נשמרת בדיסקרטיות מלאה. אין באמור ייעוץ משפטי."`) is **inaccurate** — the form does not save anything; it discards data after a fake `setTimeout`. Misleading.

---

## 10. Tech Stack

### Runtime

- **React 19.2** — current.
- **react-dom 19.2** — current.
- **react-router-dom 7.12** — current major (data-router APIs, but the project uses the classic `<BrowserRouter><Routes>` pattern).
- **react-helmet-async 2.0.5** — works, but `react-helmet-async` is essentially in maintenance mode; the React 19 ecosystem is moving toward native `<title>`/`<meta>` support inside components. For 2027, replace.

### Build & tooling

- **Vite 7.2** — current.
- **@vitejs/plugin-react 5.1** — current (no `react-swc` plugin used; using Babel transform).
- **Tailwind CSS 4.1** with `@tailwindcss/postcss` and `autoprefixer`. v4 is the new CSS-first config — but the repo *also* keeps a legacy `tailwind.config.js` with a different `fontFamily`. Conflict.
- **PostCSS 8.5**, **autoprefixer 10.4** — current.
- **ESLint 9.39** flat config with `react-hooks` and `react-refresh` rules. Minimal; no `eslint-plugin-jsx-a11y` (which would have caught most of the issues in §8), no `eslint-plugin-react`, no Prettier, no TypeScript despite `@types/react` being installed (suggesting an aborted TS migration?).
- No tests (no Vitest, no Playwright, no Testing Library).
- No CI configuration (no `.github/`, no Vercel build hook beyond default).

### State management

None. Each component manages its own `useState`. No Redux, Zustand, Jotai, Context. Acceptable for this site's complexity.

### Styling method

- Tailwind v4 utility classes (≈99% of styling).
- Five CSS variables in `@theme`.
- One `@layer base` block with `scroll-behavior: smooth` and heading defaults.
- Stale `App.css` not imported.
- No CSS Modules, no styled-components, no Emotion.

### Folder structure

```
src/
  App.css          (DEAD — unused boilerplate)
  App.jsx          (router root)
  Layout.jsx       (header + main + footer wrapper)
  index.css        (Tailwind import + theme tokens + base)
  main.jsx         (entry)
  assets/          (only react.svg — unused)
  components/      (Navbar, Footer, Logo, ServiceCard — global)
  content/         (siteContent.js — single source of truth for copy)
  hooks/           (useActiveSection.js)
  pages/           (HomePage, PrivacyPage, AccessibilityPage)
  sections/        (Hero, Services, Process, FAQ, Contact — home-page sections)
```

This is a **clean, conventional, easy-to-navigate structure** for a small SPA. The content/sections separation is the right instinct. The thing missing is a `components/ui/` (primitives) layer.

### Hosting / deployment

- `vercel.json` for Vercel rewrites.
- `public/_redirects` for Netlify SPA fallback.
- Both shipped — pick one platform and remove the other to avoid confusion.

---

## 11. Key Problems

Ranked by severity. Each item is concrete and locatable.

### Critical (blocks launch)

1. **Contact form does not send anything.** `Contact.jsx:66` is `setTimeout(() => setStatus('success'), 1500)`. The site lies to every user who fills it in. **Legal exposure** under privacy law (claiming the data is stored when it isn't) and **commercial loss** (every lead goes nowhere).
2. **Placeholder identity everywhere.** Phone `050-1234567` (canonical Israeli placeholder), address `רחוב המגשרים 10` (joke), email on the wrong domain, domain not finalised. Listed in `siteContent.js` lines 7–11, also hard-coded a second time in `Contact.jsx:118`.
3. **Hero's `+50 clients` avatar pile is fabricated.** Three grey circles + "+50" label with no testimonial backing. Fraud-adjacent for a regulated profession.
4. **Accessibility statement publishes a false WCAG 2.1 AA conformance claim.** Multiple AA violations are visible in code (focus traps, contrast, focus rings removed, status not announced, dangling `aria-labelledby`). Israeli regulations require accuracy.
5. **Privacy policy is a generic four-paragraph stub.** No mention of cookies, analytics, third-party services, retention period, data subject rights, or contact officer for privacy queries. Insufficient for a law office.
6. **No bio, photo, license number, or biographical proof** that Ester exists. Critical for a legal-services site.

### High (degrades trust or quality immediately)

7. **Broken Tailwind classes shipping in production:** `bg-primary-light` (Footer), `bg-accent-dark` (Contact submit hover), `text-gold` (ServiceCard hover), `animate-fade-in-up` (Hero), `animation-fade-in` (Contact success). All silently no-op.
8. **CSS typo `transition-opactiy`** (`Services.jsx:21`) — invalid class.
9. **Misspelled function `toggleExact`** (`FAQ.jsx:8`) — works, but visible code-smell.
10. **FAQ `aria-labelledby` references a non-existent id** (`faq-question-${index}`).
11. **`index.html` `<title>` is still `ester-mediation-website`** — leaks to non-JS crawlers and previewers.
12. **Favicon is `/vite.svg`** — the Vite default still ships.
13. **JSON-LD uses `brand.name` ("אסתר") instead of `brand.fullName`.**
14. **Every visitor downloads the privacy and accessibility pages bundled into the home-page JS** — no `React.lazy`.
15. **OG image is a 556-byte SVG** — fine for some platforms, broken on others (WhatsApp link previews especially).
16. **`tailwind.config.js` and `index.css` `@theme` declare conflicting font stacks.**

### Medium (technical debt / quality issues)

17. **Dead code:** `src/App.css` (Vite boilerplate), `src/assets/react.svg`, the unused "light" variant of `<Logo>`.
18. **Icon dispatch by Hebrew substring match** (`ServiceCard.jsx:6`, `Process.jsx:15`) — brittle and hides knowledge in components.
19. **Inline SVG icon duplication** — phone, mail, WhatsApp, checkmark each appear 3–5× in the bundle.
20. **`scrollToContact` reimplemented in three sections.**
21. **No `<ScrollToTop>` router component**; pages compensate with per-page `useEffect`.
22. **Scroll listeners not throttled** (Navbar, useActiveSection).
23. **Form `subject` field never validated** even though it has a "choose subject" placeholder.
24. **Phone validation regex is dead code** (replaced by length-only check).
25. **No 404 route.**
26. **No skip-to-content link.**
27. **No `eslint-plugin-jsx-a11y`** in the lint pipeline — would have caught half of §8.
28. **No tests** of any kind.
29. **Two SPA-fallback configs shipped** (`vercel.json` + `_redirects`) — pick one.
30. **Hard-coded literal phone `050-1234567`** in Contact JSX in addition to `siteContent.js`.
31. **`scroll-behavior: smooth`** does not respect `prefers-reduced-motion`.
32. **No analytics, no Sentry, no observability** of any kind.

### Legal-credibility risks (separate from §11.1–6)

33. **Same person as עו״ד and מגשרת without disclosing the ethical separation.** Israeli Bar rules on neutrality should be addressed in copy.
34. **Footer disclaimer is good but isolated** — the form should also state "Submitting this form does not create an attorney-client relationship".
35. **No data-processing notice** in the contact form aligned with חוק הגנת הפרטיות (informed consent at the point of collection, not just a link to a stub policy).

---

## 12. Opportunities for Improvement

(Per the brief, this section *describes* opportunities, it does not propose a redesign.)

### Architecture opportunities

- **Introduce a primitives layer** (`components/ui/`): `Button`, `Container`, `Section`, `Heading`, `Card`, `Input`, `Icon`, `Stack`. With one Button component and three variants the entire site collapses to a fraction of its current JSX volume.
- **Move icons into the data layer.** A `services` entry should include `icon: 'family'`, and a single `<Icon name="family"/>` component should resolve it. Same for the trust strip.
- **Switch to a meta-framework** (Next.js App Router, Astro, or Vite SSG) for SSR/prerender. Static-output is the natural fit — five sections of constant content. This eliminates the blank-page problem and unlocks proper LCP/SEO.
- **Replace `react-helmet-async`** with framework-native metadata APIs.
- **Add `eslint-plugin-jsx-a11y`** and `prettier`. Optional but valuable: TypeScript (the `@types/react` packages are already installed).
- **Add a content schema** (Zod or TypeScript) for `siteContent` so changes can't break shape.
- **Adopt a real CMS** (Sanity / Contentful / Payload / a flat-file headless CMS) so the practitioner can edit copy without touching code — currently the README correctly tells the owner to edit `siteContent.js`, but in practice that's a blocker.

### Trust & content opportunities

- A real **About** page with photograph, signed statement, license number, year admitted to the bar, mediator certification, professional memberships, list of degrees.
- A **testimonials** mechanism (text or short video), preferably verifiable (e.g., screenshots of Google reviews).
- An **anonymised case studies** section — what kind of disputes, what timeframe, what outcomes.
- An **articles / מאמרים** section as the primary SEO engine (articles like "מה ההבדל בין גישור גירושין למשפט גירושין" will rank).
- Per-service pages with deep content (1500–2500 words each) for SEO.
- A clear **fee structure** page or at minimum a "first 30 minutes free" promise.
- A real **office address with embedded map + hours**, or — if remote-only — an explicit "ייעוץ בזום ובטלפון מכל הארץ" message.

### Performance & SEO opportunities

- Self-host Assistant font as WOFF2 with `font-display: swap` and `<link rel="preload">`.
- Replace OG SVG with a proper 1200×630 PNG/JPEG.
- Add canonical tags, FAQ structured data, real `lastmod` in sitemap.
- Code-split `/privacy` and `/accessibility` with `React.lazy`.
- Add a 404 route.
- Throttle scroll handlers; consider `IntersectionObserver` for `useActiveSection`.

### Accessibility opportunities

- Skip-to-main link.
- Focus trap + restore for the mobile drawer.
- `aria-live="polite"` region for form status.
- Restore visible focus outlines (`focus-visible:` ring).
- Respect `prefers-reduced-motion` for smooth scrolling and the rotated trust card.
- Fix accent-on-white contrast (deepen gold to `#A16207` for body text uses).
- Audit with axe-core / Lighthouse and update the published statement to **reflect what's actually conformant**, not aspirations.

### Legal/UX opportunities

- Real form backend (Formspree, EmailJS, or a tiny serverless function). At minimum log to a real inbox before launch.
- Add a consent checkbox at the form ("אני מאשר/ת קבלת תשובה לפנייתי בהתאם למדיניות הפרטיות").
- Add explicit "Submitting this form does not create an attorney-client relationship" disclaimer.
- Replace the fake `+50` avatar pile or back it with real proof.
- Disambiguate the עו״ד / מגשרת dual role in copy.

### Visual & design-system opportunities

- Build a documented design system: tokens (typography scale, spacing scale, radii scale, shadow scale, motion scale), primitives, variants, states. Today there are ad-hoc choices at every call site.
- Introduce a meaningful visual differentiator between sections — currently they all look identical (centred header, soft pastel blob, grid below).
- Use real imagery (photo of Ester, photo of the office, photo of a handshake / abstract human imagery) to break the wallpaper.
- Establish a single border-radius rhythm and a single shadow scale.

---

**End of audit.** Ready as the foundation document for the 2027 redesign.
