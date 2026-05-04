import { lazy, Suspense, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const AccessibilityPanel = lazy(() => import('./AccessibilityPanel'));

function AccessibilityIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
            aria-hidden="true"
        >
            {/* Universal accessibility (person) */}
            <circle cx="12" cy="4.5" r="2" />
            <path d="M20 8.5a1 1 0 0 1-.7 1.27l-5.3 1.42v3.06l1.95 6.15a1 1 0 1 1-1.9.6L12 15.4l-2.05 5.6a1 1 0 1 1-1.9-.6L10 14.25v-3.06L4.7 9.77A1 1 0 1 1 5.3 7.83L12 9.6l6.7-1.77a1 1 0 0 1 1.3.67z" />
        </svg>
    );
}

export default function AccessibilityButton() {
    const { t } = useLanguage();
    const [open, setOpen] = useState(false);
    const [hasOpened, setHasOpened] = useState(false);

    const handleToggle = () => {
        setHasOpened(true);
        setOpen((v) => !v);
    };

    return (
        <>
            <button
                type="button"
                onClick={handleToggle}
                aria-label={open ? t.common.closeAccessibilityPanel : t.common.openAccessibilityPanel}
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-controls="a11y-panel-title"
                title={t.common.openAccessibilityPanel}
                className={[
                    'fixed bottom-24 md:bottom-6 left-5 sm:left-6 z-40',
                    'inline-flex h-12 w-12 items-center justify-center rounded-full',
                    'bg-accent text-white shadow-elevated ring-2 ring-white dark:ring-neutral-900',
                    'transition-all duration-300 ease-out',
                    'hover:-translate-y-0.5 hover:bg-accent-dark',
                    'focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40',
                ].join(' ')}
            >
                <AccessibilityIcon />
            </button>

            {hasOpened && (
                <Suspense fallback={null}>
                    <AccessibilityPanel open={open} onClose={() => setOpen(false)} />
                </Suspense>
            )}
        </>
    );
}
