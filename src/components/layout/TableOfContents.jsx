import React, { useState, useEffect } from 'react';

export default function TableOfContents({ contentRef }) {
    const [headings, setHeadings] = useState([]);
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        if (!contentRef.current) return;

        const scanHeadings = () => {
            const elements = Array.from(contentRef.current.querySelectorAll('h2, h3'));
            const data = elements.map((elem, index) => {
                if (!elem.id) {
                    elem.id = `heading-${index}`;
                }
                return {
                    id: elem.id,
                    text: elem.innerText,
                    level: elem.tagName.toLowerCase()
                };
            });
            setHeadings(data);
        };

        // Scan initially and on DOM mutations (page changes)
        scanHeadings();
        
        const observer = new MutationObserver(scanHeadings);
        observer.observe(contentRef.current, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, [contentRef]);

    useEffect(() => {
        const handleScroll = () => {
            const headingElements = headings.map(h => document.getElementById(h.id));
            const scrollPos = window.scrollY + 100; // Offset

            let currentId = '';
            for (const elem of headingElements) {
                if (elem && elem.offsetTop < scrollPos) {
                    currentId = elem.id;
                }
            }
            setActiveId(currentId);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <nav className="toc-nav">
            <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', color: 'var(--text-primary)' }}>On This Page</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderLeft: '1px solid var(--border-light)' }}>
                {headings.map(heading => (
                    <li key={heading.id} style={{ margin: 0 }}>
                        <a 
                            href={`#${heading.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            style={{
                                display: 'block',
                                paddingTop: '0.25rem',
                                paddingBottom: '0.25rem',
                                fontSize: '0.85rem',
                                color: activeId === heading.id ? 'var(--color-brand)' : 'var(--text-secondary)',
                                borderLeft: activeId === heading.id ? '2px solid var(--color-brand)' : '2px solid transparent',
                                marginLeft: '-1px', // Overlay border
                                textDecoration: 'none',
                                paddingLeft: heading.level === 'h3' ? '2rem' : '1rem',
                                transition: 'all 0.2s'
                            }}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
