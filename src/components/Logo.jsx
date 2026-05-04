import { useLanguage } from '../context/LanguageContext';
import brand from '../config/brand';

export default function Logo({ variant = 'dark', className = '' }) {
    // variant 'dark' = for light backgrounds (Navy text)
    // variant 'light' = for dark backgrounds (White text)
    const { t } = useLanguage();
    const { name, subtitle, credentialLine } = t.brand;

    const textColor = variant === 'light' ? brand.colors.secondary : brand.colors.primary;
    const subTextColor = variant === 'light' ? brand.colors.brand400 : brand.colors.brand500;
    const accentColor = brand.colors.accent;

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-white/90 p-1.5 shadow-sm ring-1 ring-neutral-200">
                <img
                    src="/logoA.png"
                    alt="קלבלא רתסא - עורכת דין ומגשרת"
                    width="44"
                    height="44"
                    className="h-full w-full object-contain"
                />
            </div>

            <div className="flex min-w-0 flex-col justify-center max-w-[140px] sm:max-w-[180px] lg:max-w-[260px]">
                <span className="text-xl font-bold leading-none tracking-wide truncate" style={{ color: textColor }}>
                    {name}<span style={{ color: accentColor }}>.</span>{subtitle}
                </span>
                {credentialLine && (
                    <span
                        className="text-xs font-medium tracking-wider mt-0.5 line-clamp-2"
                        style={{ color: subTextColor }}
                    >
                        {credentialLine}
                    </span>
                )}
            </div>
        </div>
    );
}
