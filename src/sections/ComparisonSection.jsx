import Section from '../components/layout/Section';
import Reveal from '../components/ui/Reveal';
import { useLanguage } from '../context/LanguageContext';

export default function ComparisonSection() {
    const { t, isRTL } = useLanguage();
    const { comparison } = t;
    const { eyebrow, title, subtitle, recommended, alternative, rows, footnote, decisionNudge } = comparison;

    return (
        <Section
            id="comparison"
            aria-labelledby="comparison-title"
            spacing="lg"
            background="none"
            className="overflow-hidden bg-gradient-to-b from-white via-neutral-50/60 to-white dark:from-neutral-900 dark:via-neutral-950/60 dark:to-neutral-900"
        >
            <div
                aria-hidden="true"
                className={`pointer-events-none absolute -top-24 ${isRTL ? 'right-[-8%]' : 'left-[-8%]'} h-[420px] w-[420px] rounded-full bg-accent/[0.06] blur-3xl`}
            />
            <div
                aria-hidden="true"
                className={`pointer-events-none absolute bottom-[-15%] ${isRTL ? 'left-[-10%]' : 'right-[-10%]'} h-[380px] w-[380px] rounded-full bg-primary/[0.04] blur-3xl`}
            />

            <Reveal className="relative mx-auto max-w-2xl text-center">
                <h2
                    id="comparison-title"
                    className="text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.2]"
                >
                    {eyebrow}
                    <span className="mt-3 block text-accent">{title}</span>
                </h2>
                <p className="mt-6 text-base leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-lg sm:leading-[1.7]">
                    {subtitle}
                </p>
            </Reveal>

            <div className="relative mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 md:mt-20 md:grid-cols-2 md:gap-8">
                <Reveal delay={150} className="order-1">
                    <article className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-accent/[0.07] via-white to-accent/[0.03] dark:from-accent/[0.12] dark:via-neutral-800 dark:to-accent/[0.05] p-7 shadow-card ring-1 ring-accent/30 sm:p-9">
                        <div
                            aria-hidden="true"
                            className={`pointer-events-none absolute -top-16 ${isRTL ? '-right-16' : '-left-16'} h-40 w-40 rounded-full bg-accent/10 blur-2xl`}
                        />

                        <header className="relative mb-7 flex items-end justify-between border-b border-accent/15 pb-5">
                            <h3 className="text-2xl font-bold tracking-tight text-primary dark:text-white sm:text-[1.625rem]">
                                {recommended.label}
                            </h3>
                            <span className="text-[0.7rem] font-semibold tracking-[0.2em] text-accent">
                                {recommended.tag}
                            </span>
                        </header>

                        <ul className="relative flex flex-col">
                            {rows.map((row, i) => (
                                <li
                                    key={row.topic}
                                    className={`flex min-h-[3.75rem] items-center justify-between gap-4 py-4 ${i !== rows.length - 1 ? 'border-b border-accent/10' : ''}`}
                                >
                                    <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 sm:text-[0.95rem]">
                                        {row.topic}
                                    </span>
                                    <span className={`${isRTL ? 'text-right' : 'text-left'} text-base font-semibold text-primary dark:text-white sm:text-lg`}>
                                        {row.recommended}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </article>
                </Reveal>

                <Reveal delay={300} className="order-2">
                    <article className="relative h-full overflow-hidden rounded-3xl bg-white dark:bg-neutral-800 p-7 shadow-card ring-1 ring-neutral-200 dark:ring-neutral-700 sm:p-9">
                        <header className="relative mb-7 flex items-end justify-between border-b border-neutral-200 dark:border-neutral-700 pb-5">
                            <h3 className="text-2xl font-bold tracking-tight text-neutral-700 dark:text-neutral-200 sm:text-[1.625rem]">
                                {alternative.label}
                            </h3>
                            <span className="text-[0.7rem] font-semibold tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
                                {alternative.tag}
                            </span>
                        </header>

                        <ul className="relative flex flex-col">
                            {rows.map((row, i) => (
                                <li
                                    key={row.topic}
                                    className={`flex min-h-[3.75rem] items-center justify-between gap-4 py-4 ${i !== rows.length - 1 ? 'border-b border-neutral-100 dark:border-neutral-700' : ''}`}
                                >
                                    <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 sm:text-[0.95rem]">
                                        {row.topic}
                                    </span>
                                    <span className={`${isRTL ? 'text-right' : 'text-left'} text-base font-medium text-neutral-700 dark:text-neutral-200 sm:text-lg`}>
                                        {row.alternative}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </article>
                </Reveal>
            </div>

            <Reveal delay={500} className="relative mx-auto mt-12 max-w-xl text-center md:mt-14">
                <p className="text-base leading-relaxed text-neutral-500 dark:text-neutral-400">
                    {footnote}
                </p>
                <p className="mt-8 text-base font-medium leading-loose text-neutral-700 dark:text-neutral-300 sm:text-lg">
                    <span className="text-neutral-800 dark:text-neutral-200">{decisionNudge.lead}</span>
                    {decisionNudge.before}
                    <span className="font-semibold text-primary dark:text-white">
                        {decisionNudge.highlight}
                    </span>
                    {decisionNudge.after}
                </p>
            </Reveal>
        </Section>
    );
}
