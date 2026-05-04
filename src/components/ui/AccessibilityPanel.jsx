import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';

function MinusIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" aria-hidden="true">
            <path d="M5 12h14" />
        </svg>
    );
}

function PlusIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
        </svg>
    );
}

function Toggle({ id, label, active, isRTL, onChange }) {
    const switchClass = [
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ease-out',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2',
        active ? 'bg-accent' : 'bg-neutral-300 dark:bg-neutral-600',
    ].join(' ');

    const knobClass = [
        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-out',
        active
            ? (isRTL ? '-translate-x-5' : 'translate-x-5')
            : 'translate-x-0.5',
    ].join(' ');

    return (
        <li className="flex items-center justify-between gap-4 py-3">
            <label htmlFor={id} className="text-sm font-medium text-neutral-700 dark:text-neutral-200 cursor-pointer">
                {label}
            </label>
            <button
                id={id}
                type="button"
                role="switch"
                aria-checked={active}
                onClick={onChange}
                className={switchClass}
            >
                <span aria-hidden="true" className={knobClass} />
            </button>
        </li>
    );
}

export default function AccessibilityPanel({ open, onClose }) {
    const { t, isRTL } = useLanguage();
    const labels = t.a11y;
    const {
        settings,
        increaseText,
        decreaseText,
        toggle,
        reset,
        canIncrease,
        canDecrease,
    } = useAccessibility();

    const panelRef = useRef(null);
    const closeBtnRef = useRef(null);

    // Focus management + ESC to close
    useEffect(() => {
        if (!open) return;

        const previouslyFocused = document.activeElement;
        // Focus the close button so screen readers + keyboard users land in the dialog
        const focusTimer = window.setTimeout(() => {
            closeBtnRef.current?.focus();
        }, 0);

        const onKey = (e) => {
            if (e.key === 'Escape') {
                e.stopPropagation();
                onClose();
                return;
            }
            if (e.key === 'Tab' && panelRef.current) {
                const focusables = panelRef.current.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                if (!focusables.length) return;
                const first = focusables[0];
                const last = focusables[focusables.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        document.addEventListener('keydown', onKey);
        return () => {
            window.clearTimeout(focusTimer);
            document.removeEventListener('keydown', onKey);
            if (previouslyFocused instanceof HTMLElement) {
                previouslyFocused.focus();
            }
        };
    }, [open, onClose]);

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                aria-hidden="true"
                className={[
                    'fixed inset-0 z-50 bg-primary/30 backdrop-blur-[2px] transition-opacity duration-200',
                    open ? 'opacity-100' : 'opacity-0 pointer-events-none',
                ].join(' ')}
            />

            {/* Panel */}
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="a11y-panel-title"
                aria-hidden={!open}
                className={[
                    'fixed bottom-24 z-50 w-[min(92vw,22rem)] rounded-2xl bg-white dark:bg-neutral-800 shadow-elevated ring-1 ring-neutral-200 dark:ring-neutral-700',
                    'transition-all duration-200 ease-out',
                    'right-5 sm:right-6',
                    open
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 translate-y-3 pointer-events-none',
                ].join(' ')}
            >
                <header className="flex items-start justify-between gap-3 border-b border-neutral-100 dark:border-neutral-700 p-5">
                    <div>
                        <h2 id="a11y-panel-title" className="text-base font-bold text-primary dark:text-white">
                            {labels.title}
                        </h2>
                        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{labels.subtitle}</p>
                    </div>
                    <button
                        ref={closeBtnRef}
                        type="button"
                        onClick={onClose}
                        aria-label={labels.close}
                        className="-m-1 rounded-md p-1 text-neutral-400 dark:text-neutral-500 transition hover:text-primary dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                    >
                        <CloseIcon />
                    </button>
                </header>

                <div className="p-5">
                    {/* Text size */}
                    <div className="mb-4">
                        <p className="mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-200">{labels.textSize}</p>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={decreaseText}
                                disabled={!canDecrease}
                                aria-label={labels.decrease}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 transition hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-neutral-200 dark:disabled:hover:border-neutral-700 disabled:hover:text-neutral-600 dark:disabled:hover:text-neutral-300"
                            >
                                <MinusIcon />
                            </button>
                            <div
                                className="flex-1 text-center text-sm font-semibold tabular-nums text-primary dark:text-white"
                                aria-live="polite"
                                aria-label={`${labels.currentSize}: ${settings.fontScale}%`}
                            >
                                {settings.fontScale}%
                            </div>
                            <button
                                type="button"
                                onClick={increaseText}
                                disabled={!canIncrease}
                                aria-label={labels.increase}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 transition hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-neutral-200 dark:disabled:hover:border-neutral-700 disabled:hover:text-neutral-600 dark:disabled:hover:text-neutral-300"
                            >
                                <PlusIcon />
                            </button>
                        </div>
                    </div>

                    {/* Toggles */}
                    <ul className="divide-y divide-neutral-100 dark:divide-neutral-700">
                        <Toggle
                            id="a11y-contrast"
                            label={labels.contrast}
                            active={settings.contrast}
                            isRTL={isRTL}
                            onChange={() => toggle('contrast')}
                        />
                        <Toggle
                            id="a11y-grayscale"
                            label={labels.grayscale}
                            active={settings.grayscale}
                            isRTL={isRTL}
                            onChange={() => toggle('grayscale')}
                        />
                        <Toggle
                            id="a11y-highlight-links"
                            label={labels.highlightLinks}
                            active={settings.highlightLinks}
                            isRTL={isRTL}
                            onChange={() => toggle('highlightLinks')}
                        />
                        <Toggle
                            id="a11y-pause-animations"
                            label={labels.pauseAnimations}
                            active={settings.pauseAnimations}
                            isRTL={isRTL}
                            onChange={() => toggle('pauseAnimations')}
                        />
                    </ul>

                    <div className="mt-5 flex items-center justify-between gap-3">
                        <button
                            type="button"
                            onClick={reset}
                            className="text-xs font-medium text-neutral-500 dark:text-neutral-400 underline-offset-4 transition hover:text-primary dark:hover:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded"
                        >
                            {labels.reset}
                        </button>
                        <Link
                            to="/accessibility"
                            onClick={onClose}
                            className="text-xs font-medium text-accent underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded"
                        >
                            {labels.statementLink}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
