// ─────────────────────────────────────────────────────────────────────────────
// Contact-form submission handler.
//
// The form in src/sections/ContactSection.jsx awaits this function and shows
// the success state when it resolves. Replace the body with a real backend
// call (Formspree, EmailJS, your own /api endpoint, etc.) when ready.
//
// Two ready-made modes:
//   1. 'log'    → console.log the payload (default; placeholder for API).
//   2. 'mailto' → open the user's mail client with the message prefilled.
//
// Switch by changing CONTACT_MODE below, or call the named exports directly.
// ─────────────────────────────────────────────────────────────────────────────

import brand from '../config/brand';

const CONTACT_MODE = 'mailto'; // 'log' | 'mailto'

// Tiny normalization so downstream backends get clean values.
function normalize(payload) {
    return {
        name: (payload.name || '').trim(),
        phone: (payload.phone || '').trim(),
        email: (payload.email || '').trim(),
        message: (payload.message || '').trim(),
        submittedAt: new Date().toISOString(),
        source: brand.domain,
    };
}

export async function submitContactByLog(payload) {
    const data = normalize(payload);
    // Replace this block with your real API call, e.g.:
    //   const res = await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data),
    //   });
    //   if (!res.ok) throw new Error(`Contact API failed: ${res.status}`);
    //   return res.json();
    console.info('[contact] form submission (placeholder):', data);
    return { ok: true, mode: 'log', data };
}

export function submitContactByMailto(payload) {
    const data = normalize(payload);
    const subject = `New inquiry from ${data.name || 'the website'}`;
    const lines = [
        `Name: ${data.name}`,
        `Phone: ${data.phone}`,
        data.email ? `Email: ${data.email}` : null,
        '',
        data.message || '(no message)',
    ].filter(Boolean);
    const body = lines.join('\n');
    const href = `mailto:${brand.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (typeof window !== 'undefined') window.location.href = href;
    return Promise.resolve({ ok: true, mode: 'mailto', data });
}

export default async function submitContact(payload) {
    if (CONTACT_MODE === 'mailto') return submitContactByMailto(payload);
    return submitContactByLog(payload);
}
