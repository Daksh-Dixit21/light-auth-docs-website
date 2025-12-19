import React from 'react';
import CodeBlock from '../../components/ui/CodeBlock';

export default function APIReference() {
    return (
        <div className="prose">
            <div style={{ marginBottom: '2rem' }}>
                <span style={{ color: 'var(--color-brand)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.05em' }}>REFERENCE</span>
                <h1>API Reference</h1>
            </div>

            <p>
                Light-Auth exposes a set of REST endpoints and Express middleware. 
                This guide details the request shapes and response codes.
            </p>

            <hr style={{ borderColor: 'var(--border-light)', margin: '2rem 0' }} />

            <h2>HTTP Endpoints</h2>
            <p className="text-sm text-muted">Base URL defaults to <code>/auth</code> unless configured otherwise.</p>

            <Endpoint 
                method="POST" 
                path="/register" 
                desc="Creates a new user account."
                body={`{
  "email": "user@example.com",
  "password": "strongPassword123!",
  "role": "user" // optional, defaults to 'user'
}`}
                responses={[
                    { code: 201, desc: "User created successfully" },
                    { code: 400, desc: "Validation error (invalid email, weak password, invalid role)" },
                    { code: 409, desc: "User already exists" }
                ]}
            />

            <Endpoint 
                method="POST" 
                path="/login" 
                desc="Authenticates a user and returns a token or sets a session cookie."
                body={`{
  "email": "user@example.com",
  "password": "strongPassword123!"
}`}
                responses={[
                    { code: 200, desc: "Success. Returns { token, user } (JWT) or { user } (Session)" },
                    { code: 401, desc: "Invalid credentials" },
                    { code: 403, desc: "Email not verified (if configured)" },
                    { code: 429, desc: "Too many attempts (Rate Limit)" }
                ]}
            />

            <Endpoint 
                method="POST" 
                path="/logout" 
                desc="Destroys the session (if using sessions). Client should discard token."
                responses={[
                    { code: 200, desc: "Logged out successfully" }
                ]}
            />

            <hr style={{ borderColor: 'var(--border-light)', margin: '3rem 0' }} />

            <h2>Middleware</h2>
            <p>Import these from the returned <code>auth</code> object.</p>

            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontFamily: 'monospace', color: 'var(--color-brand)' }}>auth.authenticate</h3>
                <p>
                    Validates the request's identity.
                </p>
                <ul>
                    <li><strong>JWT Mode:</strong> Checks for <code>Authorization: Bearer &lt;token&gt;</code> header. verifies signature and expiration.</li>
                    <li><strong>Session Mode:</strong> Checks for a valid, unexpired session cookie.</li>
                </ul>
                <p><strong>On Success:</strong> Attaches <code>req.user</code> containing <code>{'{ id, role, email }'}</code>.</p>
                <p><strong>On Failure:</strong> Returns <code>401 Unauthorized</code>.</p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontFamily: 'monospace', color: 'var(--color-brand)' }}>auth.authorize(roles)</h3>
                <p>
                    <strong>Requires `authenticate` to run first.</strong> Checks if <code>req.user.role</code> is in the allowed list.
                </p>
                <p><strong>Param:</strong> <code>roles</code> (Array of strings) - e.g., <code>['admin', 'editor']</code></p>
                <p><strong>On Failure:</strong> Returns <code>403 Forbidden</code>.</p>
            </div>

        </div>
    );
}

function Endpoint({ method, path, desc, body, responses }) {
    return (
        <div style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <span style={{ 
                    background: method === 'GET' ? '#0ea5e9' : method === 'POST' ? '#10b981' : '#f59e0b',
                    color: '#000',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px'
                }}>{method}</span>
                <code style={{ fontSize: '1.1rem', fontWeight: 600 }}>{path}</code>
            </div>
            <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>{desc}</p>
            
            {body && (
                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 600 }}>REQUEST BODY</div>
                    <CodeBlock language="json" code={body} />
                </div>
            )}

            <div>
                 <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>RESPONSES</div>
                 <div style={{ display: 'grid', gap: '0.5rem' }}>
                    {responses.map((r, i) => (
                        <div key={i} style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
                            <span style={{ fontFamily: 'monospace', color: r.code >= 400 ? '#ef4444' : '#10b981', minWidth: '3ch' }}>{r.code}</span>
                            <span style={{ color: 'var(--text-secondary)' }}>{r.desc}</span>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
    );
}