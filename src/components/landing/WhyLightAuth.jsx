import React, { useRef, useState } from 'react';
import { Shield, Zap, Lock, Server, Database, Key } from 'lucide-react';

export default function WhyLightAuth() {
    return (
        <section style={{ padding: '4rem 0 8rem', background: 'var(--bg-main)', position: 'relative', overflow: 'hidden' }}>
            
            {/* Subtle Grid Background */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(var(--border-light) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
                opacity: 0.3,
                pointerEvents: 'none'
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: 800, maxWidth: '600px', lineHeight: 1.1 }}>
                        Powering authentication <br/>
                        <span style={{ color: 'var(--text-secondary)' }}>without the friction.</span>
                    </h2>
                </div>

                {/* Grid */}
                <div 
                    style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(12, 1fr)', 
                        gap: '1.5rem',
                        position: 'relative'
                    }}
                >
                    <BentoCard 
                        title="Hybrid Auth Engine"
                        desc="Support stateless JWTs for mobile and stateful Sessions for web simultaneously."
                        icon={Lock}
                        colSpan={7}
                    />

                    <BentoCard 
                        title="RBAC Ready"
                        desc="Protect routes with simple role-based middleware. auth.authorize(['admin']) is all you need."
                        icon={Key}
                        colSpan={5}
                    />

                    <BentoCard 
                        title="Secure by Default"
                        desc="Helmet & rate-limiting baked in."
                        icon={Shield}
                        colSpan={4}
                    />

                    <BentoCard 
                        title="Express Native"
                        desc="Built specifically for Express.js logic."
                        icon={Server}
                        colSpan={4}
                    />

                    <BentoCard 
                        title="Mongoose Integration"
                        desc="Seamlessly respects your schema."
                        icon={Database}
                        colSpan={4}
                    />
                </div>
            </div>
        </section>
    );
}

// eslint-disable-next-line no-unused-vars
function BentoCard({ title, desc, icon: Icon, colSpan }) {
    const cardRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div 
            ref={cardRef}
            className={`bento-card col-span-${colSpan}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Glow Background */}
            <div 
                className="glow-bg" 
                style={{
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(100, 108, 255, 0.1), transparent 40%)`,
                    opacity: opacity
                }} 
            />
            
            <div className="bento-content">
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{title}</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '1rem' }}>{desc}</p>
                </div>

                {/* Background Icon */}
                <div className="bg-icon">
                    <Icon strokeWidth={1} />
                </div>
            </div>

            <style>{`
                .bento-card {
                    background: var(--bg-card);
                    border-radius: 20px;
                    position: relative;
                    overflow: hidden;
                    min-height: 240px;
                    display: flex;
                    flex-direction: column;
                    border: 1px solid var(--border-light);
                    box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
                    transition: border-color 0.3s ease, transform 0.3s ease;
                }
                
                .col-span-7 { grid-column: span 7; }
                .col-span-5 { grid-column: span 5; }
                .col-span-4 { grid-column: span 4; }

                .bento-content {
                    padding: 2.5rem;
                    height: 100%;
                    position: relative;
                    z-index: 2;
                }

                .glow-bg {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    z-index: 0;
                    transition: opacity 0.5s ease;
                }

                .bg-icon {
                    position: absolute;
                    bottom: -10px;
                    right: -10px;
                    color: var(--color-brand);
                    opacity: 0.1;
                    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
                
                .bg-icon svg {
                    width: 140px;
                    height: 140px;
                }

                .bento-card:hover .bg-icon {
                    transform: translateY(-10px) scale(1.05);
                    opacity: 0.15;
                    color: var(--color-brand-light);
                }
                
                .bento-card:hover {
                    border-color: rgba(100, 108, 255, 0.3);
                    transform: translateY(-2px);
                }

                @media (max-width: 900px) {
                    .col-span-7, .col-span-5, .col-span-4 {
                        grid-column: span 12;
                    }
                }
            `}</style>
        </div>
    );
}
