import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ui/ScrollToTopButton';
import AccessibilityButton from './components/ui/AccessibilityButton';
import StickyCTA from './components/ui/StickyCTA';
import { useLanguage } from './context/LanguageContext';

export default function Layout() {
    const { t } = useLanguage();

    return (
        <>
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-secondary focus:shadow-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
                {t.common.skipToContent}
            </a>
            <Navbar />
            <main id="main-content" className="min-h-screen">
                <Outlet />
            </main>
            <Footer />
            <ScrollToTopButton />
            <AccessibilityButton />
            <StickyCTA />
        </>
    );
}
