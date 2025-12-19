import React from 'react';

export default function EnvConfig() {
    return (
        <div className="prose">
            <h1>Environment Configuration</h1>
            <p>
                Light-Auth behaviors can be tuned using standard environment variables.
                These are checked at runtime during <code>setupAuth()</code> and when sending emails.
            </p>

            <h2>Authentication Core</h2>
            <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Variable</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>NODE_ENV</code></td>
                            <td><code>'development'</code></td>
                            <td>If <code>production</code>, security checks (like HTTPS cookies) are strictly enforced.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2>Email Services</h2>
            <p>Used only if <code>emailVerification</code> or <code>forgotPassword</code> is enabled.</p>
            <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Variable</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>AUTH_ENGINE_EMAIL_FROM</code></td>
                            <td><code>'noreply@authengine.com'</code></td>
                            <td>The sender address displayed in OTP emails.</td>
                        </tr>
                        <tr>
                            <td><code>ALLOW_MOCK_EMAILS</code></td>
                            <td><code>'false'</code></td>
                            <td>
                                If <code>true</code>, allows using the default console-logger mailer even in production.
                                <strong>WARNING:</strong> Use only for staging environments.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <style>{`
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 2rem 0;
                    font-size: 0.9rem;
                }
                th, td {
                    padding: 0.75rem 1rem;
                    border: 1px solid var(--border-light);
                    text-align: left;
                }
                th {
                    background: var(--bg-subtle);
                    font-weight: 600;
                    color: var(--text-primary);
                }
                td code {
                    color: var(--color-brand);
                    background: var(--bg-subtle);
                    padding: 0.2rem 0.4rem;
                    border-radius: 4px;
                }
                .table-responsive {
                    overflow-x: auto;
                    border: 1px solid var(--border-light);
                    border-radius: var(--radius-md);
                }
            `}</style>
        </div>
    );
}
