import React from 'react';
import Hero from '../components/landing/Hero';
import WhyLightAuth from '../components/landing/WhyLightAuth';
import Footer from '../components/layout/Footer';
import { ArrowRight, Braces, Database, GitBranch, Route } from 'lucide-react';

const metrics = [
    {
        label: 'One setup call',
        value: '1',
        detail: 'Mount routes, middleware, docs, hooks, and models from a single initializer.',
        icon: Braces,
        tone: '#8ee6b0'
    },
    {
        label: 'Auth styles',
        value: '2',
        detail: 'JWT for APIs and sessions for cookie-based apps.',
        icon: GitBranch,
        tone: '#747bff'
    },
    {
        label: 'Ready endpoints',
        value: '9',
        detail: 'Register, login, logout, OTP, reset, docs, and OAuth routes.',
        icon: Route,
        tone: '#8ee6b0'
    },
    {
        label: 'User ownership',
        value: '100%',
        detail: 'No hosted user table. Your MongoDB remains the source of truth.',
        icon: Database,
        tone: '#747bff'
    }
];

export default function Landing() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-main)' }}>
            <LandingStyles />
            <TopBanner />
            <Hero />

            <section className="signal-section">
                <div className="container">
                    <div className="signal-shell">
                        <div className="signal-copy">
                            <span className="signal-kicker">Accurate by design</span>
                            <h2>Everything here maps to a real Light-Auth feature.</h2>
                            <p>
                                No vague security grades. No imaginary bundle claims. Just the setup surface developers actually use when adding authentication to Express.
                            </p>
                        </div>

                        <div className="signal-grid">
                            {metrics.map((metric) => (
                                <MetricCard key={metric.label} {...metric} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <WhyLightAuth />
            <Footer />
        </div>
    );
}

function TopBanner() {
    return (
        <div className="top-banner-wrap">
            <div className="top-banner">
                <span className="top-banner-pill">
                    Made for efficiency
                </span>
                <span className="top-banner-text">Learn the concept, implement faster.</span>
                <a href="https://github.com/Daksh-Dixit21" target="_blank" rel="noopener noreferrer">
                    Made by Daksh Dixit <ArrowRight size={14} />
                </a>
            </div>
        </div>
    );
}

function MetricCard({ label, value, detail, icon, tone }) {
    const MetricIcon = icon;
    const handleMouseMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty('--x', `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty('--y', `${event.clientY - rect.top}px`);
    };

    return (
        <article className="signal-card" style={{ '--tone': tone }} onMouseMove={handleMouseMove}>
            <div className="signal-card-inner">
                <div className="signal-card-head">
                    <span>{label}</span>
                    <MetricIcon size={18} />
                </div>
                <div className="signal-card-value">{value}</div>
                <p>{detail}</p>
            </div>
        </article>
    );
}

function LandingStyles() {
    return (
        <style>{`
            .top-banner-wrap {
                position: sticky;
                top: var(--nav-height);
                z-index: 30;
                padding: 0.75rem 1rem 0;
                pointer-events: none;
            }

            .top-banner {
                width: min(1040px, 100%);
                margin: 0 auto;
                min-height: 48px;
                padding: 0.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.7rem;
                border: 1px solid var(--border-light);
                border-radius: 8px;
                background: color-mix(in srgb, var(--bg-card) 92%, transparent);
                box-shadow: 0 18px 48px rgba(0, 0, 0, 0.18);
                backdrop-filter: blur(18px);
                pointer-events: auto;
            }

            .top-banner-pill {
                display: inline-flex;
                align-items: center;
                gap: 0.45rem;
                height: 32px;
                padding: 0 0.75rem;
                border-radius: 8px;
                color: #102017;
                background: #8ee6b0;
                font-size: 0.84rem;
                font-weight: 800;
                white-space: nowrap;
            }

            .top-banner-text {
                color: var(--text-secondary);
                font-size: 0.92rem;
            }

            .top-banner a {
                display: inline-flex;
                align-items: center;
                gap: 0.35rem;
                height: 32px;
                padding: 0 0.75rem;
                border-radius: 8px;
                color: var(--text-primary);
                background: var(--bg-subtle);
                border: 1px solid var(--border-light);
                font-size: 0.86rem;
                text-decoration: none;
                white-space: nowrap;
            }

            .top-banner a:hover {
                color: var(--color-brand-light);
                border-color: var(--color-brand);
                text-decoration: none;
            }

            .signal-section {
                padding: 0 0 5rem;
            }

            .signal-shell {
                display: grid;
                grid-template-columns: 0.82fr 1.18fr;
                gap: 1rem;
                align-items: stretch;
                border: 1px solid var(--border-light);
                border-radius: 8px;
                padding: 1rem;
                background:
                    radial-gradient(circle at top left, rgba(142, 230, 176, 0.12), transparent 34%),
                    radial-gradient(circle at bottom right, rgba(100, 108, 255, 0.14), transparent 36%),
                    var(--bg-card);
                box-shadow: 0 24px 70px rgba(0, 0, 0, 0.18);
            }

            .signal-copy {
                display: flex;
                flex-direction: column;
                justify-content: center;
                min-height: 280px;
                padding: clamp(1.25rem, 3vw, 2rem);
                border: 1px solid var(--border-light);
                border-radius: 8px;
                background: color-mix(in srgb, var(--bg-main) 94%, transparent);
            }

            .signal-kicker {
                color: #8ee6b0;
                font-size: 0.78rem;
                font-weight: 850;
                text-transform: uppercase;
            }

            .signal-copy h2 {
                max-width: 620px;
                margin: 0.8rem 0 1rem;
                padding: 0;
                border: 0;
                color: var(--text-primary);
                font-size: clamp(2rem, 4vw, 3.2rem);
                line-height: 1;
                font-weight: 900;
                letter-spacing: 0;
            }

            .signal-copy p {
                max-width: 560px;
                margin: 0;
                color: var(--text-secondary);
                font-size: 1rem;
            }

            .signal-grid {
                display: grid;
                grid-template-columns: repeat(2, minmax(0, 1fr));
                gap: 1rem;
            }

            .signal-card {
                position: relative;
                min-height: 180px;
                overflow: hidden;
                border: 1px solid var(--border-light);
                border-radius: 8px;
                background:
                    linear-gradient(180deg, color-mix(in srgb, var(--bg-card) 92%, var(--tone) 8%), var(--bg-main));
                transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
            }

            .signal-card::before {
                content: "";
                position: absolute;
                inset: 0;
                background: radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), color-mix(in srgb, var(--tone) 18%, transparent), transparent 42%);
                opacity: 0;
                transition: opacity 0.25s ease;
                pointer-events: none;
            }

            .signal-card::after {
                content: "";
                position: absolute;
                inset: 0;
                border-radius: inherit;
                padding: 1px;
                background: linear-gradient(135deg, color-mix(in srgb, var(--tone) 60%, transparent), transparent 42%);
                -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
                -webkit-mask-composite: xor;
                mask-composite: exclude;
                opacity: 0;
                transition: opacity 0.25s ease;
                pointer-events: none;
            }

            .signal-card-inner {
                position: relative;
                z-index: 1;
                min-height: 180px;
                padding: 1.15rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }

            .signal-card:hover {
                transform: translateY(-3px);
                border-color: color-mix(in srgb, var(--tone) 34%, var(--border-light));
                box-shadow: 0 20px 44px rgba(0, 0, 0, 0.16);
            }

            .signal-card:hover::before,
            .signal-card:hover::after {
                opacity: 1;
            }

            .signal-card-head {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
                color: var(--text-secondary);
                font-size: 0.84rem;
                font-weight: 800;
            }

            .signal-card-head svg {
                color: var(--tone);
                flex: 0 0 auto;
            }

            .signal-card-value {
                color: var(--text-primary);
                font-size: clamp(3rem, 7vw, 4.9rem);
                line-height: 0.9;
                font-weight: 950;
                letter-spacing: 0;
            }

            .signal-card p {
                margin: 0;
                color: var(--text-secondary);
                font-size: 0.92rem;
                line-height: 1.45;
            }

            [data-theme="light"] .top-banner {
                background: rgba(255, 255, 255, 0.92);
                box-shadow: 0 18px 42px rgba(17, 24, 39, 0.08);
            }

            [data-theme="light"] .signal-shell {
                box-shadow: 0 22px 60px rgba(17, 24, 39, 0.08);
            }

            @media (max-width: 980px) {
                .signal-shell {
                    grid-template-columns: 1fr;
                }
            }

            @media (max-width: 720px) {
                .top-banner {
                    justify-content: flex-start;
                    flex-wrap: wrap;
                }

                .top-banner-text {
                    width: calc(100% - 10rem);
                }

                .top-banner a {
                    width: 100%;
                    justify-content: center;
                }

                .signal-grid {
                    grid-template-columns: 1fr;
                }
            }

            @media (max-width: 520px) {
                .top-banner-wrap {
                    position: relative;
                    top: auto;
                }

                .top-banner-text {
                    width: 100%;
                }

                .signal-shell {
                    padding: 0.75rem;
                }

                .signal-copy {
                    min-height: auto;
                }
            }
        `}</style>
    );
}
