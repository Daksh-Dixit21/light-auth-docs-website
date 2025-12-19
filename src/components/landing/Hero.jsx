import React, { useRef, useEffect, useState } from 'react';
import { Check, Copy, Terminal, ArrowRight, Github } from 'lucide-react';
import gsap from 'gsap';

export default function Hero() {
    const [copied, setCopied] = useState(false);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const ctaRef = useRef(null);
    const visualRef = useRef(null);
    const blobRef = useRef(null);

    const installCmd = "npm install @daksh-dev/light-auth";

    const handleCopy = () => {
        navigator.clipboard.writeText(installCmd);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(titleRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
          .fromTo(textRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
          .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
          .fromTo(visualRef.current, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 1.2 }, "-=0.8");
        
        gsap.to(blobRef.current, {
            scale: 1.1,
            rotate: 10,
            duration: 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }, []);

    return (
        <section style={{
            position: 'relative',
            overflow: 'hidden',
            paddingTop: 'clamp(6rem, 15vh, 10rem)',
            paddingBottom: '8rem',
            minHeight: '85vh'
        }}>
            <div ref={blobRef} style={{
                position: 'absolute',
                top: '-20%',
                right: '-5%',
                width: '60vw',
                height: '60vw',
                background: 'radial-gradient(circle, rgba(100, 108, 255, 0.12) 0%, transparent 70%)',
                filter: 'blur(100px)',
                zIndex: -1,
                pointerEvents: 'none'
            }} />

            <div className="container" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'clamp(3rem, 5vw, 5rem)',
                alignItems: 'center'
            }}>
                <div style={{ maxWidth: '600px' }}>
                    <h1 ref={titleRef} style={{
                        fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                        fontWeight: 900,
                        lineHeight: 1.1,
                        marginBottom: '1.5rem',
                        letterSpacing: '-1px',
                        color: 'var(--text-primary)'
                    }}>
                        Auth built for<br />
                        <span style={{ color: 'var(--color-brand)' }}>Modern Speed.</span>
                    </h1>
                    
                    <p ref={textRef} style={{
                        fontSize: '1.25rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '3rem',
                        lineHeight: 1.6,
                        maxWidth: '540px'
                    }}>
                        Authentication shouldn't be complicated. 
                        Light Auth gives you a production-ready, Express-native authentication system in minutes.
                    </p>

                    <div ref={ctaRef} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' }}>
                        
                        {/* Primary Buttons Row */}
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <a href="/docs/quick-start" className="btn btn-brand" style={{ 
                                padding: '1rem 2.5rem', 
                                fontSize: '1.1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                boxShadow: '0 4px 25px rgba(100, 108, 255, 0.4)' 
                            }}>
                                Start Building <ArrowRight size={18} />
                            </a>
                            
                            <a href="https://github.com/Daksh-Dixit21/light-auth" target="_blank" className="btn" style={{ 
                                padding: '1rem 2rem', 
                                fontSize: '1.1rem',
                                background: 'var(--bg-subtle)',
                                color: 'var(--text-primary)',
                                border: '1px solid var(--border-light)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}>
                                <Github size={20} /> Star on GitHub
                            </a>
                        </div>
                    </div>
                </div>

                <div ref={visualRef} className="hero-visual" style={{ position: 'relative', width: '100%' }}>
                    {/* Background Logo Watermark */}
                    <img 
                        src="/Light-Auth-Hero.png" 
                        alt="" 
                        className="hero-logo-bg"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: '300px',
                            height: '300px',
                            opacity: 0.2,
                            filter: 'blur(20px)',
                            zIndex: -1,
                            pointerEvents: 'none',
                            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}
                    />

                    <div style={{
                        background: '#0d0d0e',
                        borderRadius: '16px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.6)',
                        overflow: 'hidden',
                        fontFamily: '"JetBrains Mono", monospace'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.75rem 1.25rem',
                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                            background: 'rgba(255,255,255,0.02)'
                        }}>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }} />
                                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
                                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }} />
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>app.ts</div>
                        </div>

                        <div style={{ padding: '2rem', fontSize: 'clamp(0.75rem, 1.5vw, 0.95rem)', lineHeight: 1.7, color: '#f8f8f2', overflowX: 'auto' }}>
                            <div style={{ whiteSpace: 'nowrap' }}>
                                <span style={{ color: '#ff79c6' }}>import</span> {'{'} setupAuth {'}'} <span style={{ color: '#ff79c6' }}>from</span> <span style={{ color: '#f1fa8c' }}>'@daksh-dev/light-auth'</span>;
                            </div>
                            <br/>
                            <div style={{ whiteSpace: 'nowrap' }}>
                                <span style={{ color: '#6272a4' }}>// One line to rule them all</span>
                            </div>
                            <div style={{ whiteSpace: 'nowrap' }}>
                                <span style={{ color: '#8be9fd' }}>const</span> {'{'} auth {'}'} = <span style={{ color: '#8be9fd' }}>await</span> <span style={{ color: '#50fa7b' }}>setupAuth</span>(app, {'{'}<br/>
                                &nbsp;&nbsp;db: mongoose.connection,<br/>
                                &nbsp;&nbsp;jwtSecret: env.SECRET,<br/>
                                &nbsp;&nbsp;User: <span style={{ color: '#f1fa8c' }}>'default'</span><br/>
                                {'}'});
                            </div>
                            <br/>
                            <div style={{ whiteSpace: 'nowrap' }}>
                                app.<span style={{ color: '#50fa7b' }}>use</span>(<span style={{ color: '#f1fa8c' }}>'/api'</span>, auth.authenticate);
                            </div>
                        </div>

                        {/* Install Bar - Restored below terminal */}
                        <div style={{
                            padding: '1rem',
                            background: 'rgba(0,0,0,0.3)',
                            borderTop: '1px solid rgba(255,255,255,0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#bd93f9', overflow: 'hidden' }}>
                                <Terminal size={14} style={{ flexShrink: 0 }} />
                                <span style={{ color: '#f8f8f2', fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{installCmd}</span>
                            </div>
                            <button 
                                onClick={handleCopy} 
                                title="Copy to clipboard"
                                style={{ 
                                    background: 'transparent', 
                                    border: 'none', 
                                    color: copied ? '#50fa7b' : 'rgba(255,255,255,0.4)', 
                                    cursor: 'pointer',
                                    transition: 'color 0.2s'
                                }}>
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .hero-logo-bg {
                    transform: translate(-50%, -50%) scaleX(-1) rotate(-20deg);
                }
                .hero-visual:hover .hero-logo-bg {
                    transform: translate(-150%, -80%) scaleX(-1) rotate(20deg);
                    opacity: 0.6 !important;
                    filter: blur(0px) !important;
                }
            `}</style>
        </section>
    );
}