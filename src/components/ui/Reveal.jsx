import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';

export default function Reveal({
    as: Tag = 'div',
    delay = 0,
    className,
    children,
    ...props
}) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        if (typeof IntersectionObserver === 'undefined') {
            setVisible(true);
            return;
        }
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
        );
        obs.observe(node);
        return () => obs.disconnect();
    }, []);

    return (
        <Tag
            ref={ref}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
            className={cn(
                'motion-safe:transition-[opacity,transform] motion-safe:duration-[900ms] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]',
                visible
                    ? 'motion-safe:translate-y-0 motion-safe:opacity-100'
                    : 'motion-safe:translate-y-4 motion-safe:opacity-0',
                className,
            )}
            {...props}
        >
            {children}
        </Tag>
    );
}
