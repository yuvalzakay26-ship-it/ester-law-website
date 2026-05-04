import he from './he';
import en from './en';

export const translations = { he, en };

export const SUPPORTED_LANGS = ['he', 'en'];
export const DEFAULT_LANG = 'he';

export const LANG_META = {
    he: { dir: 'rtl', htmlLang: 'he', label: 'עברית' },
    en: { dir: 'ltr', htmlLang: 'en', label: 'English' },
};

export { he, en };
