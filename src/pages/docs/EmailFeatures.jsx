import React from 'react';
import CodeBlock from '../../components/ui/CodeBlock';

export default function EmailFeatures() {
    return (
        <div className="prose">
            <div style={{ marginBottom: '2rem' }}>
                <span style={{ color: 'var(--color-brand)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.05em' }}>FEATURES</span>
                <h1>Email Verification & Reset</h1>
            </div>

            <p>
                Building secure OTP flows is tedious. Light-Auth handles the token generation, hashing, expiration, and validation for you. 
                You just need to tell us <em>how</em> to send the email.
            </p>

            <div className="info-box" style={{ background: 'rgba(59, 130, 246, 0.1)', borderLeft: '4px solid #3b82f6', padding: '1.5rem', borderRadius: '0 8px 8px 0', marginBottom: '2rem' }}>
                <h4 style={{ margin: 0, marginBottom: '0.5rem', color: 'var(--color-brand)', fontSize: '1.1rem' }}>Bring Your Own Mailer</h4>
                <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                    Light-Auth is agnostic. Use SendGrid, Resend, AWS SES, or even Nodemailer. We just invoke your callback.
                </p>
            </div>

            <h2>1. Testing with Dummy Emails (Crucial)</h2>
            <p>
                You shouldn't waste email credits or spam your own inbox during development. 
                Light-Auth has a built-in <strong>"Mock Mode"</strong>.
            </p>
            <p>
                When you run your app in `development` mode (default), Light-Auth <strong>automatically prevents sending real emails</strong> 
                and instead logs the OTP to your terminal console.
            </p>

            <CodeBlock code={`
// Console Output Example:
[EmailService] Sending VERIFY OTP to: daksh@example.com
[EmailService] From: noreply@authengine.com
[EmailService] OTP: 492817
            `} />

            <p>
                To enable this in production (e.g., for a staging environment), set the environment variable:
            </p>
            <CodeBlock language="bash" code={`ALLOW_MOCK_EMAILS=true`} />

            <h2>2. Email Verification Setup</h2>
            <p>
                Enable this to require users to verify their email before logging in.
            </p>

            <CodeBlock code={`
setupAuth(app, {
  // ...
  emailVerification: {
    enabled: true,
    requiredToLogin: true, // Blocks login if user.verified is false
    otpLength: 6,
    otpExpiryMinutes: 10,
    sendMail: async ({ email, otp, type }) => {
      // Connect to your mailer here
      await resend.emails.send({
        to: email,
        subject: "Verify your account",
        html: \`<p>Your code is: <strong>\${otp}</strong></p>\`
      });
    }
  }
});
            `} />

            <h3>API Endpoints</h3>
            <ul>
                <li><strong>Trigger:</strong> <code>POST /auth/send-verification-otp</code> <br/><small className="text-muted">Body: <code>{'{ email }'}</code></small></li>
                <li><strong>Verify:</strong> <code>POST /auth/verify-email</code> <br/><small className="text-muted">Body: <code>{'{ email, otp }'}</code></small></li>
            </ul>

            <hr style={{ borderColor: 'var(--border-light)', margin: '3rem 0' }} />

            <h2>3. Forgot Password Setup</h2>
            <p>
                Securely reset passwords using a short-lived OTP.
            </p>

            <CodeBlock code={`
setupAuth(app, {
  // ...
  forgotPassword: {
    enabled: true,
    otpLength: 6,
    otpExpiryMinutes: 5,
    sendMail: async ({ email, otp }) => {
       // Send the reset code
    }
  }
});
            `} />

            <h3>API Endpoints</h3>
            <ul>
                <li><strong>Trigger:</strong> <code>POST /auth/send-forgot-otp</code> <br/><small className="text-muted">Body: <code>{'{ email }'}</code></small></li>
                <li><strong>Reset:</strong> <code>POST /auth/reset-password</code> <br/><small className="text-muted">Body: <code>{'{ email, otp, newPassword }'}</code></small></li>
            </ul>

        </div>
    );
}