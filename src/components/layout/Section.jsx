import { cn } from '../../lib/cn';
import Container from './Container';

const spacingStyles = {
    none: '',
    sm: 'py-12',
    md: 'py-16 md:py-20',
    lg: 'py-20 md:py-28',
};

const backgroundStyles = {
    none: '',
    white: 'bg-white dark:bg-neutral-900',
    light: 'bg-secondary dark:bg-neutral-900',
    muted: 'bg-neutral-50 dark:bg-neutral-900',
    dark: 'bg-primary text-secondary dark:bg-neutral-950 dark:text-neutral-100',
};

export default function Section({
    id,
    spacing = 'md',
    background = 'none',
    container = true,
    containerSize = 'lg',
    className,
    children,
    ...props
}) {
    return (
        <section
            id={id}
            className={cn(
                'relative transition-colors duration-300',
                spacingStyles[spacing],
                backgroundStyles[background],
                className,
            )}
            {...props}
        >
            {container ? (
                <Container size={containerSize}>{children}</Container>
            ) : (
                children
            )}
        </section>
    );
}
