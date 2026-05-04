import Section from '../components/layout/Section';
import Reveal from '../components/ui/Reveal';
import { useLanguage } from '../context/LanguageContext';

export default function Testimonials() {
    const { t, isRTL } = useLanguage();
    const { testimonials } = t;

    return (
        <Section
            id="testimonials"
            aria-labelledby="testimonials-title"
            spacing="lg"
            background="none"
            className="overflow-hidden bg-gradient-to-b from-white via-neutral-50 to-white"
        >
            <div
                aria-hidden="true"
                className={`pointer-events-none absolute top-1/3 ${isRTL ? 'left-[-6%]' : 'right-[-6%]'} h-[380px] w-[380px] rounded-full bg-accent/[0.05] blur-3xl`}
            />

            <Reveal className="relative mx-auto max-w-2xl text-center">
                <h2
                    id="testimonials-title"
                    className="text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-[2.5rem] lg:leading-[1.2]"
                >
                    {testimonials.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg sm:leading-[1.7]">
                    {testimonials.subtitle}
                </p>
            </Reveal>

            <ul className="relative mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 md:mt-20 md:grid-cols-3 md:gap-7">
                {testimonials.list.map((item, i) => (
                    <Reveal
                        as="li"
                        key={item.name}
                        delay={150 + i * 150}
                        className="group relative flex h-full flex-col rounded-2xl bg-white p-8 shadow-card ring-1 ring-neutral-200/70 transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated hover:ring-accent/30"
                    >
                        <span
                            aria-hidden="true"
                            className={`absolute top-5 ${isRTL ? 'left-6' : 'right-6'} font-display text-5xl leading-none text-accent/20 select-none transition-colors duration-500 group-hover:text-accent/35`}
                        >
                            &rdquo;
                        </span>

                        <p className="relative grow text-base leading-[1.85] text-neutral-700 sm:text-[1.0625rem]">
                            {item.quote}
                        </p>

                        <div className="mt-7 flex items-start gap-3">
                            <span aria-hidden="true" className="mt-2 block h-px w-8 shrink-0 bg-accent/50" />
                            <div className="flex flex-col">
                                <cite className="text-sm font-medium not-italic text-neutral-500">
                                    {item.name}
                                </cite>
                                {item.identity && (
                                    <span className="mt-1 text-xs text-neutral-400">
                                        {item.identity}
                                    </span>
                                )}
                            </div>
                        </div>
                    </Reveal>
                ))}
            </ul>

            <Reveal delay={300} className="relative mx-auto mt-10 max-w-xl text-center md:mt-12">
                <p className="text-sm text-neutral-600 sm:text-base">
                    {testimonials.closingLine}
                </p>
            </Reveal>
        </Section>
    );
}
