import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import SeoLangTags from '../components/SeoLangTags';

export default function AccessibilityPage() {
    const { t } = useLanguage();
    const { accessibility } = t.legal;
    const { seo, brand, footer } = t;
    const pageSeo = seo.pages.accessibility;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-32 pb-20 bg-secondary min-h-screen">
            <SeoLangTags domain={brand.domain} path="/accessibility" />
            <Helmet>
                <title>{pageSeo.title}</title>
                <meta name="description" content={pageSeo.description} />
                <meta property="og:title" content={pageSeo.title} />
                <meta property="og:description" content={pageSeo.description} />
                <meta property="og:url" content={`${brand.domain}/accessibility`} />
                <meta property="og:type" content="article" />
            </Helmet>

            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="text-4xl font-bold text-primary mb-3">{accessibility.title}</h1>
                {accessibility.lastUpdated && (
                    <p className="text-sm text-neutral-500 mb-12">{accessibility.lastUpdated}</p>
                )}

                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm space-y-8">

                    {accessibility.intro && (
                        <p className="text-lg text-primary font-medium leading-relaxed">
                            {accessibility.intro}
                        </p>
                    )}

                    {footer?.compliance && (
                        <p className="rounded-lg bg-accent/10 px-4 py-3 text-sm font-medium text-primary">
                            {footer.compliance}
                        </p>
                    )}

                    {accessibility.sections?.map((section, index) => (
                        <div key={index}>
                            <h2 className="text-xl font-bold text-primary mb-3">{section.heading}</h2>
                            {section.content && (
                                <p className="text-neutral-600 leading-relaxed">
                                    {section.content}
                                </p>
                            )}
                            {section.items && (
                                <ul className="list-disc list-inside space-y-2 text-neutral-600 mt-3">
                                    {section.items.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}

                    <div className="border-t border-neutral-100 pt-8">
                        <h2 className="text-xl font-bold text-primary mb-4">{accessibility.contactHeading}</h2>
                        <p className="text-neutral-600 mb-4">{accessibility.contact.intro}</p>
                        <div className="space-y-2 text-neutral-700">
                            {accessibility.contact.rolePrefix && (
                                <p>
                                    <span className="font-bold">{accessibility.contact.rolePrefix}</span>{' '}
                                    {accessibility.contact.roleName}
                                </p>
                            )}
                            <p>
                                <span className="font-bold">{accessibility.contact.phonePrefix}</span>{' '}
                                <a href={`tel:${brand.phone.replace(/[^\d+]/g, '')}`} className="hover:text-accent transition-colors">
                                    {brand.phone}
                                </a>
                            </p>
                            <p>
                                <span className="font-bold">{accessibility.contact.emailPrefix}</span>{' '}
                                <a href={`mailto:${brand.email}`} className="hover:text-accent transition-colors">
                                    {brand.email}
                                </a>
                            </p>
                        </div>
                        {accessibility.contact.responseNote && (
                            <p className="text-sm text-neutral-500 mt-4 italic">
                                {accessibility.contact.responseNote}
                            </p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
