import React from 'react';
import CodeBlock from '../../components/ui/CodeBlock';

export default function MobileAuth() {
    return (
        <div className="prose">
            <div style={{ marginBottom: '2rem' }}>
                <span style={{ color: 'var(--color-brand)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.05em' }}>GUIDE</span>
                <h1>Mobile Authentication (JWT)</h1>
            </div>

            <p>
                Mobile apps (React Native, Flutter, Swift) cannot reliably store cookies. 
                Instead, you should use <strong>JWT (JSON Web Tokens)</strong> mode.
            </p>

            <h3>1. Configure for JWT</h3>
            <p>
                Ensure <code>useSession</code> is set to <code>false</code> (this is the default).
            </p>

            <CodeBlock code={`
setupAuth(app, {
  useSession: false, // Force JWT mode
  jwtConfig: {
    expiresIn: "7d" // Long-lived tokens for mobile
  }
});
            `} />

            <h3>2. The Login Flow</h3>
            <p>
                When your mobile app sends a POST request to <code>/auth/login</code>, the server will respond with a token.
            </p>

            <CodeBlock language="json" code={`
// Response from POST /auth/login
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d5ec...",
    "email": "mobile@user.com",
    "role": "user"
  }
}
            `} />

            <h3>3. Storing the Token (Client Side)</h3>
            <p>
                <strong>React Native:</strong> Use <code>AsyncStorage</code> or <code>SecureStore</code> (Expo).
            </p>
            <CodeBlock language="jsx" code={`
// Example: Saving token in React Native
import * as SecureStore from 'expo-secure-store';

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

// After login
save('auth_token', response.data.token);
            `} />

            <h3>4. Making Authenticated Requests</h3>
            <p>
                You must send the token in the <code>Authorization</code> header with the <code>Bearer</code> prefix.
            </p>
            <CodeBlock language="javascript" code={`
const token = await SecureStore.getItemAsync('auth_token');

const response = await fetch('https://api.myapp.com/dashboard', {
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json'
  }
});
            `} />
        </div>
    );
}
