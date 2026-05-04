import Section from '../components/layout/Section';
import Reveal from '../components/ui/Reveal';
import { useLanguage } from '../context/LanguageContext';

export default function MiniAbout() {
    const { t, isRTL } = useLanguage();
    const { miniAbout } = t;

    return (
        <Section
            id="about"
            aria-labelledby="about-title"
            spacing="lg"
            background="none"
            className="overflow-hidden bg-gradient-to-b from-neutral-50/70 via-white to-neutral-50/70"
        >
            <div
                aria-hidden="true"
                className={`pointer-events-none absolute top-1/2 ${isRTL ? 'left-[-10%]' : 'right-[-10%]'} h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-accent/[0.05] blur-3xl`}
            />

            <div className="relative mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-14">
                <Reveal className="md:col-span-4">
                    <div className="relative mx-auto w-full max-w-xs md:max-w-none">
                        <div
                            aria-hidden="true"
                            className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/20 via-accent/5 to-transparent blur-2xl"
                        />
                        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-neutral-100 shadow-card ring-1 ring-neutral-200/70">
                            <img
                                src="/logoA.png"
                                alt="תמונת פרופיל - אסתר אלבלק"
                                className="h-full w-full object-contain p-6"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={150} className={`md:col-span-8 ${isRTL ? 'md:text-right' : 'md:text-left'} text-center`}>
                    <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                        {miniAbout.eyebrow}
                    </span>
                    <h2
                        id="about-title"
                        className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-[2.25rem] lg:leading-[1.2]"
                    >
                        {miniAbout.title}
                    </h2>
                    <p className="mt-6 text-base leading-[1.85] text-neutral-700 sm:text-lg sm:leading-[1.8]">
                        {miniAbout.body}
                    </p>
                    <p className="mt-6 text-sm font-medium text-neutral-500">
                        — {miniAbout.signature}
                    </p>
                </Reveal>
            </div>
        </Section>
    );
}
