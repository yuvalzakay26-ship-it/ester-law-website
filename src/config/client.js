// ─────────────────────────────────────────────────────────────────────────────
// Client configuration — top-level switch for who this site is for.
//
// Most rebrands need only `brand.js`. This file aggregates brand identity with
// runtime/feature flags (default language, supported languages, toggles for
// optional features) so a new client can be onboarded by editing two files at
// most: `brand.js` and this one.
// ─────────────────────────────────────────────────────────────────────────────

import brand, { applyBrandColors, resetClientStorage, storageKey } from './brand';

export const client = {
    // Brand identity (name, contact, palette, fonts).
    brand,

    // Internationalization defaults. Must align with src/i18n/index.js.
    i18n: {
        defaultLang: 'he',
        supportedLangs: ['he', 'en'],
    },

    // Feature flags — flip these per-client without touching components.
    features: {
        languageToggle: true,        // show HE/EN switcher in the navbar
        accessibilityPanel: true,    // show the a11y floating button + panel
        stickyCta: true,             // mobile sticky "book a call" CTA
        scrollToTop: true,           // scroll-to-top button
    },

    // Persistence helper (re-exported for ergonomics).
    storageKey,

    // Apply brand colors to :root (call once at boot from main.jsx).
    applyBrandColors,

    // Demo reset — wipe every localStorage key under brand.slug.
    resetClientStorage,
};

export { brand, applyBrandColors, resetClientStorage, storageKey };
export default client;
