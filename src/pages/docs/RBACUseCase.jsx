import React from 'react';
import CodeBlock from '../../components/ui/CodeBlock';

export default function RBACUseCase() {
    return (
        <div className="prose">
            <div style={{ marginBottom: '2rem' }}>
                <span style={{ color: 'var(--color-brand)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.05em' }}>PATTERNS</span>
                <h1>Role-Based Access Control</h1>
            </div>

            <p>
                Most B2B apps need more than just "logged in" vs "logged out". You need "Admins" who can delete things and "Members" who can only read things. 
                Light-Auth handles this natively.
            </p>

            <h3>1. Define your Roles</h3>
            <p>
                Pass your roles array during setup. Light-Auth will validate these whenever a new user registers.
            </p>

            <CodeBlock code={`
setupAuth(app, {
  roles: ['superadmin', 'org:admin', 'org:member'],
  // ...
});
            `} />

            <h3>2. Protect Routes</h3>
            <p>
                Use the <code>authorize</code> middleware. It accepts an array of allowed roles. If the user's role isn't in the list, they get a <code>403 Forbidden</code>.
            </p>

            <CodeBlock code={`
import { authorize } from './setupAuth.js';

// Only Org Admins and Superadmins can invite others
app.post('/org/invite', 
  auth.authenticate, 
  auth.authorize(['org:admin', 'superadmin']), 
  inviteController
);

// Anyone logged in can view the directory
app.get('/org/directory',
  auth.authenticate,
  // No authorize() call needed if all roles are allowed
  directoryController
);
            `} />

            <h3>3. Frontend Adaptation</h3>
            <p>
                Since the <code>req.user</code> object (and the JWT payload) contains the <code>role</code>, you can easily conditionally render UI elements on the client side.
            </p>
            
            <CodeBlock language="jsx" code={`
// React Example
const UserProfile = ({ user }) => {
  return (
    <div className="card">
      <h1>{user.email}</h1>
      
      {/* Only show this button to Admins */}
      {user.role === 'org:admin' && (
        <button className="btn-danger">Delete Organization</button>
      )}
    </div>
  );
}
            `} />
        </div>
    );
}
