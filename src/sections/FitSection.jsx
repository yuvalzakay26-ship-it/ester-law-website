import Section from '../components/layout/Section';
import Reveal from '../components/ui/Reveal';
import { useLanguage } from '../context/LanguageContext';

const CheckIcon = (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 13l4 4L19 7" />
    </svg>
);

const MinusIcon = (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 12h12" />
    </svg>
);

export default function FitSection() {
    const { t, isRTL } = useLanguage();
    const { fit } = t;

    return (
        <Section
            id="fit"
            aria-labelledby="fit-title"
            spacing="lg"
            background="none"
            className="overflow-hidden bg-gradient-to-b from-white via-neutral-50/60 to-white dark:from-neutral-900 dark:via-neutral-950/60 dark:to-neutral-900"
        >
            <div
                aria-hidden="true"
                className={`pointer-events-none absolute -top-24 ${isRTL ? 'right-[-8%]' : 'left-[-8%]'} h-[380px] w-[380px] rounded-full bg-accent/[0.06] blur-3xl`}
            />

            <Reveal className="relative mx-auto max-w-2xl text-center">
                <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                    {fit.eyebrow}
                </span>
                <h2
                    id="fit-title"
                    className="mt-4 text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl lg:text-[2.5rem] lg:leading-[1.2]"
                >
                    {fit.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-lg sm:leading-[1.7]">
                    {fit.subtitle}
                </p>
            </Reveal>

            <div className="relative mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
                <Reveal delay={150}>
                    <article className="relative h-full overflow-hidden rounded-2xl bg-white dark:bg-neutral-800 p-7 shadow-card ring-1 ring-accent/20 sm:p-8">
                        <span
                            aria-hidden="true"
                            className={`absolute top-0 ${isRTL ? 'right-0' : 'left-0'} h-1 w-20 rounded-b-full bg-accent/70`}
                        />
                        <h3 className="text-lg font-bold text-primary dark:text-white sm:text-xl">
                            {fit.positiveTitle}
                        </h3>
                        <ul className="mt-6 space-y-4">
                            {fit.positives.map((line, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent ring-1 ring-accent/20">
                                        {CheckIcon}
                                    </span>
                                    <span className="text-base leading-relaxed text-neutral-700 dark:text-neutral-200">
                                        {line}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </article>
                </Reveal>

                <Reveal delay={250}>
                    <article className="relative h-full overflow-hidden rounded-2xl bg-white dark:bg-neutral-800 p-7 shadow-card ring-1 ring-neutral-200/80 dark:ring-neutral-700/80 sm:p-8">
                        <span
                            aria-hidden="true"
                            className={`absolute top-0 ${isRTL ? 'right-0' : 'left-0'} h-1 w-20 rounded-b-full bg-neutral-300 dark:bg-neutral-600`}
                        />
                        <h3 className="text-lg font-bold text-primary dark:text-white sm:text-xl">
                            {fit.negativeTitle}
                        </h3>
                        <ul className="mt-6 space-y-4">
                            {fit.negatives.map((line, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-300 ring-1 ring-neutral-200 dark:ring-neutral-600">
                                        {MinusIcon}
                                    </span>
                                    <span className="text-base leading-relaxed text-neutral-700 dark:text-neutral-200">
                                        {line}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </article>
                </Reveal>
            </div>

            <Reveal delay={400} className="relative mx-auto mt-12 max-w-2xl text-center">
                <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400 sm:text-base">
                    {fit.footnote}
                </p>
            </Reveal>
        </Section>
    );
}
