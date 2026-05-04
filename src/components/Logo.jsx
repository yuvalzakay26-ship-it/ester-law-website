import { useLanguage } from '../context/LanguageContext';

export default function Logo({ variant = 'dark', className = '' }) {
    // variant 'dark' = for light backgrounds (Navy text)
    // variant 'light' = for dark backgrounds (White text)
    const { t } = useLanguage();
    const { name, subtitle, credentialLine } = t.brand;

    const textClasses = variant === 'light'
        ? 'text-secondary'
        : 'text-primary dark:text-white';
    const subTextClasses = variant === 'light'
        ? 'text-brand-200/80'
        : 'text-brand-500 dark:text-neutral-400';

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-white/90 dark:bg-neutral-800 p-1.5 shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-700">
                <img
                    src="/logoA.png"
                    alt="קלבלא רתסא - עורכת דין ומגשרת"
                    width="44"
                    height="44"
                    className="h-full w-full object-contain"
                />
            </div>

            <div className="flex min-w-0 flex-col justify-center max-w-[140px] sm:max-w-[180px] lg:max-w-[260px]">
                <span className={`text-xl font-bold leading-none tracking-wide truncate ${textClasses}`}>
                    {name}<span className="text-accent">.</span>{subtitle}
                </span>
                {credentialLine && (
                    <span className={`text-xs font-medium tracking-wider mt-0.5 line-clamp-2 ${subTextClasses}`}>
                        {credentialLine}
                    </span>
                )}
            </div>
        </div>
    );
}
