import React from 'react';
import CodeBlock from '../../components/ui/CodeBlock';

export default function Configuration() {
    return (
        <div className="prose">
            <div style={{ marginBottom: '2rem' }}>
                <span style={{ color: 'var(--color-brand)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.05em' }}>CORE REFERENCE</span>
                <h1>Configuration Guide</h1>
            </div>

            <p>
                The <code>setupAuth</code> function is the heart of Light-Auth. It takes two arguments: your Express app instance and a configuration object.
            </p>

            <div style={{ 
                padding: '1.5rem', 
                background: 'rgba(239, 68, 68, 0.05)', 
                borderLeft: '4px solid #ef4444',
                borderRadius: '8px',
                margin: '2rem 0'
            }}>
                <h3 style={{ margin: 0, color: '#ef4444', marginBottom: '1rem' }}>Required Configuration Fields</h3>
                <ul className="clean-list" style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <li><strong><code>db</code>:</strong> Your Mongoose connection instance.</li>
                    <li><strong><code>jwtSecret</code>:</strong> A string of at least 16 characters used for token signing.</li>
                    <li><strong><code>User</code>:</strong> Either a custom Mongoose model <strong>OR</strong> the string <code>'default'</code>.</li>
                </ul>
                <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 0 }}>
                    Missing any of these will cause <code>setupAuth</code> to throw an initialization error.
                </p>
            </div>

            <CodeBlock language="javascript" code={`// Minimal setup example
await setupAuth(app, {
  db: mongoose.connection,
  jwtSecret: 'your_very_secure_and_long_secret_key',
  User: 'default' // This will auto-generate a User.js model if missing
});`} />

            <h3>Complete Configuration Object</h3>
            <p>Here is every single option available to you, with their default values.</p>

            <CodeBlock code={`
{
  // Required
  db: mongoose,           // Your Mongoose instance
  jwtSecret: "...",       // String, min 16 chars

  // Core Options
  route: "/auth",         // Base path for routes
  useSession: false,      // true = Cookies, false = JWT
  roles: ["user"],        // Allowed roles for registration
  User: null,             // "default" or a Mongoose Model

  // Security
  passwordPolicy: {
    minLength: 8,
    requireUppercase: false,
    requireLowercase: false,
    requireNumbers: false,
    requireSymbols: false
  },

  // Traffic Control
  rateLimiting: {
    login: {
      windowMs: 15 * 60 * 1000, // 15 min
      max: 5,
      message: "Too many login attempts."
    },
    register: {
      windowMs: 60 * 60 * 1000, // 1 hour
      max: 5,
      message: "Too many registration attempts."
    }
  },

  // Token Settings
  jwtConfig: { 
    expiresIn: "1h" 
  },

  // Session Settings (only if useSession: true)
  sessionConfig: {
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: false, // Auto-set to true in Production
      httpOnly: true, 
      sameSite: "lax" 
    },
    store: null // Optional: connect-mongo store
  },

  // Email Features (Opt-in)
  emailVerification: {
    enabled: false,
    requiredToLogin: false,
    otpLength: 6,
    otpExpiryMinutes: 5,
    sendMail: async ({ email, otp, type, url }) => { /* ... */ }
  },
  
  forgotPassword: {
    enabled: false,
    otpLength: 6,
    otpExpiryMinutes: 5,
    sendMail: async ({ email, otp, type, url }) => { /* ... */ }
  },

  // Lifecycle Hooks
  hooks: {
    onRegister: async (user) => {},
    onLogin: async (user) => {},
    onVerify: async (user) => {},
    onLogout: async (user) => {},
    onError: async ({ type, error }) => {}
  }
}
            `} />

            <h3>Parameter Deep Dive</h3>
            <div className="config-table">
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: '25%' }}>Key</th>
                            <th style={{ width: '20%' }}>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>db</code></td>
                            <td><span className="badge badge-red">Required</span></td>
                            <td>Your active Mongoose connection. We use this to register or load the `User` model securely.</td>
                        </tr>
                        <tr>
                            <td><code>jwtSecret</code></td>
                            <td><span className="badge badge-red">Required</span></td>
                            <td>Used to sign JWTs (in JWT mode) or Session Cookies (in Session mode). Must be strong.</td>
                        </tr>
                        <tr>
                            <td><code>User</code></td>
                            <td><span className="badge badge-red">Required</span></td>
                            <td>
                                If set to <code>"default"</code>, we auto-generate a <code>models/User.js</code> file for you.
                                Or, pass your own Mongoose model to use your existing schema.
                            </td>
                        </tr>
                        <tr>
                            <td><code>useSession</code></td>
                            <td><span className="badge">Boolean</span></td>
                            <td>
                                <code>false</code> (default) = Stateless JWTs. Great for Mobile/APIs.<br />
                                <code>true</code> = Stateful Sessions (HttpOnly Cookie). Great for Web Apps.
                            </td>
                        </tr>
                        <tr>
                            <td><code>route</code></td>
                            <td><span className="badge">String</span></td>
                            <td>The base path for all authentication routes. Default is <code>"/auth"</code>.</td>
                        </tr>
                        <tr>
                            <td><code>hooks</code></td>
                            <td><span className="badge">Object</span></td>
                            <td>Event listeners for extending functionality. See <a href="/docs/hooks">Lifecycle Hooks</a>.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <style>{`
                .config-table {
                    width: 100%;
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                    margin: 2rem 0;
                    border: 1px solid var(--border-light);
                    border-radius: 8px;
                    background: var(--bg-card);
                }
                .config-table table {
                    width: 100%;
                    min-width: 600px; /* Force scroll on mobile */
                    border-collapse: collapse;
                    border: none;
                }
                .config-table th {
                    text-align: left;
                    padding: 1rem 1.25rem;
                    background: var(--bg-subtle);
                    border-bottom: 1px solid var(--border-light);
                    color: var(--text-primary);
                    font-weight: 600;
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    white-space: nowrap;
                }
                .config-table td {
                    padding: 1.25rem;
                    border-bottom: 1px solid var(--border-light);
                    color: var(--text-secondary);
                    vertical-align: top;
                    font-size: 0.95rem;
                    line-height: 1.5;
                }
                .config-table tr:last-child td {
                    border-bottom: none;
                }
                .config-table code {
                    color: var(--color-brand-light);
                    background: rgba(100, 108, 255, 0.1);
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-family: 'JetBrains Mono', monospace;
                }
                .badge {
                    display: inline-block;
                    padding: 2px 8px;
                    border-radius: 4px;
                    font-size: 0.7rem;
                    font-weight: 700;
                    background: var(--bg-subtle);
                    color: var(--text-muted);
                    border: 1px solid var(--border-light);
                    text-transform: uppercase;
                }
                .badge-red {
                    background: rgba(239, 68, 68, 0.1);
                    color: #f87171;
                    border: 1px solid rgba(239, 68, 68, 0.2);
                }
            `}</style>
        </div>
    );
}