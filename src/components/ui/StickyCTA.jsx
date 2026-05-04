import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const SHOW_THRESHOLD = 480;

export default function StickyCTA() {
    const { t } = useLanguage();
    const { stickyCta } = t;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const past = window.scrollY > SHOW_THRESHOLD;
            const contact = document.getElementById('contact');
            const nearContact =
                contact &&
                contact.getBoundingClientRect().top < window.innerHeight - 80;
            setVisible(past && !nearContact);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        const el = document.getElementById('contact');
        if (!el) return;
        const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    };

    return (
        <div
            aria-hidden={!visible}
            className={[
                'fixed inset-x-0 bottom-0 z-40 md:hidden',
                'pointer-events-none',
                'transition-all duration-300 ease-out',
                visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0',
            ].join(' ')}
            style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 0px)' }}
        >
            <div className="pointer-events-auto bg-gradient-to-t from-white via-white/95 to-white/70 px-4 pt-3 pb-4 shadow-[0_-8px_24px_-12px_rgba(15,23,42,0.18)] ring-1 ring-neutral-200/80 backdrop-blur">
                <a
                    href="#contact"
                    onClick={handleClick}
                    aria-label={stickyCta.ariaLabel}
                    tabIndex={visible ? 0 : -1}
                    className={[
                        'inline-flex w-full items-center justify-center gap-2 rounded-xl',
                        'bg-accent px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-accent/20',
                        'transition-all hover:bg-accent-dark active:scale-[0.99]',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2',
                    ].join(' ')}
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{stickyCta.label}</span>
                </a>
            </div>
        </div>
    );
}
