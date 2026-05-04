import Reveal from '../components/ui/Reveal';
import { useLanguage } from '../context/LanguageContext';

const AwardIcon = (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="9" r="5.5" />
        <path d="M8.5 13.5L7 21l5-3 5 3-1.5-7.5" />
    </svg>
);

const FilesIcon = (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 4h7l4 4v10a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
        <path d="M16 4v4h4" />
        <path d="M5 8v12a2 2 0 0 0 2 2h8" opacity="0.55" />
    </svg>
);

const SealIcon = (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3l8 3v5c0 4.6-3.3 8.6-8 10-4.7-1.4-8-5.4-8-10V6l8-3z" />
        <path d="M9 12l2.2 2.2L15.5 10" />
    </svg>
);

const AUTHORITY_ICONS = [AwardIcon, FilesIcon, SealIcon];

export default function AuthorityStrip() {
    const { t } = useLanguage();
    const { authority } = t;

    return (
        <section
            aria-label={authority.label}
            className="relative -mt-2 border-y border-neutral-200/70 dark:border-neutral-700/70 bg-white/80 dark:bg-neutral-900/80 backdrop-blur transition-colors duration-300"
        >
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <ul className="grid grid-cols-1 divide-y divide-neutral-200/70 dark:divide-neutral-700/70 sm:grid-cols-3 sm:divide-y-0 sm:divide-x sm:divide-x-reverse">
                    {authority.items.map((item, i) => {
                        const Icon = AUTHORITY_ICONS[i];
                        return (
                            <Reveal
                                as="li"
                                key={item.title}
                                delay={120 + i * 120}
                                className="flex items-center gap-4 px-2 py-5 sm:justify-center sm:px-6 sm:py-7"
                            >
                                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent ring-1 ring-accent/15">
                                    {Icon}
                                </span>
                                <span className="flex flex-col">
                                    <span className="text-sm font-bold text-primary dark:text-white sm:text-base">
                                        {item.title}
                                    </span>
                                    <span className="text-xs text-neutral-500 dark:text-neutral-400 sm:text-sm">
                                        {item.subtitle}
                                    </span>
                                </span>
                            </Reveal>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
