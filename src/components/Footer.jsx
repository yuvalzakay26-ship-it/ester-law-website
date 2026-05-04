import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
    const { t, isRTL } = useLanguage();
    const currentYear = new Date().getFullYear();
    const { brand, nav, footer, common } = t;

    return (
        <footer className="bg-primary-light dark:bg-neutral-950 text-neutral-400 py-12 border-t border-primary dark:border-neutral-800 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">

                    <div className={`text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
                        <h3 className="text-2xl font-bold text-secondary mb-2">{brand.name}<span className="text-accent">.</span>{brand.subtitle}</h3>
                        <p className="text-sm opacity-60">{brand.tagline}</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm font-medium">
                        {nav.links.map((link) => (
                            <a key={link.name} href={link.href} className="hover:text-accent transition-colors">
                                {link.name}
                            </a>
                        ))}
                        <a href="#contact" className="hover:text-accent transition-colors">{common.contactUs}</a>
                    </div>

                    <div className={`text-center ${isRTL ? 'md:text-left' : 'md:text-right'} text-xs opacity-50 flex flex-col gap-1`}>
                        <p>&copy; {currentYear} {brand.fullName}. {footer.copyright}</p>
                        <div className={`flex gap-4 justify-center ${isRTL ? 'md:justify-start' : 'md:justify-end'}`}>
                            <Link to="/privacy" className="hover:text-secondary transition-colors">
                                {footer.privacy}
                            </Link>
                            <Link to="/accessibility" className="hover:text-secondary transition-colors">
                                {footer.accessibility}
                            </Link>
                        </div>
                    </div>

                </div>

                <div className="mt-8 pt-8 border-t border-primary dark:border-neutral-800 text-center text-xs max-w-2xl mx-auto space-y-2">
                    <p className="opacity-30">{footer.disclaimer}</p>
                    {footer.compliance && (
                        <p className="opacity-50">{footer.compliance}</p>
                    )}
                    <p className="text-xs text-neutral-400 opacity-60 pt-2">
                        {footer.creditPrefix}{' '}
                        <a
                            href="https://yuval-digital.co.il"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-secondary transition-colors"
                        >
                            {footer.creditBrand}
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
