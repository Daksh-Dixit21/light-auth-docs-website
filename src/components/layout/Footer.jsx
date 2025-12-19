import React from 'react';
import { Package } from 'lucide-react';

export default function Footer() {
    return (
        <footer style={{
            borderTop: '1px solid var(--border-light)',
            padding: '4rem 0 2rem',
            background: 'linear-gradient(135deg, var(--bg-main) 0%, rgba(99, 102, 241, 0.02) 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '3rem', marginBottom: '3rem' }}>

                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <img src="/Light-Auth.png" alt="Light-Auth Logo" style={{ width: 48, height: 48, borderRadius: 8 }} />
                            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>light-auth</span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '320px', fontSize: '0.95rem', lineHeight: 1.6 }}>
                            The developer-friendly auth library for Express.js. Open source and free forever.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '5rem', flexWrap: 'wrap' }}>
                        <div>
                            <h4 style={{ fontSize: '0.95rem', marginBottom: '1.25rem', color: 'var(--text-primary)', fontWeight: 600 }}>Resources</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', fontSize: '0.9rem' }}>
                                <FooterLink href="/docs">Documentation</FooterLink>
                                <FooterLink href="https://github.com/Daksh-Dixit21/light-auth">GitHub</FooterLink>
                                <FooterLink href="https://www.npmjs.com/package/@daksh-dev/light-auth">NPM</FooterLink>
                            </div>
                        </div>
                    </div>

                </div>

                <div style={{
                    paddingTop: '2.5rem',
                    borderTop: '1px solid var(--border-light)',
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem'
                }}>
                    © {new Date().getFullYear()} Daksh Dixit. Released under Apache-2.0 License.
                </div>
            </div>
        </footer>
    );
}

function FooterLink({ href, children }) {
    return (
        <a
            href={href}
            style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                position: 'relative'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-brand)';
                e.currentTarget.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.transform = 'translateX(0)';
            }}
        >
            {children}
        </a>
    );
}
