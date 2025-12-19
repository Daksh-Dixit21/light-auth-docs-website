import React from 'react';
import Hero from '../components/landing/Hero';
import WhyLightAuth from '../components/landing/WhyLightAuth';
import Footer from '../components/layout/Footer';
import { Zap, Shield, Smartphone, Code, Cpu, Clock, Lock, Layers } from 'lucide-react';

export default function Landing() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-main)' }}>
            <Hero />
            
            {/* Stats Section - Refined Spec Card */}
            <section style={{ padding: '2rem 0' }}>
                <div className="container">
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                        gap: '2rem',
                        padding: '3rem 2rem',
                        background: 'var(--bg-card)',
                        borderRadius: '24px',
                        border: '1px solid var(--border-light)',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Background subtle glow */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '100%',
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, var(--color-brand), transparent)',
                            opacity: 0.5
                        }} />

                        <StatItem label="Bundle Size" value="< 15KB" />
                        <StatItem label="Setup Time" value="< 5 Min" />
                        <StatItem label="Security" value="Grade A+" />
                        <StatItem label="Compatibility" value="JS + TS" />
                    </div>
                </div>
            </section>

            <WhyLightAuth />
            
            <Footer />
        </div>
    );
}

function StatItem({ label, value }) {
    return (
        <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-brand)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>
                {label}
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                {value}
            </div>
        </div>
    );
}
