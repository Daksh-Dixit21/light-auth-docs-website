import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Github, Package, Linkedin, Coffee, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const mobileMenuRef = useRef(null);

    return (
        <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid var(--border-light)', backdropFilter: 'blur(16px)' }}>
            <div className="container" style={{ height: 'var(--nav-height)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', zIndex: 101 }}>
                    <img src="/Light-Auth.png" alt="Light-Auth Logo" style={{ width: 48, height: 48, borderRadius: 8 }} />
                    <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>light-auth</span>
                </Link>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <Link to="/docs" className="nav-link" style={{ fontSize: '0.95rem', fontWeight: 500 }}>Documentation</Link>

                    <div style={{ width: 1, height: 24, background: 'var(--border-light)', margin: '0 0.5rem' }} />

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <SocialIcon href="https://github.com/Daksh-Dixit21/light-auth" icon={<Github size={20} />} label="GitHub" />
                        <SocialIcon href="https://linkedin.com/in/daksh-dixit" icon={<Linkedin size={20} />} label="LinkedIn" />
                        <SocialIcon href="https://buymeacoffee.com/dakshdixit" icon={<Coffee size={20} />} label="Buy Me A Coffee" />

                        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>

                    <a href="https://www.npmjs.com/package/@daksh-dev/light-auth" target="_blank" rel="noopener noreferrer" className="btn-sm-primary">
                        npm v1.0
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="mobile-toggle"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div 
                ref={mobileMenuRef} 
                className="mobile-menu"
                style={{
                    opacity: isMenuOpen ? 1 : 0,
                    visibility: isMenuOpen ? 'visible' : 'hidden',
                    transform: isMenuOpen ? 'translateY(0)' : 'translateY(-100%)'
                }}
            >
                <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem' }}>
                    <Link to="/docs" className="mobile-link" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', textAlign: 'left' }}>Documentation</Link>
                    <Link to="/docs/quick-start" className="mobile-link" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', textAlign: 'left' }}>Quick Start</Link>
                    <Link to="/docs/configuration" className="mobile-link" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', textAlign: 'left' }}>Configuration</Link>

                    <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                            <SocialIcon href="https://github.com/Daksh-Dixit21/light-auth" icon={<Github size={24} />} label="GitHub" />
                            <SocialIcon href="https://linkedin.com/in/daksh-dixit" icon={<Linkedin size={24} />} label="LinkedIn" />
                            <SocialIcon href="https://buymeacoffee.com/dakshdixit" icon={<Coffee size={24} />} label="Buy Me A Coffee" />
                        </div>

                        <button onClick={toggleTheme} className="mobile-theme-btn">
                            {theme === 'dark' ? (
                                <>
                                    <Sun size={20} /> Light Mode
                                </>
                            ) : (
                                <>
                                    <Moon size={20} /> Dark Mode
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Backdrop */}
            {isMenuOpen && (
                <div 
                    className="mobile-backdrop"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            <style>{`
                .nav-link {
                    color: var(--text-secondary);
                    transition: color 0.2s;
                }
                .nav-link:hover {
                    color: var(--color-brand);
                }
                .btn-sm-primary {
                    background: rgba(62, 207, 142, 0.1);
                    color: var(--color-brand);
                    border: 1px solid rgba(62, 207, 142, 0.2);
                    padding: 0.25rem 0.75rem;
                    border-radius: 6px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.2s;
                }
                .btn-sm-primary:hover {
                    background: var(--color-brand);
                    color: #000;
                }
                .theme-toggle {
                    background: transparent;
                    border: none;
                    color: var(--text-secondary);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    padding: 0;
                    transition: color 0.2s;
                }
                .theme-toggle:hover {
                    color: var(--text-primary);
                }

                /* Mobile Styles */
                .mobile-toggle {
                    display: none;
                    background: transparent;
                    border: none;
                    color: var(--text-primary);
                    cursor: pointer;
                    z-index: 101;
                    padding: 0.5rem;
                    border-radius: 8px;
                    transition: background-color 0.2s;
                }
                .mobile-toggle:hover {
                    background-color: var(--bg-subtle);
                }
                
                @media (max-width: 768px) {
                    .desktop-menu {
                        display: none !important;
                    }
                    .mobile-toggle {
                        display: block;
                    }
                }
                
                .mobile-menu {
                    position: absolute;
                    top: calc(var(--nav-height) + 1px);
                    left: 0;
                    right: 0;
                    background: var(--bg-card);
                    border-bottom: 1px solid var(--border-light);
                    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
                    z-index: 99;
                    overflow: hidden;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    transform-origin: top;
                }

                .mobile-link {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    text-align: center;
                }

                .mobile-theme-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    background: var(--bg-card);
                    border: 1px solid var(--border-light);
                    padding: 1rem;
                    border-radius: 8px;
                    color: var(--text-primary);
                    font-weight: 600;
                    cursor: pointer;
                }

                .mobile-backdrop {
                    position: fixed;
                    top: var(--nav-height);
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 90;
                    backdrop-filter: blur(2px);
                }
            `}</style>
        </nav>
    );
}

function SocialIcon({ href, icon, label }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={label}
            style={{
                color: 'var(--text-secondary)',
                transition: 'color 0.2s',
                display: 'flex',
                alignItems: 'center'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
            {icon}
        </a>
    );
}
