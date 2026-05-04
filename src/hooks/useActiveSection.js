import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds, offset = 100) {
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            let currentId = '';

            // Check from bottom up to handle sections near bottom of page
            for (const id of sectionIds) {
                const element = document.getElementById(id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Valid if top is within viewport-ish range
                    if (rect.top <= offset && rect.bottom >= offset) {
                        currentId = id;
                    }
                }
            }

            setActiveId(currentId);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, [sectionIds, offset]);

    return activeId;
}
