import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import SeoLangTags from '../components/SeoLangTags';

export default function PrivacyPage() {
    const { t } = useLanguage();
    const { privacy } = t.legal;
    const { seo, brand } = t;
    const pageSeo = seo.pages.privacy;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-32 pb-20 bg-secondary dark:bg-neutral-950 min-h-screen transition-colors duration-300">
            <SeoLangTags domain={brand.domain} path="/privacy" />
            <Helmet>
                <title>{pageSeo.title}</title>
                <meta name="description" content={pageSeo.description} />
                <meta property="og:title" content={pageSeo.title} />
                <meta property="og:description" content={pageSeo.description} />
                <meta property="og:url" content={`${brand.domain}/privacy`} />
                <meta property="og:type" content="article" />
            </Helmet>

            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="text-4xl font-bold text-primary dark:text-white mb-3">{privacy.title}</h1>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-12">{privacy.lastUpdated}</p>

                <div className="bg-white dark:bg-neutral-800 p-8 md:p-12 rounded-2xl shadow-sm space-y-8">
                    {privacy.sections.map((section, index) => (
                        <div key={index}>
                            <h2 className="text-xl font-bold text-primary dark:text-white mb-3">{section.heading}</h2>
                            {section.content && (
                                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                    {section.content}
                                </p>
                            )}
                            {section.items && (
                                <ul className="list-disc list-inside space-y-2 text-neutral-600 dark:text-neutral-300 mt-3">
                                    {section.items.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}

                    {privacy.contact && (
                        <div className="border-t border-neutral-100 dark:border-neutral-700 pt-8">
                            <h2 className="text-xl font-bold text-primary dark:text-white mb-4">{privacy.contact.heading}</h2>
                            <p className="text-neutral-600 dark:text-neutral-300 mb-4">{privacy.contact.intro}</p>
                            <div className="space-y-2 text-neutral-700 dark:text-neutral-200">
                                <p>
                                    <span className="font-bold">{privacy.contact.businessPrefix}</span> {brand.fullName}
                                </p>
                                <p>
                                    <span className="font-bold">{privacy.contact.phonePrefix}</span>{' '}
                                    <a href={`tel:${brand.phone.replace(/[^\d+]/g, '')}`} className="hover:text-accent transition-colors">
                                        {brand.phone}
                                    </a>
                                </p>
                                <p>
                                    <span className="font-bold">{privacy.contact.emailPrefix}</span>{' '}
                                    <a href={`mailto:${brand.email}`} className="hover:text-accent transition-colors">
                                        {brand.email}
                                    </a>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
