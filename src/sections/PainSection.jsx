import Section from '../components/layout/Section';
import Reveal from '../components/ui/Reveal';
import { useLanguage } from '../context/LanguageContext';

export default function PainSection() {
    const { t, isRTL } = useLanguage();
    const { pain } = t;

    return (
        <Section
            id="pain"
            spacing="lg"
            background="none"
            className="overflow-hidden bg-gradient-to-b from-white via-neutral-50/60 to-white"
        >
            <div
                aria-hidden="true"
                className={`pointer-events-none absolute top-1/2 ${isRTL ? 'right-[-10%]' : 'left-[-10%]'} h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-accent/[0.06] blur-3xl`}
            />
            <div
                aria-hidden="true"
                className={`pointer-events-none absolute bottom-[-15%] ${isRTL ? 'left-[-10%]' : 'right-[-10%]'} h-[360px] w-[360px] rounded-full bg-primary/[0.04] blur-3xl`}
            />

            <div className={`relative mx-auto max-w-2xl ${isRTL ? 'text-right' : 'text-left'}`}>
                <Reveal as="p" className="text-sm font-medium tracking-wide text-neutral-500 sm:text-base">
                    {pain.intro}
                </Reveal>

                <ul className="mt-12 space-y-8 sm:mt-14 sm:space-y-10">
                    {pain.points.map((line, i) => (
                        <Reveal
                            as="li"
                            key={i}
                            delay={120 + i * 120}
                            className={`group relative ${isRTL ? 'pr-6' : 'pl-6'} text-lg leading-[1.85] text-primary sm:text-xl sm:leading-[1.75]`}
                        >
                            <span
                                aria-hidden="true"
                                className={`absolute top-2 ${isRTL ? 'right-0' : 'left-0'} h-[calc(100%-1rem)] w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent transition-all duration-500 group-hover:via-accent`}
                            />
                            {line}
                        </Reveal>
                    ))}
                </ul>

                <Reveal
                    as="p"
                    delay={520}
                    className="mt-16 text-base leading-relaxed text-neutral-500 sm:mt-20"
                >
                    {pain.outro}
                </Reveal>
            </div>
        </Section>
    );
}
