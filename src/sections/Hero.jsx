import Section from '../components/layout/Section';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import { useLanguage } from '../context/LanguageContext';

function TrustItem({ icon, children }) {
    return (
        <li className="flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-300">
            <span aria-hidden="true" className="text-neutral-500 dark:text-neutral-400">
                {icon}
            </span>
            <span>{children}</span>
        </li>
    );
}

const ShieldCheckIcon = (
    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l8 3v5c0 4.5-3.2 8.5-8 10-4.8-1.5-8-5.5-8-10V6l8-3z" />
        <path d="M9 12l2 2 4-4" />
    </svg>
);

const LockIcon = (
    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
        <path d="M8 10.5V7a4 4 0 118 0v3.5" />
    </svg>
);

const SparkleIcon = (
    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4v4M12 16v4M4 12h4M16 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8" />
    </svg>
);

const TRUST_ICONS = [ShieldCheckIcon, LockIcon, SparkleIcon];

export default function Hero() {
    const { t, isRTL } = useLanguage();
    const { hero } = t;

    return (
        <Section
            id="hero"
            aria-labelledby="hero-title"
            spacing="none"
            background="none"
            container={false}
            className="overflow-hidden bg-gradient-to-b from-neutral-50 via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 pt-28 pb-20 lg:pt-36 lg:pb-28"
        >
            <div
                aria-hidden="true"
                className={`pointer-events-none absolute -top-32 ${isRTL ? '-right-32' : '-left-32'} h-[420px] w-[420px] rounded-full bg-accent/10 blur-3xl`}
            />
            <div
                aria-hidden="true"
                className={`pointer-events-none absolute -bottom-40 ${isRTL ? '-left-40' : '-right-40'} h-[480px] w-[480px] rounded-full bg-primary/5 blur-3xl`}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white/60 dark:to-neutral-950/60"
            />

            <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">

                    <Reveal className={`order-2 ${isRTL ? 'text-right' : 'text-left'} lg:order-1 lg:col-span-7`}>
                        <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white/70 dark:bg-neutral-800/70 px-4 py-1.5 text-xs font-semibold tracking-wide text-neutral-700 dark:text-neutral-200 shadow-sm backdrop-blur sm:text-sm">
                            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                            {hero.eyebrow}
                        </span>

                        <h1
                            id="hero-title"
                            className="mt-6 text-4xl font-bold leading-[1.15] tracking-tight text-primary dark:text-white sm:text-5xl lg:text-6xl"
                        >
                            {hero.title}
                            <br className="hidden sm:block" />{' '}
                            <span className="relative inline-block">
                                {hero.titleHighlight}
                                <span
                                    aria-hidden="true"
                                    className={`absolute -bottom-2 ${isRTL ? 'right-0' : 'left-0'} h-1.5 w-24 rounded-full bg-accent/70`}
                                />
                            </span>
                        </h1>

                        <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-300 lg:text-xl">
                            {hero.subtitle}
                        </p>

                        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                            <div className="flex flex-col">
                                <Button as="a" href="#contact" variant="primary" size="lg" className="w-full sm:w-auto">
                                    {hero.ctaPrimary}
                                </Button>
                                <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                                    {hero.ctaPrimaryNote}
                                </p>
                            </div>
                            <Button as="a" href="#process" variant="ghost" size="lg" className="w-full sm:w-auto">
                                {hero.ctaSecondary}
                            </Button>
                        </div>

                        <ul
                            aria-label={hero.trustItemsLabel}
                            className="mt-8 flex flex-col gap-2.5 border-t border-neutral-200/70 dark:border-neutral-700/70 pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2"
                        >
                            {hero.trustItems.map((item, i) => (
                                <TrustItem key={item} icon={TRUST_ICONS[i]}>{item}</TrustItem>
                            ))}
                        </ul>
                    </Reveal>

                    <Reveal delay={150} className="order-1 lg:order-2 lg:col-span-5">
                        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
                            <div
                                aria-hidden="true"
                                className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-accent/25 via-accent/5 to-transparent blur-2xl"
                            />
                            <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-neutral-100 dark:bg-neutral-800 shadow-elevated ring-1 ring-neutral-200/70 dark:ring-neutral-700/70 transition-transform duration-700 ease-out hover:-translate-y-1">
                                <img
                                    src="/logoA.png"
                                    alt="תמונת פרופיל - אסתר אלבלק"
                                    className="h-full w-full object-contain p-6 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
                                    loading="eager"
                                    fetchpriority="high"
                                />
                            </div>
                        </div>
                    </Reveal>

                </div>
            </div>
        </Section>
    );
}
