import React from 'react';
import CodeBlock from '../../components/ui/CodeBlock';

export default function HooksDeepDive() {
    return (
        <div className="prose">
            <div style={{ marginBottom: '2rem' }}>
                <span style={{ color: 'var(--color-brand)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.05em' }}>ADVANCED</span>
                <h1>Lifecycle Hooks</h1>
            </div>

            <p>
                Authentication isn't an island. When a user registers, you might want to send a welcome email, sync them to HubSpot, or log the event to Datadog. 
                Light-Auth exposes <strong>Lifecycle Hooks</strong> so you can extend logic without forking the package.
            </p>

            <h3>Available Hooks</h3>
            <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem', marginBottom: '3rem' }}>
                <HookCard 
                    name="onRegister(user)" 
                    desc="Fires immediately after a user is successfully created in MongoDB. Great for welcome emails or CRM syncing."
                />
                <HookCard 
                    name="onLogin(user)" 
                    desc="Fires just before the token/session is issued. Return an object to inject custom claims into the user's session payload."
                />
                <HookCard 
                    name="onVerify(user)" 
                    desc="Fires after email OTP verification is successful."
                />
                <HookCard 
                    name="onError({ type, error })" 
                    desc="Global error catcher. Perfect for piping silent auth failures to your logging infrastructure."
                />
            </div>

            <h3>Real World Example: CRM Sync</h3>
            <p>
                Here is how you would sync a new user to a CRM like HubSpot or Salesforce immediately after registration.
            </p>

            <CodeBlock code={`
const { auth } = await setupAuth(app, {
  // ... config
  hooks: {
    onRegister: async (user) => {
      console.log("New user registered:", user.email);
      
      // Example: Sync to external service
      await myCRM.contacts.create({
        email: user.email,
        id: user._id,
        role: user.role
      });
    }
  }
});
            `} />
            
            <h3>Real World Example: Custom JWT Claims</h3>
            <p>
                Sometimes you need more than just the user ID in the token. 
                Use <code>onLogin</code> to add extra data to the session/token.
            </p>
            
            <CodeBlock code={`
hooks: {
  onLogin: async (user) => {
    // Fetch extra data from another collection
    const profile = await Profile.findOne({ userId: user._id });
    
    // Return object to merge into the token payload
    return {
      displayName: profile.displayName,
      plan: profile.subscriptionPlan // e.g. "pro"
    };
  }
}
// Now req.user.plan will be available in your routes!
            `} />
        </div>
    );
}

function HookCard({ name, desc }) {
    return (
        <div style={{ 
            padding: '1.25rem', 
            borderRadius: '8px', 
            background: 'var(--bg-card)', 
            borderLeft: '4px solid var(--color-brand)',
            border: '1px solid var(--border-light)',
            borderLeftWidth: '4px'
        }}>
            <code style={{ display: 'block', fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--color-brand)', fontWeight: 600 }}>{name}</code>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{desc}</p>
        </div>
    );
}
