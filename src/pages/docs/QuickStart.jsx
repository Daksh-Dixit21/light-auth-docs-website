import React from 'react';
import CodeBlock from '../../components/ui/CodeBlock';
import CliPreview from '../../components/ui/CliPreview';

export default function QuickStart() {
  return (
    <div className="prose">
      <div style={{ marginBottom: '2rem' }}>
        <span style={{ color: 'var(--color-brand)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.05em' }}>ESSENTIALS</span>
        <h1>Quick Start</h1>
      </div>

      <p>Get up and running with Light-Auth quickly. You can either use our CLI for automatic scaffolding or install it manually.</p>

      <h3>Option A: Interactive CLI (Recommended)</h3>
      <p>
        The fastest way to initialize Light-Auth into an existing Express project. The CLI asks a few questions, then generates your auth config, safely reuses or creates a Mongoose user model, and appends missing <code>.env</code> entries.
      </p>
      <CodeBlock language="bash" code={`npx @daksh-dev/light-auth init`} />

      <h4>What the CLI asks</h4>
      <CliPreview />

      <h4>Generated files</h4>
      <p>
        After the prompts finish, your project gets a small wrapper that exports <code>initAuth()</code>. If your chosen user model already exists, the CLI imports it and leaves it untouched. If it does not exist, the CLI creates a compatible model for you.
      </p>

      <p>
        If the auth config file already exists, the CLI asks before writing. The recommended option creates a timestamped backup before overwriting.
      </p>

      <CodeBlock title="src/config/auth.js" code={`import express from 'express';
import mongoose from 'mongoose';
import { setupAuth } from '@daksh-dev/light-auth';
import User from '../../models/User.js';

const router = express.Router();

export async function initAuth() {
  const { auth } = await setupAuth(router, {
    db: mongoose.connection,
    jwtSecret: process.env.JWT_SECRET,
    useSession: false,
    hashing: { algorithm: 'bcrypt' },
    User,
    emailVerification: { enabled: true },
    forgotPassword: { enabled: true },
    oauth: { providers: {} },
    enableDocs: process.env.NODE_ENV !== 'production'
  });

  return { authRouter: router, auth };
}`} />

      <h4>Mount the generated router</h4>
      <CodeBlock code={`import express from 'express';
import mongoose from 'mongoose';
import { initAuth } from './src/config/auth.js';

const app = express();

await mongoose.connect(process.env.MONGO_URI);

const { authRouter, auth } = await initAuth();
app.use(authRouter);

app.get('/dashboard', auth.authenticate, (req, res) => {
  res.json({ user: req.user });
});

app.listen(3000);`} />

      <hr style={{ margin: '2rem 0', opacity: 0.2 }} />

      <h3>Option B: Manual Installation</h3>
      <h4>1. Install dependencies</h4>
      <p>You need the package itself, plus <code>mongoose</code> and <code>express</code> (which you likely already have).</p>

      <CodeBlock language="bash" code={`npm install @daksh-dev/light-auth mongoose express argon2`} />

      <h4>2. Setup the Middleware</h4>
      <p>
        Import <code>setupAuth</code> and initialize it after connecting to your database but <em>before</em> your routes.
      </p>

      <CodeBlock code={`
import express from "express";
import mongoose from "mongoose";
import { setupAuth } from "@daksh-dev/light-auth";

const app = express();
app.use(express.json()); // Don't forget this!

// 1. Connect to DB
await mongoose.connect(process.env.MONGO_URI);

// 2. Initialize Auth
const { auth } = await setupAuth(app, {
  db: mongoose,
  jwtSecret: process.env.JWT_SECRET,
  roles: ["admin", "user"],
  User: "default", // or pass your custom model
  // security: { helmet: true }, // Optional: enabled by default
});

// 3. Start Server
app.listen(3000, () => console.log("Server running"));
            `} />

      <h4>3. Protect a Route</h4>
      <p>
        Use the returned <code>auth</code> object to gate your endpoints.       
      </p>

      <CodeBlock code={`
// Public route
app.get("/", (req, res) => res.send("Hello World"));

// Protected route
app.get("/dashboard",
  auth.authenticate,          // 1. Verifies Token/Session
  auth.authorize(["admin"]),  // 2. Checks if role is 'admin'
  (req, res) => {
    // req.user is populated automatically
    res.json({ msg: \`Welcome \${req.user.email}\` });
  }
);
            `} />
    </div>
  );
}
