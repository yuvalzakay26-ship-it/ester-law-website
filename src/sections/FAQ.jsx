import { useState } from 'react';
import FAQItem from '../components/FAQItem';
import { useLanguage } from '../context/LanguageContext';

export default function FAQ() {
    const { t, isRTL } = useLanguage();
    const { faq } = t;
    const [openIndex, setOpenIndex] = useState(null);

    const toggleExact = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const scrollToContact = (e) => {
        e.preventDefault();
        const element = document.getElementById('contact');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="faq" aria-labelledby="faq-title" className="py-24 bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden transition-colors duration-300">
            <div className={`absolute top-0 ${isRTL ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 opacity-60 pointer-events-none`}></div>

            <div className="container mx-auto px-6 relative z-10">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 id="faq-title" className="text-3xl md:text-5xl font-bold text-primary dark:text-white mb-6">
                        {faq.title}
                    </h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        {faq.subtitle}
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                    <div className="lg:col-span-7 flex flex-col gap-3 md:gap-4">
                        {faq.list.map((item, index) => (
                            <FAQItem
                                key={index}
                                question={item.question}
                                answer={item.answer}
                                isOpen={openIndex === index}
                                onToggle={() => toggleExact(index)}
                            />
                        ))}

                        <div className={`mt-8 text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
                            <a
                                href="#contact"
                                onClick={scrollToContact}
                                className="inline-flex items-center gap-2 text-primary dark:text-white font-bold border-b-2 border-accent hover:text-accent dark:hover:text-accent hover:border-primary dark:hover:border-white transition-all pb-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                            >
                                {faq.cta}
                                <svg className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-5 lg:sticky lg:top-32 order-last lg:order-none mt-8 lg:mt-0">
                        <div className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-xl border border-neutral-100 dark:border-neutral-700 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-24 h-24 bg-accent/10 rounded-br-full -translate-x-4 -translate-y-4"></div>

                            <div className="flex items-center gap-3 mb-6">
                                <span className="bg-accent/10 text-accent text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    {faq.trustCard.badge}
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold text-primary dark:text-white mb-6">
                                {faq.trustCard.title}
                            </h3>

                            <ul className="space-y-4">
                                {faq.trustCard.points.map((point, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                        <span className="text-neutral-600 dark:text-neutral-300 font-medium">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
