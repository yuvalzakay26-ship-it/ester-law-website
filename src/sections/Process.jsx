import Section from '../components/layout/Section';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import { useLanguage } from '../context/LanguageContext';

export default function Process() {
    const { t, isRTL } = useLanguage();
    const { process } = t;

    const scrollToContact = (e) => {
        e.preventDefault();
        const element = document.getElementById('contact');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <Section
            id="process"
            aria-labelledby="process-title"
            spacing="lg"
            background="none"
            className="overflow-hidden bg-gradient-to-b from-neutral-50 via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950"
        >
            <div
                aria-hidden="true"
                className={`pointer-events-none absolute -top-32 ${isRTL ? 'right-[-8%]' : 'left-[-8%]'} h-[420px] w-[420px] rounded-full bg-accent/[0.07] blur-3xl`}
            />
            <div
                aria-hidden="true"
                className={`pointer-events-none absolute bottom-[-15%] ${isRTL ? 'left-[-8%]' : 'right-[-8%]'} h-[460px] w-[460px] rounded-full bg-primary/[0.04] blur-3xl`}
            />

            <Reveal className="relative mx-auto max-w-2xl text-center">
                <h2
                    id="process-title"
                    className="text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
                >
                    {process.title}
                </h2>
                <p className="mt-6 text-base leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-lg sm:leading-[1.7]">
                    {process.subtitle}
                </p>
            </Reveal>

            <ol className="relative mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-12 md:mt-24 md:grid-cols-3 md:gap-8">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-9 right-[14%] left-[14%] hidden h-px bg-gradient-to-l from-neutral-200 via-accent/40 to-neutral-200 dark:from-neutral-700 dark:to-neutral-700 md:block"
                />

                <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute top-9 bottom-9 ${isRTL ? 'right-9' : 'left-9'} w-px bg-gradient-to-b from-neutral-200 via-accent/40 to-neutral-200 dark:from-neutral-700 dark:to-neutral-700 md:hidden`}
                />

                {process.steps.map((step, i) => (
                    <Reveal
                        as="li"
                        key={step.number}
                        delay={150 + i * 150}
                        className="group relative flex items-start gap-6 md:flex-col md:items-center md:gap-7 md:text-center"
                    >
                        <div className="relative z-10 flex-shrink-0">
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 -m-2 rounded-full bg-accent/15 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
                            />
                            <div className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-white dark:bg-neutral-800 text-base font-bold tracking-wide text-accent shadow-card ring-1 ring-neutral-200 dark:ring-neutral-700 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:shadow-elevated group-hover:ring-accent/40">
                                {step.number}
                            </div>
                        </div>

                        <div className="pt-3 md:max-w-xs md:pt-2">
                            <h3 className="text-lg font-bold tracking-tight text-primary dark:text-white transition-colors duration-500 group-hover:text-accent sm:text-xl">
                                {step.title}
                            </h3>
                            <p className="mt-3 text-sm leading-[1.75] text-neutral-600 dark:text-neutral-300 sm:text-base sm:leading-[1.7]">
                                {step.description}
                            </p>
                        </div>
                    </Reveal>
                ))}
            </ol>

            <Reveal delay={600} className="relative mx-auto mt-20 max-w-2xl md:mt-24">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent/[0.07] via-white to-accent/[0.04] dark:from-accent/[0.12] dark:via-neutral-800 dark:to-accent/[0.06] px-8 py-10 text-center shadow-card ring-1 ring-accent/20 sm:px-12 sm:py-12">
                    <div
                        aria-hidden="true"
                        className={`pointer-events-none absolute -top-16 ${isRTL ? '-right-16' : '-left-16'} h-40 w-40 rounded-full bg-accent/10 blur-2xl`}
                    />
                    <div className="relative">
                        <span aria-hidden="true" className="mx-auto mb-5 block h-px w-10 bg-accent/60" />
                        <h3 className="text-xl font-bold tracking-tight text-primary dark:text-white sm:text-2xl">
                            {process.outcome.title}
                        </h3>
                        <p className="mx-auto mt-4 max-w-xl text-base leading-[1.8] text-neutral-700 dark:text-neutral-300 sm:text-lg sm:leading-[1.75]">
                            {process.outcome.text}
                        </p>
                    </div>
                </div>
            </Reveal>

            <Reveal delay={780} className="mt-12 flex justify-center md:mt-14">
                <Button
                    as="a"
                    href="#contact"
                    onClick={scrollToContact}
                    variant="primary"
                    size="lg"
                    className="shadow-elevated"
                >
                    {process.cta}
                </Button>
            </Reveal>
        </Section>
    );
}
