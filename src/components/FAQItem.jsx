import { useId } from 'react';

export default function FAQItem({ question, answer, isOpen, onToggle }) {
    const id = useId();
    const buttonId = `faq-q-${id}`;
    const panelId = `faq-a-${id}`;

    return (
        <div
            className={`group rounded-2xl bg-gradient-to-b from-white to-neutral-50 ring-1 shadow-sm transition-all duration-300 ease-out ${
                isOpen
                    ? 'ring-accent/30 shadow-md'
                    : 'ring-neutral-200 hover:ring-accent/20 hover:from-white hover:to-white'
            }`}
        >
            <h3>
                <button
                    id={buttonId}
                    type="button"
                    onClick={onToggle}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full flex items-center gap-4 p-5 md:p-6 text-right cursor-pointer rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                    {/* "+" icon — visually on the left in RTL (renders first in flex row).
                        Rotates 45° on open to become "×". */}
                    <span
                        aria-hidden="true"
                        className={`relative flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 ease-out ${
                            isOpen
                                ? 'bg-accent/10 text-accent rotate-45'
                                : 'bg-neutral-100 text-neutral-600 group-hover:bg-neutral-200/70'
                        }`}
                    >
                        <span className="absolute h-[2px] w-3.5 bg-current rounded-full" />
                        <span className="absolute h-[2px] w-3.5 bg-current rounded-full rotate-90" />
                    </span>

                    <span
                        className={`flex-1 text-base md:text-lg font-semibold leading-snug transition-colors duration-300 ${
                            isOpen ? 'text-primary' : 'text-neutral-700 group-hover:text-primary'
                        }`}
                    >
                        {question}
                    </span>
                </button>
            </h3>

            {/* Smooth height via grid-rows trick — no fixed max-h required */}
            <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
            >
                <div className="overflow-hidden">
                    <div
                        className={`px-5 md:px-6 pb-5 md:pb-6 pr-[3.75rem] md:pr-[4.5rem] text-neutral-600 leading-relaxed transition-all duration-300 ease-out ${
                            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
                        }`}
                    >
                        {answer}
                    </div>
                </div>
            </div>
        </div>
    );
}
