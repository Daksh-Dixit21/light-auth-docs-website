import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { ChevronRight, Menu, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import Footer from './Footer';
import TableOfContents from './TableOfContents';

// Helper to map paths to titles
const getPageTitle = (pathname) => {
    // Simple mapping logic... 
    // In a real app this might come from a route config
    const map = {
        '/docs': 'Introduction',
        '/docs/quick-start': 'Quick Start',
        '/docs/configuration': 'Configuration',
        '/docs/env-vars': 'Environment Vars',
        '/docs/api-reference': 'API Reference',
        '/docs/email-features': 'Email & OTP',
        '/docs/use-cases/rbac': 'RBAC System',
        '/docs/security': 'Security Logic',
        '/docs/use-cases/mobile': 'Mobile Auth',
        '/docs/use-cases/microservices': 'Microservices',
        '/docs/hooks': 'Lifecycle Hooks',
        '/docs/error-handling': 'Error Handling'
    };
    return map[pathname] || 'Documentation';
};

// Get next page in sequence
const getNextPage = (currentPath) => {
    const pages = [
        '/docs',
        '/docs/quick-start',
        '/docs/configuration',
        '/docs/env-vars',
        '/docs/api-reference',
        '/docs/email-features',
        '/docs/use-cases/rbac',
        '/docs/security',
        '/docs/use-cases/mobile',
        '/docs/use-cases/microservices',
        '/docs/hooks',
        '/docs/error-handling'
    ];
    
    const currentIndex = pages.indexOf(currentPath);
    if (currentIndex === -1 || currentIndex === pages.length - 1) {
        return null; // No next page
    }
    
    const nextPath = pages[currentIndex + 1];
    return {
        path: nextPath,
        title: getPageTitle(nextPath),
        description: getPageDescription(nextPath)
    };
};

// Helper for descriptions
const getPageDescription = (pathname) => {
    const descriptions = {
        '/docs': 'Welcome to Light-Auth and get started with the basics.',
        '/docs/quick-start': 'Set up your first authentication in minutes.',
        '/docs/configuration': 'Learn how to configure Light-Auth for your needs.',
        '/docs/env-vars': 'Understand environment variables and their usage.',
        '/docs/api-reference': 'Deep dive into all available functions and middleware.',
        '/docs/email-features': 'Explore email verification and OTP functionality.',
        '/docs/use-cases/rbac': 'Implement role-based access control in your app.',
        '/docs/security': 'Learn about security features and best practices.',
        '/docs/use-cases/mobile': 'Set up authentication for mobile applications.',
        '/docs/use-cases/microservices': 'Use Light-Auth in microservices architecture.',
        '/docs/hooks': 'Customize behavior with lifecycle hooks.',
        '/docs/error-handling': 'Handle errors and edge cases effectively.'
    };
    return descriptions[pathname] || 'Continue your learning journey.';
};

export default function DocsLayout() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const contentRef = useRef(null);

    const nextPage = getNextPage(location.pathname);

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
        if (contentRef.current) {
            gsap.fromTo(contentRef.current, 
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
            );
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <div className="docs-wrapper">
            {/* Sidebar (Desktop) */}
            <aside className="docs-sidebar">
                <nav className="sidebar-nav">
                    <SidebarGroup title="Getting Started">
                        <NavItem to="/docs" end>Introduction</NavItem>
                        <NavItem to="/docs/quick-start">Quick Start</NavItem>
                        <NavItem to="/docs/configuration">Configuration</NavItem>
                        <NavItem to="/docs/env-vars">Environment Vars</NavItem>
                    </SidebarGroup>

                    <SidebarGroup title="Core Concepts">
                        <NavItem to="/docs/api-reference">API Reference</NavItem>
                        <NavItem to="/docs/email-features">Email & OTP</NavItem>
                        <NavItem to="/docs/use-cases/rbac">RBAC System</NavItem>
                        <NavItem to="/docs/security">Security Logic</NavItem>
                    </SidebarGroup>

                    <SidebarGroup title="Guides">
                        <NavItem to="/docs/use-cases/mobile">Mobile Auth (JWT)</NavItem>
                        <NavItem to="/docs/use-cases/microservices">Microservices</NavItem>
                        <NavItem to="/docs/hooks">Lifecycle Hooks</NavItem>
                        <NavItem to="/docs/error-handling">Error Handling</NavItem>
                    </SidebarGroup>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="docs-main">
                {/* Mobile Menu Toggle */}
                <div className="mobile-docs-header">
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="mobile-menu-btn">
                        <Menu size={20} />
                        <span>Menu</span>
                    </button>
                    <span className="current-page-label">{getPageTitle(location.pathname)}</span>
                </div>

                {/* Mobile Sidebar Overlay */}
                {mobileMenuOpen && (
                    <div className="mobile-sidebar-overlay">
                        <div className="mobile-sidebar-content">
                            <nav className="sidebar-nav">
                                <SidebarGroup title="Getting Started">
                                    <NavItem to="/docs" end>Introduction</NavItem>
                                    <NavItem to="/docs/quick-start">Quick Start</NavItem>
                                    <NavItem to="/docs/configuration">Configuration</NavItem>
                                    <NavItem to="/docs/env-vars">Environment Vars</NavItem>
                                </SidebarGroup>

                                <SidebarGroup title="Core Concepts">
                                    <NavItem to="/docs/api-reference">API Reference</NavItem>
                                    <NavItem to="/docs/email-features">Email & OTP</NavItem>
                                    <NavItem to="/docs/use-cases/rbac">RBAC System</NavItem>
                                    <NavItem to="/docs/security">Security Logic</NavItem>
                                </SidebarGroup>

                                <SidebarGroup title="Guides">
                                    <NavItem to="/docs/use-cases/mobile">Mobile Auth (JWT)</NavItem>
                                    <NavItem to="/docs/use-cases/microservices">Microservices</NavItem>
                                    <NavItem to="/docs/hooks">Lifecycle Hooks</NavItem>
                                    <NavItem to="/docs/error-handling">Error Handling</NavItem>
                                </SidebarGroup>
                            </nav>
                        </div>
                        <div className="mobile-sidebar-backdrop" onClick={() => setMobileMenuOpen(false)} />
                    </div>
                )}

                <div ref={contentRef} className="docs-content-container">
                    <Outlet />

                    {/* Doc Page Navigation / Footer */}
                    <div style={{ marginTop: '6rem', paddingTop: '3rem', borderTop: '1px solid var(--border-light)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
                            <a href="https://github.com/Daksh-Dixit21/light-auth/issues" target="_blank" rel="noopener noreferrer" style={{
                                padding: '1.5rem',
                                background: 'var(--bg-subtle)',
                                border: '1px solid var(--border-light)',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                transition: 'border-color 0.2s'
                            }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-brand)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-light)'}>
                                <div style={{ fontSize: '0.85rem', color: 'var(--color-brand)', fontWeight: 600, marginBottom: '0.5rem' }}>STUCK?</div>
                                <div style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 600 }}>Open an Issue</div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Get help from the community or report a bug.</div>
                            </a>

                            {nextPage ? (
                                <Link to={nextPage.path} style={{
                                    padding: '1.5rem',
                                    background: 'var(--bg-subtle)',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    transition: 'border-color 0.2s'
                                }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-brand)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-light)'}>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--color-brand)', fontWeight: 600, marginBottom: '0.5rem' }}>NEXT</div>
                                    <div style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 600 }}>{nextPage.title}</div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{nextPage.description}</div>
                                </Link>
                            ) : (
                                <a href="https://github.com/Daksh-Dixit21/light-auth" target="_blank" rel="noopener noreferrer" style={{
                                    padding: '1.5rem',
                                    background: 'var(--bg-subtle)',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    transition: 'border-color 0.2s'
                                }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-brand)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-light)'}>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--color-brand)', fontWeight: 600, marginBottom: '0.5rem' }}>EXPLORE</div>
                                    <div style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 600 }}>GitHub Repository</div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Check out the source code and contribute.</div>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
                
                <div style={{ width: '100%' }}>
                    <Footer />
                </div>
            </main>

            {/* Right Sidebar (Table of Contents) */}
            <aside className="docs-toc">
                <div style={{ position: 'sticky', top: 'calc(var(--nav-height) + 2rem)' }}>
                    <TableOfContents contentRef={contentRef} />
                </div>
            </aside>

            <style>{`
                .docs-wrapper {
                    display: grid;
                    grid-template-columns: var(--sidebar-width) 1fr 220px;
                    max-width: var(--max-width);
                    margin: 0 auto;
                    min-height: calc(100vh - var(--nav-height));
                }

                /* Sidebar Styles */
                .docs-sidebar {
                    position: sticky;
                    top: var(--nav-height);
                    height: calc(100vh - var(--nav-height));
                    overflow-y: auto;
                    border-right: 1px solid var(--border-light);
                    padding: 2rem 1.5rem 2rem 0;
                }

                .docs-toc {
                    display: block;
                    padding: 2rem 0 2rem 1.5rem;
                    /* border-left: 1px solid var(--border-light); Optional */
                }

                .sidebar-nav {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }

                .sidebar-group-title {
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: var(--text-primary);
                    font-weight: 700;
                    margin-bottom: 0.75rem;
                    padding-left: 1rem;
                }

                .nav-item {
                    display: block;
                    padding: 0.5rem 1rem;
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                    border-left: 1px solid var(--border-light);
                    transition: all 0.2s ease;
                }

                .nav-item:hover {
                    color: var(--text-primary);
                    border-left-color: var(--text-muted);
                }

                .nav-item.active {
                    color: var(--color-brand);
                    border-left-color: var(--color-brand);
                    font-weight: 500;
                    background: linear-gradient(90deg, rgba(100, 108, 255, 0.05), transparent);
                }

                /* Main Content Styles */
                .docs-main {
                    min-width: 0; /* Prevent flex overflow */
                    padding: 0;
                }
                
                .docs-content-container {
                    padding: 3rem 4rem;
                    margin: 0 auto;
                }

                /* Mobile Styles */
                .mobile-docs-header {
                    display: none;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    border-bottom: 1px solid var(--border-light);
                    position: sticky;
                    top: var(--nav-height);
                    background: var(--bg-main);
                    z-index: 40;
                }

                .mobile-menu-btn {
                    background: transparent;
                    border: 1px solid var(--border-light);
                    border-radius: 6px;
                    padding: 0.4rem 0.8rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--text-secondary);
                    cursor: pointer;
                }

                .mobile-sidebar-overlay {
                    position: fixed;
                    top: var(--nav-height);
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 50;
                    display: flex;
                }

                .mobile-sidebar-content {
                    width: 80%;
                    max-width: 300px;
                    background: var(--bg-card);
                    border-right: 1px solid var(--border-light);
                    padding: 2rem;
                    overflow-y: auto;
                    height: calc(100vh - var(--nav-height));
                    padding-bottom: 4rem;
                }

                .mobile-sidebar-backdrop {
                    flex: 1;
                    background: rgba(0,0,0,0.5);
                    backdrop-filter: blur(2px);
                }

                @media (max-width: 1200px) {
                    .docs-wrapper {
                        grid-template-columns: var(--sidebar-width) 1fr;
                    }
                    .docs-toc {
                        display: none;
                    }
                }

                @media (max-width: 1024px) {
                    .docs-content-container {
                        padding: 2rem;
                    }
                }

                @media (max-width: 768px) {
                    .docs-wrapper {
                        display: block;
                    }
                    .docs-sidebar {
                        display: none;
                    }
                    .mobile-docs-header {
                        display: flex;
                    }
                    .docs-content-container {
                        padding: 2rem 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
}

function SidebarGroup({ title, children }) {
    return (
        <div className="sidebar-group">
            <div className="sidebar-group-title">{title}</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {children}
            </div>
        </div>
    );
}

function NavItem({ to, children, end = false }) {
    return (
        <NavLink to={to} end={end} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            {children}
        </NavLink>
    );
}
