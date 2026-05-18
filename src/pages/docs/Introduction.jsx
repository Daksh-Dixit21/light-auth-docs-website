import React from 'react';
import CodeBlock from '../../components/ui/CodeBlock';
import CliPreview from '../../components/ui/CliPreview';

export default function Introduction() {
    return (
        <div className="prose">
            <div style={{ marginBottom: '2rem' }}>
                <span style={{ color: 'var(--color-brand)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.05em' }}>GETTING STARTED</span>
                <h1>Welcome to Light-Auth</h1>
            </div>
            
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                Security shouldn't require a Ph.D. <br/>
                Light-Auth is designed to be the <strong>complete engine</strong> for Express.js authentication, giving you Sessions, JWTs, and RBAC without the complexity of legacy libraries or the cost of external services.
            </p>

            <h2>Start with the CLI</h2>
            <p>
                The fastest way to add Light-Auth to an Express project is the interactive initializer. It asks what kind of auth you want, generates an auth config file, reuses or creates a Mongoose user model, and appends the required environment variables.
            </p>

            <CodeBlock language="bash" code={`npx @daksh-dev/light-auth init`} />

            <CliPreview />

            <div style={{ padding: '2rem', background: 'rgba(62, 207, 142, 0.05)', borderRadius: '12px', border: '1px solid rgba(62, 207, 142, 0.2)', marginBottom: '3rem' }}>
                <h3 style={{ margin: 0, marginBottom: '1.5rem', color: 'var(--color-brand)' }}>The Philosophy</h3>
                <ul className="clean-list" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <div style={{ background: 'var(--color-brand)', color: '#000', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.75rem', fontWeight: 800 }}>1</div>
                        <span><strong>Own Your Data:</strong> No external user tables. Your users live in <em>your</em> MongoDB database. You have full control over your schema.</span>
                    </li>
                    <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <div style={{ background: 'var(--color-brand)', color: '#000', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.75rem', fontWeight: 800 }}>2</div>
                        <span><strong>Hybrid by Design:</strong> Seamlessly serve a web dashboard (Sessions) and a mobile app (JWT) from the same API logic.</span>
                    </li>
                    <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <div style={{ background: 'var(--color-brand)', color: '#000', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.75rem', fontWeight: 800 }}>3</div>
                        <span><strong>Batteries Included:</strong> We bundle essential security tools like Helmet, rate-limiting, and validation so you don't have to wire them up yourself. Secure by default.</span>
                    </li>
                </ul>
            </div>

            <h2>What's inside?</h2>
            <p>
                Light-Auth isn't just a middleware; it's a complete authentication engine. 
                When you initialize it, you get:
            </p>
            <ul>
                <li><strong>Dynamic Router:</strong> Pre-built routes for <code>/login</code>, <code>/register</code>, and <code>/logout</code>.</li>
                <li><strong>Email Engine:</strong> Integrated OTP flows for verification and password resets.</li>
                <li><strong>OAuth2 Support:</strong> Built-in social logins for Google, GitHub, and more.</li>
                <li><strong>Interactive Docs:</strong> Automatically generated FastAPI-style Swagger UI at <code>/docs</code>.</li>
                <li><strong>CLI Scaffolding:</strong> Rapidly initialize light-auth into any project using <code>npx @daksh-dev/light-auth init</code>.</li>
                <li><strong>RBAC Middleware:</strong> A clean <code>authorize(['admin'])</code> syntax for role-based access.</li>
                <li><strong>User Management:</strong> Automatic user model generation or integration with your existing Mongoose models.</li>
            </ul>

            <div style={{ marginTop: '3rem' }}>
                <h2>Ready to dive in?</h2>
                <p>
                    Install the package and get your first route secured in under 2 minutes.
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                    <a href="/docs/quick-start" className="btn btn-brand" style={{ padding: '0.75rem 1.5rem', textDecoration: 'none' }}>Go to Quick Start</a>
                    <a href="https://github.com/Daksh-Dixit21/light-auth" target="_blank" className="btn btn-secondary" style={{ padding: '0.75rem 1.5rem', textDecoration: 'none' }}>Star on GitHub</a>
                </div>
            </div>
        </div>
    );
}
