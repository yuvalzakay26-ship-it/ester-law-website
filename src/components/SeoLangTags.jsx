import { Helmet } from 'react-helmet-async';
import { LANG_META, SUPPORTED_LANGS } from '../i18n';
import { useLanguage } from '../context/LanguageContext';

function buildUrl(domain, path, lang) {
    const base = `${domain}${path || ''}`.replace(/\/+$/, '') || domain;
    const sep = base.includes('?') ? '&' : '?';
    return lang ? `${base}${sep}lang=${lang}` : base;
}

export default function SeoLangTags({ domain, path = '/' }) {
    const { lang } = useLanguage();
    const meta = LANG_META[lang];
    const canonical = buildUrl(domain, path, lang);

    return (
        <Helmet>
            <html lang={meta.htmlLang} dir={meta.dir} />
            <link rel="canonical" href={canonical} />
            {SUPPORTED_LANGS.map((l) => (
                <link
                    key={l}
                    rel="alternate"
                    hrefLang={LANG_META[l].htmlLang}
                    href={buildUrl(domain, path, l)}
                />
            ))}
            <link rel="alternate" hrefLang="x-default" href={buildUrl(domain, path)} />
        </Helmet>
    );
}
