import React from 'react';
import { BookOpenCheck, Fingerprint, KeyRound, MailCheck, ShieldCheck, TerminalSquare } from 'lucide-react';

const features = [
    {
        title: 'CLI that respects existing apps',
        desc: 'Generate an auth wrapper, reuse an existing User model, or create a safe starter model when one is missing.',
        icon: TerminalSquare,
        accent: '#8ee6b0',
        meta: ['init command', 'backup prompt', 'safe imports'],
        size: 'wide'
    },
    {
        title: 'JWT or sessions, same mental model',
        desc: 'Use stateless bearer tokens for APIs or cookie sessions for traditional apps without rewriting route logic.',
        icon: Fingerprint,
        accent: '#747bff',
        meta: ['JWT', 'sessions', 'req.user']
    },
    {
        title: 'Role gates in one line',
        desc: 'Protect admin, mentor, or member-only routes with auth.authenticate and auth.authorize([...]).',
        icon: KeyRound,
        accent: '#8ee6b0',
        meta: ['RBAC', 'middleware', 'roles']
    },
    {
        title: 'Email flows included',
        desc: 'Enable verification and password reset OTP routes when you need them, skip them when you do not.',
        icon: MailCheck,
        accent: '#747bff',
        meta: ['verify', 'reset', 'OTP']
    },
    {
        title: 'Security defaults without ceremony',
        desc: 'Helmet, validation, password hashing, and rate limiting are wired into the auth surface by default.',
        icon: ShieldCheck,
        accent: '#8ee6b0',
        meta: ['helmet', 'bcrypt', 'rate limit'],
        size: 'wide'
    },
    {
        title: 'Docs that follow your config',
        desc: 'Turn on Swagger UI and test the exact routes your app has enabled during development.',
        icon: BookOpenCheck,
        accent: '#747bff',
        meta: ['/auth/docs', 'OpenAPI', 'dev mode']
    }
];

export default function WhyLightAuth() {
    return (
        <section className="feature-section">
            <div className="container">
                <div className="feature-heading">
                    <span>Built for the moment after install</span>
                    <h2>Less auth plumbing. More product momentum.</h2>
                    <p>
                        Light-Auth gives you the pieces most Express projects wire by hand, with escape hatches for real schemas, roles, hooks, and deployment choices.
                    </p>
                </div>

                <div className="feature-grid">
                    {features.map((feature) => (
                        <FeatureCard key={feature.title} {...feature} />
                    ))}
                </div>
            </div>

            <style>{`
                .feature-section {
                    position: relative;
                    padding: 4rem 0 8rem;
                    background:
                        linear-gradient(180deg, var(--bg-main), color-mix(in srgb, var(--bg-main) 94%, var(--color-brand) 6%));
                    overflow: hidden;
                }

                .feature-section::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    background-image:
                        linear-gradient(var(--border-light) 1px, transparent 1px),
                        linear-gradient(90deg, var(--border-light) 1px, transparent 1px);
                    background-size: 42px 42px;
                    opacity: 0.18;
                    pointer-events: none;
                }

                .feature-heading {
                    position: relative;
                    z-index: 1;
                    max-width: 760px;
                    margin-bottom: 2.25rem;
                }

                .feature-heading span {
                    color: #8ee6b0;
                    font-size: 0.8rem;
                    font-weight: 850;
                    text-transform: uppercase;
                }

                .feature-heading h2 {
                    margin: 0.8rem 0 1rem;
                    padding: 0;
                    border: 0;
                    font-size: clamp(2.2rem, 5vw, 4rem);
                    line-height: 1;
                    font-weight: 900;
                    letter-spacing: 0;
                }

                .feature-heading p {
                    max-width: 640px;
                    color: var(--text-secondary);
                    font-size: 1.05rem;
                }

                .feature-grid {
                    position: relative;
                    z-index: 1;
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 1rem;
                }

                .feature-card {
                    position: relative;
                    min-height: 300px;
                    border: 1px solid var(--border-light);
                    border-radius: 8px;
                    background:
                        linear-gradient(180deg, color-mix(in srgb, var(--bg-card) 94%, var(--accent) 6%), var(--bg-card));
                    overflow: hidden;
                    transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
                }

                .feature-card::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(620px circle at var(--x, 50%) var(--y, 50%), color-mix(in srgb, var(--accent) 18%, transparent), transparent 42%);
                    opacity: 0;
                    transition: opacity 0.25s ease;
                    pointer-events: none;
                }

                .feature-card::after {
                    content: "";
                    position: absolute;
                    inset: 0;
                    border-radius: inherit;
                    padding: 1px;
                    background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 56%, transparent), transparent 46%);
                    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                    opacity: 0;
                    transition: opacity 0.25s ease;
                    pointer-events: none;
                }

                .feature-card-inner {
                    position: relative;
                    z-index: 1;
                    min-height: 300px;
                    padding: 1.25rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .feature-card.wide {
                    grid-column: span 2;
                }

                .feature-card:hover {
                    transform: translateY(-3px);
                    border-color: color-mix(in srgb, var(--accent) 34%, var(--border-light));
                    box-shadow: 0 22px 48px rgba(0, 0, 0, 0.16);
                }

                .feature-card:hover::before,
                .feature-card:hover::after {
                    opacity: 1;
                }

                .feature-card-top {
                    display: flex;
                    justify-content: space-between;
                    gap: 1.25rem;
                }

                .feature-icon {
                    width: 48px;
                    height: 48px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    color: var(--accent);
                    background: color-mix(in srgb, var(--accent) 12%, transparent);
                    border: 1px solid color-mix(in srgb, var(--accent) 24%, transparent);
                    flex: 0 0 auto;
                }

                .feature-index {
                    color: color-mix(in srgb, var(--accent) 58%, var(--text-muted));
                    font-size: 0.8rem;
                    font-weight: 850;
                    font-family: "JetBrains Mono", monospace;
                }

                .feature-copy {
                    margin-top: 2.6rem;
                }

                .feature-copy h3 {
                    margin: 0 0 0.75rem;
                    color: var(--text-primary);
                    font-size: clamp(1.3rem, 2vw, 1.8rem);
                    line-height: 1.08;
                    font-weight: 820;
                    letter-spacing: 0;
                }

                .feature-copy p {
                    margin: 0;
                    color: var(--text-secondary);
                    line-height: 1.55;
                }

                .feature-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.45rem;
                    margin-top: 1.5rem;
                }

                .feature-tags span {
                    display: inline-flex;
                    align-items: center;
                    min-height: 28px;
                    padding: 0 0.6rem;
                    border-radius: 8px;
                    color: var(--text-secondary);
                    background: color-mix(in srgb, var(--bg-main) 92%, var(--accent) 8%);
                    border: 1px solid var(--border-light);
                    font-size: 0.78rem;
                    font-weight: 700;
                }

                [data-theme="light"] .feature-card {
                    box-shadow: 0 18px 42px rgba(17, 24, 39, 0.06);
                }

                @media (max-width: 1000px) {
                    .feature-grid {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }

                    .feature-card.wide {
                        grid-column: span 1;
                    }
                }

                @media (max-width: 680px) {
                    .feature-section {
                        padding-top: 3rem;
                    }

                    .feature-grid {
                        grid-template-columns: 1fr;
                    }

                    .feature-card {
                        min-height: 260px;
                    }
                }
            `}</style>
        </section>
    );
}

function FeatureCard({ title, desc, icon, accent, meta, size }) {
    const Icon = icon;
    const handleMouseMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty('--x', `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty('--y', `${event.clientY - rect.top}px`);
    };

    return (
        <article
            className={size === 'wide' ? 'feature-card wide' : 'feature-card'}
            style={{ '--accent': accent }}
            onMouseMove={handleMouseMove}
        >
            <div className="feature-card-inner">
                <div>
                    <div className="feature-card-top">
                        <div className="feature-icon">
                            <Icon size={24} />
                        </div>
                        <span className="feature-index">light-auth</span>
                    </div>

                    <div className="feature-copy">
                        <h3>{title}</h3>
                        <p>{desc}</p>
                    </div>
                </div>

                <div className="feature-tags">
                    {meta.map((item) => (
                        <span key={item}>{item}</span>
                    ))}
                </div>
            </div>
        </article>
    );
}
