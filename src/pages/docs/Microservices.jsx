import React from 'react';
import CodeBlock from '../../components/ui/CodeBlock';

export default function Microservices() {
    return (
        <div className="prose">
            <div style={{ marginBottom: '2rem' }}>
                <span style={{ color: 'var(--color-brand)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.05em' }}>GUIDE</span>
                <h1>Microservices Architecture</h1>
            </div>

            <p>
                In a distributed system, you often want one service to handle user identities (the "Auth Service") while other services focus on business logic (the "Resource Services"). 
                Light-Auth's JWT mode makes this architectural pattern trivial to implement.
            </p>

            <h3>The Distributed Pattern</h3>
            <ul className="clean-list" style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '1.25rem', padding: '1rem', background: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                    <strong style={{ color: 'var(--color-brand)' }}>Service A (Identity Provider)</strong><br/>
                    <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem' }}>Connects to the User database, handles <code>/login</code> and <code>/register</code>, and issues signed JWTs.</p>
                </li>
                <li style={{ marginBottom: '1.25rem', padding: '1rem', background: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                    <strong style={{ color: 'var(--color-brand)' }}>Service B (Resource Provider)</strong><br/>
                    <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem' }}>Does NOT need database access. It only needs the <code>jwtSecret</code> to verify if a request is legitimate.</p>
                </li>
            </ul>

            <h3>The Shared Secret</h3>
            <p>
                The security of this architecture relies on both services knowing the same <code>JWT_SECRET</code>. 
                Service A uses it to <strong>sign</strong> tokens, and Service B uses it to <strong>verify</strong> them.
            </p>

            <div className="info-box" style={{ background: 'rgba(234, 179, 8, 0.1)', borderLeft: '4px solid #facc15', padding: '1.25rem', borderRadius: '0 8px 8px 0', marginBottom: '2rem' }}>
                <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                    <strong>Security Note:</strong> Use a long, random string for your secret. If an attacker gains access to this string, they can forge tokens for any user.
                </p>
            </div>

            <h3>Implementation in Resource Services</h3>
            <p>
                Your secondary services don't even need to use the full Light-Auth package. They can simply use the standard <code>jsonwebtoken</code> library to validate tokens.
            </p>

            <CodeBlock code={`
// Resource Service (e.g. Products API)
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];

  try {
    // Verify using the shared secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user identity to request
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

app.get('/protected-resource', authMiddleware, (req, res) => {
  res.json({ data: "Sensitive info", user: req.user });
});
            `} />

            <h3>Why use this?</h3>
            <ul>
                <li><strong>Scalability:</strong> Your Resource services don't need to query the database just to check if a user is logged in.</li>
                <li><strong>Decoupling:</strong> Service B doesn't need to know anything about your database schema or hashing algorithms.</li>
                <li><strong>Performance:</strong> Cryptographic verification is much faster than a database lookup.</li>
            </ul>
        </div>
    );
}