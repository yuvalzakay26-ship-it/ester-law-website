import { forwardRef } from 'react';
import { cn } from '../../lib/cn';

const base =
    'inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 ' +
    'disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none';

const variantStyles = {
    primary:
        'bg-primary text-secondary shadow-lg shadow-primary/20 hover:bg-primary-light hover:shadow-xl hover:-translate-y-0.5 dark:bg-accent dark:text-neutral-900 dark:shadow-accent/30 dark:hover:bg-accent-hover',
    secondary:
        'bg-accent text-white shadow-lg shadow-accent/20 hover:bg-accent-dark hover:-translate-y-0.5',
    ghost:
        'bg-white text-primary border border-neutral-200 hover:border-accent hover:text-accent dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700 dark:hover:border-accent dark:hover:text-accent',
    link:
        'bg-transparent text-accent rounded-none px-0 py-0 underline-offset-4 hover:underline shadow-none',
};

const sizeStyles = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-3',
    lg: 'text-lg px-8 py-4',
};

const Spinner = () => (
    <svg
        className="h-4 w-4 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
    </svg>
);

const Button = forwardRef(function Button(
    {
        as: Tag = 'button',
        variant = 'primary',
        size = 'md',
        fullWidth = false,
        loading = false,
        leftIcon = null,
        rightIcon = null,
        disabled = false,
        className,
        children,
        type,
        ...props
    },
    ref,
) {
    const isButton = Tag === 'button';

    return (
        <Tag
            ref={ref}
            type={isButton ? type ?? 'button' : undefined}
            disabled={isButton ? disabled || loading : undefined}
            aria-busy={loading || undefined}
            className={cn(
                base,
                variantStyles[variant],
                variant !== 'link' && sizeStyles[size],
                fullWidth && 'w-full',
                className,
            )}
            {...props}
        >
            {loading ? <Spinner /> : leftIcon}
            {children}
            {!loading && rightIcon}
        </Tag>
    );
});

export default Button;
