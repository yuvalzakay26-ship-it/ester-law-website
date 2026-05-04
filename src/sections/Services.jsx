import ServiceCard from '../components/ServiceCard';
import { useLanguage } from '../context/LanguageContext';

export default function Services() {
    const { t } = useLanguage();
    const { services } = t;

    const scrollToContact = (e) => {
        e.preventDefault();
        const element = document.getElementById('contact');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="services" aria-labelledby="services-title" className="py-24 bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden transition-colors duration-300">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 opacity-60 pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 opacity-60 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10 transition-opacity duration-700">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 id="services-title" className="text-3xl md:text-5xl font-bold text-primary dark:text-white mb-6">
                        {services.title}
                    </h2>
                    <div className="h-1.5 w-24 bg-accent mx-auto rounded-full mb-8"></div>
                    <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        {services.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {services.list.map((service) => (
                        <div key={service.key} className="h-full">
                            <ServiceCard service={service} />
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <p className="text-neutral-500 dark:text-neutral-400 mb-6 font-medium">{services.bottomLead}</p>
                    <button
                        onClick={scrollToContact}
                        className="inline-flex items-center gap-2 text-primary dark:text-white font-bold border-b-2 border-accent hover:text-accent dark:hover:text-accent hover:border-primary dark:hover:border-white transition-all pb-0.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                    >
                        <span>{services.bottomCta}</span>
                        <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </button>
                </div>

            </div>
        </section>
    );
}
