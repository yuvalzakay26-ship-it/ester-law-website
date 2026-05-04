import { cn } from '../../lib/cn';

const sizeStyles = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    full: 'max-w-none',
};

export default function Container({
    as: Tag = 'div',
    size = 'lg',
    className,
    children,
    ...props
}) {
    return (
        <Tag
            className={cn(
                'mx-auto w-full px-4 sm:px-6 lg:px-8',
                sizeStyles[size],
                className,
            )}
            {...props}
        >
            {children}
        </Tag>
    );
}
