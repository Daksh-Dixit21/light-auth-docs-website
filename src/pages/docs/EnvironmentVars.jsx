import React from 'react';
import CodeBlock from '../../components/ui/CodeBlock';

export default function EnvironmentVars() {
    return (
        <div className="prose">
            <div style={{ marginBottom: '2rem' }}>
                <span style={{ color: 'var(--color-brand)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.05em' }}>ESSENTIALS</span>
                <h1>Environment Variables</h1>
            </div>

            <p>
                Security best practices dictate that you never hardcode secrets. 
                Here is a comprehensive guide to the environment variables you should define in your <code>.env</code> file.
            </p>

            <h3>Basic .env Structure</h3>
            <CodeBlock language="bash" code={`
# Server Configuration
PORT=3000
NODE_ENV=development 

# Database
MONGO_URI=mongodb://localhost:27017/myapp

# Light-Auth Secrets
JWT_SECRET=super-secret-key-that-is-at-least-16-chars-long

# Optional: Email Testing
ALLOW_MOCK_EMAILS=true
            `} />

            <h3>Variable Reference</h3>
            <div className="config-table">
                <table>
                    <thead>
                        <tr>
                            <th>Variable</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>NODE_ENV</code></td>
                            <td>
                                <code>development</code> (default): Enables detailed logging and Mock Email mode.<br/>
                                <code>production</code>: Enforces secure cookies, strict validations, and requires real emailers.
                            </td>
                        </tr>
                        <tr>
                            <td><code>JWT_SECRET</code></td>
                            <td>
                                <strong>Required.</strong> The master key for signing tokens. 
                                Loss of this key invalidates all active sessions/tokens.
                            </td>
                        </tr>
                        <tr>
                            <td><code>ALLOW_MOCK_EMAILS</code></td>
                            <td>
                                If set to <code>true</code>, Light-Auth will log OTPs to the console even in production environments. 
                                <strong>Use with caution.</strong>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3>Production Mode Checklist</h3>
            <p>Before deploying, ensure:</p>
            <ul className="clean-list" style={{ listStyle: 'none', paddingLeft: 0 }}>
                <li style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--color-brand)' }}>✓</span> <code>NODE_ENV</code> is set to <code>production</code>.
                </li>
                <li style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--color-brand)' }}>✓</span> <code>JWT_SECRET</code> is a long, random string (use <code>openssl rand -hex 32</code>).
                </li>
                <li style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--color-brand)' }}>✓</span> You are running over <strong>HTTPS</strong> (Secure cookies require HTTPS).
                </li>
            </ul>

            <style>{`
                .config-table table {
                    width: 100%;
                    border-collapse: separate;
                    border-spacing: 0;
                    margin: 2rem 0;
                    border: 1px solid var(--border-light);
                    border-radius: 8px;
                    overflow: hidden;
                }
                .config-table th {
                    text-align: left;
                    padding: 1rem;
                    background: var(--bg-card);
                    border-bottom: 1px solid var(--border-light);
                    color: var(--text-muted);
                    font-weight: 600;
                    font-size: 0.85rem;
                }
                .config-table td {
                    padding: 1rem;
                    border-bottom: 1px solid var(--border-light);
                    color: var(--text-secondary);
                    vertical-align: top;
                    font-size: 0.95rem;
                }
                .config-table tr:last-child td {
                    border-bottom: none;
                }
                .config-table code {
                    color: var(--color-brand);
                }
            `}</style>
        </div>
    );
}
