import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useActiveSection } from '../hooks/useActiveSection';
import { useLanguage } from '../context/LanguageContext';
import { getWhatsAppLink } from '../lib/whatsapp';

function LanguageToggle({ lang, onToggle, ariaLabel, className = '' }) {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-label={ariaLabel}
            className={`inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 text-xs font-bold tracking-wide text-neutral-600 transition hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 ${className}`}
        >
            <span aria-hidden="true">{lang === 'he' ? 'EN' : 'HE'}</span>
        </button>
    );
}

export default function Navbar() {
    const { t, lang, toggle: toggleLang } = useLanguage();
    const { nav, brand, common } = t;

    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSwitchingLang, setIsSwitchingLang] = useState(false);

    const handleLangToggle = () => {
        setIsSwitchingLang(true);
        toggleLang();
        setTimeout(() => setIsSwitchingLang(false), 200);
    };

    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage = location.pathname === '/';

    const activeSection = useActiveSection(['hero', 'services', 'process', 'faq', 'contact']);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setIsOpen(false);

        if (href.startsWith('/#')) {
            const targetId = href.replace('/#', '');

            if (isHomePage) {
                const element = document.getElementById(targetId);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            } else {
                navigate('/');
                setTimeout(() => {
                    const element = document.getElementById(targetId);
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else {
            navigate(href);
        }
    };

    return (
        <>
        <header className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}>

            {/* Top Bar (Desktop Only) */}
            <div className={`hidden lg:block container mx-auto px-6 mb-3 transition-opacity duration-300 ${isScrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
                <div className="flex justify-between items-center text-sm font-medium text-neutral-500 border-b border-neutral-200/60 pb-2">
                    <div className="flex gap-6">
                        <a href={`tel:${brand.phone}`} className="hover:text-accent transition-colors flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            {brand.phone}
                        </a>
                        <a href={`mailto:${brand.email}`} className="hover:text-accent transition-colors flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            {brand.email}
                        </a>
                    </div>
                    <a href={getWhatsAppLink(brand.whatsappLink || brand.phone)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-accent hover:text-accent-hover">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                        {common.whatsapp}
                    </a>
                </div>
            </div>

            <div className="container mx-auto px-6">
                <nav className="flex items-center justify-between gap-4 sm:gap-6">

                    {/* Logo */}
                    <a href="/" onClick={(e) => handleNavClick(e, '/#hero')} className="group flex min-w-0">
                        <Logo variant="dark" className="transform group-hover:scale-105 transition-transform" />
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex shrink-0 items-center gap-6">
                        <ul className="flex items-center gap-8">
                            {nav.links.map((link) => {
                                const linkId = link.href.replace('/#', '');
                                const isActive = isHomePage && activeSection === linkId;

                                return (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            onClick={(e) => handleNavClick(e, link.href)}
                                            className={`text-[15px] font-medium transition-all relative py-1
                        ${isActive ? 'text-accent' : 'text-neutral-700 hover:text-accent'}
                      `}
                                        >
                                            {link.name}
                                            <span className={`absolute bottom-0 right-0 h-0.5 bg-accent rounded-full transition-all duration-300 ${isActive ? 'w-full' : 'w-0'}`}></span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>

                        <LanguageToggle lang={lang} onToggle={handleLangToggle} ariaLabel={common.languageSwitchAria} />

                        <button
                            onClick={(e) => handleNavClick(e, '/#contact')}
                            className="bg-primary text-secondary px-6 py-2.5 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-primary-light transform hover:-translate-y-0.5 transition-all text-sm"
                        >
                            {nav.cta}
                        </button>
                    </div>

                    {/* Mobile actions */}
                    <div className="flex shrink-0 items-center gap-2 sm:gap-3 lg:hidden">
                        <LanguageToggle lang={lang} onToggle={handleLangToggle} ariaLabel={common.languageSwitchAria} />
                        <button
                            type="button"
                            className="text-primary p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-md"
                            onClick={() => setIsOpen(true)}
                            aria-label={common.openMenu}
                            aria-expanded={isOpen}
                            aria-controls="mobile-menu"
                        >
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                    </div>
                </nav>
            </div>
        </header>

            {/* Mobile Drawer Overlay */}
            <div
                className={`fixed inset-0 z-[9998] bg-primary/50 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
            ></div>

            {/* Mobile Drawer */}
            <div
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label={nav.mobileMenuLabel}
                className={`fixed top-0 ${lang === 'he' ? 'right-0' : 'left-0'} h-full w-4/5 max-w-xs bg-white shadow-2xl z-[9999] transform ${isSwitchingLang ? 'transition-none' : 'transition-transform duration-300'} lg:hidden ${
                    isOpen ? 'translate-x-0' : (lang === 'he' ? 'translate-x-full' : '-translate-x-full')
                }`}
                style={{ backgroundColor: '#ffffff' }}
            >
                <div className="p-6 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-10">
                        <Logo variant="dark" />
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-neutral-400 hover:text-primary transition-colors p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-md"
                            aria-label={common.closeMenu}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <ul className="flex flex-col gap-6 text-lg font-medium">
                        {nav.links.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="block text-neutral-700 hover:text-accent transition-colors"
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-auto pt-8 border-t border-neutral-100">
                        <button
                            onClick={(e) => handleNavClick(e, '/#contact')}
                            className="w-full bg-primary text-secondary py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                        >
                            {nav.cta}
                        </button>
                        <div className="mt-6 flex justify-center gap-6 text-neutral-400">
                            <a href={`tel:${brand.phone}`} aria-label={brand.phone} className="hover:text-accent"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg></a>
                            <a href={`mailto:${brand.email}`} aria-label={brand.email} className="hover:text-accent"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
