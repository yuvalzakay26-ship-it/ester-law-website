import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { translations, DEFAULT_LANG, SUPPORTED_LANGS, LANG_META } from '../i18n';
import { storageKey } from '../config/brand';

const STORAGE_KEY = storageKey('lang');
const URL_PARAM = 'lang';

function readUrlLang() {
    if (typeof window === 'undefined') return null;
    try {
        const params = new URLSearchParams(window.location.search);
        const value = params.get(URL_PARAM);
        return value && SUPPORTED_LANGS.includes(value) ? value : null;
    } catch {
        return null;
    }
}

function readStoredLang() {
    if (typeof window === 'undefined') return null;
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        return stored && SUPPORTED_LANGS.includes(stored) ? stored : null;
    } catch {
        return null;
    }
}

function detectBrowserLang() {
    if (typeof navigator === 'undefined') return DEFAULT_LANG;
    const candidates = [navigator.language, ...(navigator.languages || [])].filter(Boolean);
    for (const c of candidates) {
        if (typeof c === 'string' && c.toLowerCase().startsWith('en')) return 'en';
    }
    return 'he';
}

function readInitialLang() {
    return readUrlLang() ?? readStoredLang() ?? detectBrowserLang();
}

function writeUrlLang(next) {
    if (typeof window === 'undefined') return;
    try {
        const url = new URL(window.location.href);
        url.searchParams.set(URL_PARAM, next);
        window.history.replaceState(window.history.state, '', url.toString());
    } catch {
        /* ignore */
    }
}

function persistLang(next) {
    try {
        window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
        /* ignore storage errors */
    }
    writeUrlLang(next);
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
    const [lang, setLangState] = useState(readInitialLang);

    const setLang = useCallback((next) => {
        if (!SUPPORTED_LANGS.includes(next)) return;
        setLangState(next);
        persistLang(next);
    }, []);

    const toggle = useCallback(() => {
        setLangState((prev) => {
            const next = prev === 'he' ? 'en' : 'he';
            persistLang(next);
            return next;
        });
    }, []);

    // Ensure URL reflects the resolved language on first load (e.g. from localStorage / nav.language).
    useEffect(() => {
        if (readUrlLang() !== lang) writeUrlLang(lang);
        // run once after mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Sync <html lang> + dir whenever language changes
    useEffect(() => {
        const meta = LANG_META[lang] ?? LANG_META[DEFAULT_LANG];
        document.documentElement.lang = meta.htmlLang;
        document.documentElement.dir = meta.dir;
    }, [lang]);

    // React to back/forward navigation that changes the lang param.
    useEffect(() => {
        const onPop = () => {
            const fromUrl = readUrlLang();
            if (fromUrl && fromUrl !== lang) setLangState(fromUrl);
        };
        window.addEventListener('popstate', onPop);
        return () => window.removeEventListener('popstate', onPop);
    }, [lang]);

    const value = useMemo(() => {
        const t = translations[lang] ?? translations[DEFAULT_LANG];
        const meta = LANG_META[lang] ?? LANG_META[DEFAULT_LANG];
        return {
            lang,
            t,
            dir: meta.dir,
            isRTL: meta.dir === 'rtl',
            setLang,
            toggle,
        };
    }, [lang, setLang, toggle]);

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) {
        throw new Error('useLanguage must be used inside <LanguageProvider>');
    }
    return ctx;
}
