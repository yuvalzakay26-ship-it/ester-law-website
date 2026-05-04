import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const SHOW_THRESHOLD = 300;

export default function ScrollToTopButton() {
    const { t } = useLanguage();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > SHOW_THRESHOLD);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleClick = () => {
        const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            aria-label={t.common.scrollToTop}
            title={t.common.scrollToTop}
            tabIndex={visible ? 0 : -1}
            aria-hidden={!visible}
            className={[
                'fixed bottom-24 md:bottom-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full',
                'bg-white text-primary shadow-elevated ring-1 ring-neutral-200/80',
                'transition-all duration-300 ease-out',
                'hover:-translate-y-0.5 hover:text-accent hover:ring-accent/40',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2',
                'right-5 sm:right-6',
                visible
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-3 pointer-events-none',
            ].join(' ')}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
            >
                <path d="M12 19V5" />
                <path d="M5 12l7-7 7 7" />
            </svg>
        </button>
    );
}
