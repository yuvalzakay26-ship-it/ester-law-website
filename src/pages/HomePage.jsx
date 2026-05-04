import { Helmet } from 'react-helmet-async';
import SeoLangTags from '../components/SeoLangTags';
import Hero from '../sections/Hero';
import AuthorityStrip from '../sections/AuthorityStrip';
import Services from '../sections/Services';
import FitSection from '../sections/FitSection';
import ComparisonSection from '../sections/ComparisonSection';
import Process from '../sections/Process';
import MiniAbout from '../sections/MiniAbout';
import Testimonials from '../sections/Testimonials';
import FAQ from '../sections/FAQ';
import ContactSection from '../sections/ContactSection';
import { useLanguage } from '../context/LanguageContext';

export default function HomePage() {
    const { t } = useLanguage();
    const { seo, brand } = t;
    const { home } = seo.pages;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LegalService",
        "name": brand.name,
        "image": `${brand.domain}${seo.ogImage}`,
        "description": home.description,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Tel Aviv",
            "addressCountry": "IL"
        },
        "telephone": brand.phone,
        "email": brand.email,
        "url": brand.domain,
        "priceRange": "$$"
    };

    return (
        <>
            <SeoLangTags domain={brand.domain} path="/" />
            <Helmet>
                <title>{home.title}</title>
                <meta name="description" content={home.description} />

                <meta property="og:title" content={home.title} />
                <meta property="og:description" content={home.description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={brand.domain} />
                <meta property="og:image" content={`${brand.domain}${seo.ogImage}`} />
                <meta property="og:locale" content={seo.locale} />
                <meta property="og:site_name" content={seo.siteName} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={home.title} />
                <meta name="twitter:description" content={home.description} />
                <meta name="twitter:image" content={`${brand.domain}${seo.ogImage}`} />

                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            </Helmet>

            <Hero />
            <AuthorityStrip />
            <Services />
            <FitSection />
            <ComparisonSection />
            <Process />
            <MiniAbout />
            <Testimonials />
            <FAQ />
            <ContactSection />
        </>
    );
}
