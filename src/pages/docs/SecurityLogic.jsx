import React from 'react';
import CodeBlock from '../../components/ui/CodeBlock';

export default function SecurityLogic() {
    return (
        <div className="prose">
            <div style={{ marginBottom: '2rem' }}>
                <span style={{ color: 'var(--color-brand)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.05em' }}>DEEP DIVE</span>
                <h1>Security Logic</h1>
            </div>

            <p>
                Security is often opaque. We believe it should be transparent.  
                Here is exactly how Light-Auth protects your application and your users' data under the hood.
            </p>

            <h2>1. Password Hashing</h2>
            <p>
                We don't roll our own crypto. We use industry-standard libraries and safe parameters.
            </p>
            <div style={{ padding: '1.5rem', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-light)', marginBottom: '2rem' }}>
                <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '1.5rem' }}>🛡️</div>
                    <div>
                        <strong>Bcrypt (Salt Rounds: 12)</strong><br/>
                        <p style={{ margin: '0.5rem 0 0', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                            Passwords are never stored in plain text. We use <code>bcryptjs</code> with 12 rounds of salting, making it extremely resilient to rainbow table and brute-force attacks.
                        </p>
                    </div>
                </div>
            </div>

            <h2>2. Session & Cookie Security</h2>
            <p>
                If you enable <code>useSession: true</code>, we configure <code>express-session</code> with strict security defaults.
            </p>
            <ul className="clean-list" style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '1rem', borderLeft: '3px solid var(--color-brand)', paddingLeft: '1rem' }}>
                    <strong>HttpOnly:</strong> Prevents client-side scripts (JS) from accessing the cookie, mitigating XSS-based session theft.
                </li>
                <li style={{ marginBottom: '1rem', borderLeft: '3px solid var(--color-brand)', paddingLeft: '1rem' }}>
                    <strong>SameSite (Lax):</strong> Protects against Cross-Site Request Forgery (CSRF) while maintaining a good user experience.
                </li>
                <li style={{ marginBottom: '1rem', borderLeft: '3px solid var(--color-brand)', paddingLeft: '1rem' }}>
                    <strong>Secure (Auto):</strong> In production, we automatically enforce the <code>Secure</code> flag, meaning cookies are only sent over HTTPS.
                </li>
            </ul>

            <h2>3. Safe-Compare for OTPs</h2>
            <p>
                When validating an OTP, a naive string comparison (<code>token === input</code>) is vulnerable to <strong>Timing Attacks</strong>.
                An attacker can measure how long the server takes to respond to guess the token character by character.
            </p>
            <p>
                Light-Auth uses <code>crypto.timingSafeEqual</code> to ensure the comparison takes the exact same amount of time, regardless of how many characters match.
            </p>

            <CodeBlock code={`
// Internal implementation in modules/email/services/otpService.js
export function isOTPValid(stored, expiry, input) {
  // 1. Expiry check (fast fail)
  if (Date.now() > new Date(expiry).getTime()) return false;

  const bufferA = Buffer.from(stored);
  const bufferB = Buffer.from(input);

  // 2. Constant-time comparison
  // This prevents remote timing attacks
  return bufferA.length === bufferB.length &&
         crypto.timingSafeEqual(bufferA, bufferB);
}
            `} />

            <h2>4. Secure Headers (Helmet)</h2>
            <p>
                By default, we automatically mount <code>helmet()</code> middleware. This sets various HTTP headers to protect against common web vulnerabilities.
                You can disable this by setting <code>security: { '{ helmet: false }' }</code> in your configuration.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                <SecurityCard
                    title="X-Frame-Options"
                    desc="Prevents Clickjacking by disallowing your site to be rendered in an iframe."
                />
                <SecurityCard
                    title="X-XSS-Protection"
                    desc="Mitigates Cross-Site Scripting (XSS) in older browsers."
                />
                <SecurityCard
                    title="HSTS"
                    desc="Strict-Transport-Security enforces HTTPS connections exclusively."
                />
                <SecurityCard
                    title="X-Content-Type"
                    desc="Prevents MIME-sniffing vulnerabilities."
                />
            </div>

            <h2>5. Rate Limiting</h2>
            <p>
                To prevent automated brute-force attacks, we include <code>express-rate-limit</code>.
                Our default policy is strict but fair:
            </p>
            <ul>
                <li><strong>Login:</strong> 5 attempts per 15 minutes per IP.</li>
                <li><strong>Register:</strong> 5 attempts per hour per IP.</li> 
            </ul>
            <p>These values are fully customizable in your configuration object.</p>

            <style>{`
                .security-card {
                    background: rgba(255,255,255,0.03);
                    padding: 1.25rem;
                    border-radius: 8px;
                    border: 1px solid var(--border-light);
                    transition: border-color 0.2s;
                }
                .security-card:hover {
                    border-color: var(--color-brand);
                }
                .security-card strong {
                    color: var(--color-brand);
                    display: block;
                    margin-bottom: 0.5rem;
                    font-size: 0.95rem;
                }
                .security-card p {
                    margin: 0;
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                    line-height: 1.5;
                }
            `}</style>
        </div>
    );
}

function SecurityCard({ title, desc }) {
    return (
        <div className="security-card">
            <strong>{title}</strong>
            <p>{desc}</p>
        </div>
    );
}
