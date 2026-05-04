import { useState } from 'react';
import Section from '../components/layout/Section';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';
import { getWhatsAppLink } from '../lib/whatsapp';
import submitContact from '../lib/submitContact';

const inputBase =
    'w-full rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-base text-neutral-900 placeholder:text-neutral-400 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20';

const inputError = 'border-red-300 focus:border-red-400 focus:ring-red-200';

const PhoneIcon = () => (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

const WhatsAppIcon = () => (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
);

const MailIcon = () => (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const CheckIcon = () => (
    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
);

export default function ContactSection() {
    const { t, isRTL } = useLanguage();
    const contact = t.contactSection;
    const { form } = contact;

    const [data, setData] = useState({ name: '', phone: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    const validate = () => {
        const next = {};
        if (!data.name.trim()) next.name = form.errors.name;
        const digits = data.phone.replace(/\D/g, '');
        if (digits.length < 9) next.phone = form.errors.phone;
        return next;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const issues = validate();
        if (Object.keys(issues).length) {
            setErrors(issues);
            return;
        }
        setStatus('submitting');
        try {
            await submitContact(data);
            setData({ name: '', phone: '', email: '', message: '' });
            setStatus('success');
        } catch (err) {
            console.error('[contact] submission failed:', err);
            setStatus('idle');
            setErrors((prev) => ({ ...prev, _form: form.errors?.submit || 'Submission failed' }));
        }
    };

    const handleReset = () => {
        setData({ name: '', phone: '', email: '', message: '' });
        setErrors({});
        setStatus('idle');
    };

    return (
        <Section
            id="contact"
            aria-labelledby="contact-title"
            spacing="lg"
            background="none"
            className="overflow-hidden bg-gradient-to-b from-white via-neutral-50 to-white"
        >
            <div
                aria-hidden="true"
                className={`pointer-events-none absolute bottom-0 ${isRTL ? 'right-[-8%]' : 'left-[-8%]'} h-[420px] w-[420px] rounded-full bg-accent/[0.06] blur-3xl`}
            />

            <Reveal className="relative mx-auto max-w-2xl text-center">
                <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                    {contact.eyebrow}
                </span>
                <h2
                    id="contact-title"
                    className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-[2.5rem] lg:leading-[1.2]"
                >
                    {contact.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg sm:leading-[1.7]">
                    {contact.subtitle}
                </p>
            </Reveal>

            <Reveal delay={150} className="relative mx-auto mt-12 max-w-2xl md:mt-14">
                <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-neutral-200/70 sm:p-8 md:p-10">
                    {status === 'success' ? (
                        <div className="py-6 text-center" role="status" aria-live="polite">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                                <CheckIcon />
                            </div>
                            <h3 className="mt-5 text-xl font-bold text-primary sm:text-2xl">
                                {form.successTitle}
                            </h3>
                            <p className="mt-3 text-base text-neutral-600">
                                {form.successMessage}
                            </p>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="mt-6 text-sm font-medium text-neutral-500 underline-offset-4 hover:text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded"
                            >
                                {form.reset}
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate className="space-y-5">
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="cs-name" className="mb-2 block text-sm font-medium text-primary">
                                        {form.name.label}
                                    </label>
                                    <input
                                        id="cs-name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        value={data.name}
                                        onChange={handleChange}
                                        placeholder={form.name.placeholder}
                                        aria-invalid={!!errors.name}
                                        aria-describedby={errors.name ? 'cs-name-error' : undefined}
                                        className={`${inputBase} ${errors.name ? inputError : ''}`}
                                    />
                                    {errors.name && (
                                        <p id="cs-name-error" role="alert" className="mt-1.5 text-xs text-red-500">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="cs-phone" className="mb-2 block text-sm font-medium text-primary">
                                        {form.phone.label}
                                    </label>
                                    <input
                                        id="cs-phone"
                                        name="phone"
                                        type="tel"
                                        autoComplete="tel"
                                        dir="ltr"
                                        value={data.phone}
                                        onChange={handleChange}
                                        placeholder={form.phone.placeholder}
                                        aria-invalid={!!errors.phone}
                                        aria-describedby={errors.phone ? 'cs-phone-error' : undefined}
                                        className={`${inputBase} ${isRTL ? 'text-right' : 'text-left'} ${errors.phone ? inputError : ''}`}
                                    />
                                    {errors.phone && (
                                        <p id="cs-phone-error" role="alert" className="mt-1.5 text-xs text-red-500">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="cs-email" className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
                                    <span>{form.email.label}</span>
                                    <span className="text-xs font-normal text-neutral-400">({form.email.optional})</span>
                                </label>
                                <input
                                    id="cs-email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    dir="ltr"
                                    value={data.email}
                                    onChange={handleChange}
                                    placeholder={form.email.placeholder}
                                    className={`${inputBase} ${isRTL ? 'text-right' : 'text-left'}`}
                                />
                            </div>

                            <div>
                                <label htmlFor="cs-message" className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
                                    <span>{form.message.label}</span>
                                    <span className="text-xs font-normal text-neutral-400">({form.message.optional})</span>
                                </label>
                                <textarea
                                    id="cs-message"
                                    name="message"
                                    rows={4}
                                    value={data.message}
                                    onChange={handleChange}
                                    placeholder={form.message.placeholder}
                                    className={`${inputBase} resize-none`}
                                />
                            </div>

                            <Button
                                type="submit"
                                variant="secondary"
                                size="lg"
                                fullWidth
                                loading={status === 'submitting'}
                                className="mt-2"
                            >
                                {status === 'submitting' ? form.sending : form.submit}
                            </Button>

                            {errors._form && (
                                <p role="alert" className="text-center text-xs text-red-500">
                                    {errors._form}
                                </p>
                            )}

                            {form.trustItems && (
                                <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-2 text-[13px] text-neutral-500">
                                    {form.trustItems.map((item) => (
                                        <li key={item} className="inline-flex items-center gap-1.5">
                                            <svg
                                                className="h-3.5 w-3.5 text-accent"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.25"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                aria-hidden="true"
                                            >
                                                <path d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <p className="pt-1 text-center text-xs text-neutral-400">
                                {form.privacyNote}{' '}
                                <a href="/privacy" className="underline-offset-2 hover:text-accent hover:underline">
                                    {form.privacyLink}
                                </a>
                            </p>
                        </form>
                    )}
                </div>
            </Reveal>

            <Reveal delay={250} className="relative mx-auto mt-10 max-w-2xl text-center md:mt-12">
                <p className="text-sm text-neutral-500">{contact.altTitle}</p>
                <ul className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                    <li>
                        <a
                            href={contact.phoneLink}
                            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-accent hover:text-accent"
                        >
                            <PhoneIcon />
                            <span>{contact.contactInfo.phone}</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href={getWhatsAppLink(contact.whatsappLink || contact.phoneLink)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-accent hover:text-accent"
                        >
                            <WhatsAppIcon />
                            <span>{contact.contactInfo.whatsapp}</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href={`mailto:${contact.email}`}
                            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-accent hover:text-accent"
                        >
                            <MailIcon />
                            <span>{contact.contactInfo.email}</span>
                        </a>
                    </li>
                </ul>
            </Reveal>
        </Section>
    );
}
