import React from 'react';
import CodeBlock from '../../components/ui/CodeBlock';

export default function ErrorHandling() {
    return (
        <div className="prose">
            <div style={{ marginBottom: '2rem' }}>
                <span style={{ color: 'var(--color-brand)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.05em' }}>GUIDE</span>
                <h1>Error Handling</h1>
            </div>

            <p>
                Light-Auth uses standard HTTP status codes to communicate success and failure. 
                All API error responses follow a consistent, predictable JSON format so your frontend can handle them easily.
            </p>

            <h3>The Response Format</h3>
            <p>Every error response will contain an <code>error</code> field with a human-readable message.</p>

            <CodeBlock code={`
// 400 Bad Request
{
  "error": "Password must be at least 8 characters long."
}
            `} />

            <h3>Status Code Cheat Sheet</h3>
            <div className="error-table">
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: '80px' }}>Status</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><span className="badge-red">400</span></td>
                            <td>
                                <strong>Bad Request.</strong> Validation failed (e.g. invalid email, weak password) or missing fields.
                            </td>
                        </tr>
                        <tr>
                            <td><span className="badge-red">401</span></td>
                            <td>
                                <strong>Unauthorized.</strong> Authentication failed. Wrong password, missing token, or expired session.
                            </td>
                        </tr>
                        <tr>
                            <td><span className="badge-yellow">403</span></td>
                            <td>
                                <strong>Forbidden.</strong> User is logged in, but lacks the required permission (RBAC) or is not verified.
                            </td>
                        </tr>
                        <tr>
                            <td><span className="badge-yellow">409</span></td>
                            <td>
                                <strong>Conflict.</strong> Tried to register an email that already exists.
                            </td>
                        </tr>
                        <tr>
                            <td><span className="badge-red">429</span></td>
                            <td>
                                <strong>Too Many Requests.</strong> Rate limit exceeded. Try again later.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3>Global Error Hook</h3>
            <p>
                For production apps, you need visibility. You can hook into every single error Light-Auth throws 
                to pipe them into your monitoring tools (Sentry, Datadog, LogRocket).
            </p>

            <CodeBlock code={`
setupAuth(app, {
  hooks: {
    onError: async ({ type, error, req }) => {
      // type: 'login' | 'register' | 'setup' | 'logout'
      
      console.error(\`Auth Error [\${type}]:\`, error.message);
      
      // Example: Send context to Sentry
      Sentry.captureException(error, { 
        tags: { auth_stage: type },
        extra: { ip: req?.ip } 
      });
    }
  }
});
            `} />

            <style>{`
                .error-table table {
                    width: 100%;
                    border-collapse: separate;
                    border-spacing: 0;
                    margin: 1.5rem 0;
                    border: 1px solid var(--border-light);
                    border-radius: 8px;
                    overflow: hidden;
                }
                .error-table th {
                    text-align: left;
                    padding: 0.75rem 1rem;
                    background: var(--bg-card);
                    border-bottom: 1px solid var(--border-light);
                    color: var(--text-muted);
                    font-weight: 600;
                    font-size: 0.85rem;
                }
                .error-table td {
                    padding: 1rem;
                    border-bottom: 1px solid var(--border-light);
                    color: var(--text-secondary);
                    vertical-align: top;
                    font-size: 0.95rem;
                }
                .error-table tr:last-child td {
                    border-bottom: none;
                }
                .badge-red {
                    display: inline-block;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    background: rgba(239, 68, 68, 0.15);
                    color: #f87171;
                    font-family: monospace;
                }
                .badge-yellow {
                    display: inline-block;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    background: rgba(234, 179, 8, 0.15);
                    color: #facc15;
                    font-family: monospace;
                }
            `}</style>
        </div>
    );
}