const phoneNumber = "052-664-5959";
const phoneE164 = "972526645959";

export const brand = {
  slug: "ester-albalak",

  domain: "https://www.ester-albalak.co.il",

  he: {
    name: "אסתר",
    subtitle: "אלבלק",
    fullName: "אסתר אלבלק",
    tagline: "ליווי משפטי וגישור — שקט, מקצועי, אנושי",
    credentialLine: "עו״ד ומגשרת • דיני משפחה וגישור",
    address: "ישראל",
  },

  en: {
    name: "Ester",
    subtitle: "Albalak",
    fullName: "Ester Albalak",
    tagline: "Legal counsel and mediation — calm, professional, deeply human",
    credentialLine: "Attorney & Mediator • Family Law and Mediation",
    address: "Israel",
  },

  contact: {
    phoneDisplay: phoneNumber,
    phoneDisplayEn: "+972-52-664-5959",
    phoneLink: `tel:${phoneE164}`,
    email: "office@ester-albalak.co.il",
    whatsappNumber: phoneE164,
    whatsappLink: `https://wa.me/${phoneE164}`,
  },

  colors: {
    primary: "#0F172A",
    primaryLight: "#1E293B",
    secondary: "#F8FAFC",

    accent: "#CA8A04",
    accentHover: "#A16207",
    accentDark: "#92400E",

    brand50: "#F8FAFC",
    brand100: "#F1F5F9",
    brand200: "#E2E8F0",
    brand300: "#CBD5F5",
    brand400: "#94A3B8",
    brand500: "#64748B",
    brand600: "#475569",
    brand700: "#334155",
    brand800: "#1E293B",
    brand900: "#0F172A",
  },

  fonts: {
    he: "Assistant, system-ui, sans-serif",
    en: "Inter, system-ui, sans-serif",
  },
};

/* ===============================
   APPLY BRAND COLORS TO CSS ROOT
================================ */

export function applyBrandColors() {
  const root = document.documentElement;
  const c = brand.colors;

  root.style.setProperty("--color-primary", c.primary);
  root.style.setProperty("--color-primary-light", c.primaryLight);
  root.style.setProperty("--color-secondary", c.secondary);

  root.style.setProperty("--color-accent", c.accent);
  root.style.setProperty("--color-accent-hover", c.accentHover);
  root.style.setProperty("--color-accent-dark", c.accentDark);

  root.style.setProperty("--brand-50", c.brand50);
  root.style.setProperty("--brand-100", c.brand100);
  root.style.setProperty("--brand-200", c.brand200);
  root.style.setProperty("--brand-300", c.brand300);
  root.style.setProperty("--brand-400", c.brand400);
  root.style.setProperty("--brand-500", c.brand500);
  root.style.setProperty("--brand-600", c.brand600);
  root.style.setProperty("--brand-700", c.brand700);
  root.style.setProperty("--brand-800", c.brand800);
  root.style.setProperty("--brand-900", c.brand900);
}

/* ===============================
   STORAGE KEY (PER CLIENT)
================================ */

export function storageKey(key) {
  return `${brand.slug}:${key}`;
}

/* ===============================
   RESET CLIENT STORAGE
================================ */

export function resetClientStorage({ reload = false } = {}) {
  const prefix = `${brand.slug}:`;
  let removed = 0;

  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key && key.startsWith(prefix)) {
      localStorage.removeItem(key);
      removed++;
    }
  }

  const root = document.documentElement;

  root.classList.remove(
    "a11y-contrast",
    "a11y-grayscale",
    "a11y-highlight-links",
    "a11y-pause-animations",
  );

  root.style.removeProperty("--a11y-font-scale");

  if (reload) {
    location.reload();
  }

  return removed;
}

/* ===============================
   DEV TOOL (RESET)
================================ */

if (import.meta.env.DEV) {
  window.__brandReset = () => {
    const count = resetClientStorage();
    console.info(`[brand] cleared ${count} storage keys`);
  };
}
export default brand;
