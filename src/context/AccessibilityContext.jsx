import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { storageKey } from '../config/brand';

const STORAGE_KEY = storageKey('a11y');

const DEFAULTS = {
    fontScale: 100,        // percent: 90..150
    contrast: false,       // high contrast
    grayscale: false,
    highlightLinks: false,
    pauseAnimations: false,
};

const FONT_MIN = 90;
const FONT_MAX = 150;
const FONT_STEP = 10;

function readInitial() {
    if (typeof window === 'undefined') return DEFAULTS;
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return DEFAULTS;
        const parsed = JSON.parse(raw);
        return { ...DEFAULTS, ...parsed };
    } catch {
        return DEFAULTS;
    }
}

const AccessibilityContext = createContext(null);

export function AccessibilityProvider({ children }) {
    const [settings, setSettings] = useState(readInitial);

    // Persist + apply to <html>
    useEffect(() => {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        } catch {
            /* ignore */
        }

        const root = document.documentElement;
        root.style.setProperty('--a11y-font-scale', `${settings.fontScale}%`);
        root.classList.toggle('a11y-contrast', settings.contrast);
        root.classList.toggle('a11y-grayscale', settings.grayscale);
        root.classList.toggle('a11y-highlight-links', settings.highlightLinks);
        root.classList.toggle('a11y-pause-animations', settings.pauseAnimations);
    }, [settings]);

    // Honor user OS-level reduced motion preference automatically (does not toggle our flag)
    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia) return;
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const apply = () => {
            document.documentElement.classList.toggle('a11y-reduced-motion', mq.matches);
        };
        apply();
        mq.addEventListener?.('change', apply);
        return () => mq.removeEventListener?.('change', apply);
    }, []);

    const increaseText = useCallback(() => {
        setSettings((s) => ({ ...s, fontScale: Math.min(FONT_MAX, s.fontScale + FONT_STEP) }));
    }, []);
    const decreaseText = useCallback(() => {
        setSettings((s) => ({ ...s, fontScale: Math.max(FONT_MIN, s.fontScale - FONT_STEP) }));
    }, []);
    const toggle = useCallback((key) => {
        setSettings((s) => ({ ...s, [key]: !s[key] }));
    }, []);
    const reset = useCallback(() => setSettings(DEFAULTS), []);

    const value = useMemo(() => ({
        settings,
        increaseText,
        decreaseText,
        toggle,
        reset,
        canIncrease: settings.fontScale < FONT_MAX,
        canDecrease: settings.fontScale > FONT_MIN,
    }), [settings, increaseText, decreaseText, toggle, reset]);

    return (
        <AccessibilityContext.Provider value={value}>
            {children}
        </AccessibilityContext.Provider>
    );
}

export function useAccessibility() {
    const ctx = useContext(AccessibilityContext);
    if (!ctx) {
        throw new Error('useAccessibility must be used inside <AccessibilityProvider>');
    }
    return ctx;
}
