const ICONS = {
    "lead-gen": (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
    ),
    business: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    ),
    ecom: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
    ),
    landing: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    ),
    redesign: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
    ),
};

const FALLBACK_ICON = (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
);

export default function ServiceCard({ service }) {
    const { key, title, description, badge } = service;
    const icon = ICONS[key] ?? FALLBACK_ICON;

    return (
        <div className="group relative bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 dark:border-neutral-700 hover:border-accent/40 dark:hover:border-accent/40 flex flex-col h-full hover:-translate-y-1">
            <div className="absolute top-6 left-6">
                <span className="inline-block px-3 py-1 bg-neutral-50 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-300 text-xs font-semibold rounded-full group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                    {badge}
                </span>
            </div>

            <div className="mb-6 w-14 h-14 rounded-2xl bg-neutral-50 dark:bg-neutral-700 flex items-center justify-center text-primary dark:text-white group-hover:bg-primary dark:group-hover:bg-neutral-900 group-hover:text-accent transition-all duration-300 group-hover:scale-110">
                <div className="text-current transition-colors duration-300 group-hover:text-accent">
                    {icon}
                </div>
            </div>

            <h3 className="text-xl font-bold text-primary dark:text-white mb-3 group-hover:text-accent transition-colors">
                {title}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-sm grow">
                {description}
            </p>

            <div className="mt-6 h-0.5 w-12 bg-neutral-200 dark:bg-neutral-700 group-hover:bg-accent group-hover:w-full transition-all duration-500"></div>
        </div>
    );
}
