import React from 'react';
import CodeBlock from '../../components/ui/CodeBlock';

export default function QuickStart() {
  return (
    <div className="prose">
      <div style={{ marginBottom: '2rem' }}>
        <span style={{ color: 'var(--color-brand)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.05em' }}>ESSENTIALS</span>
        <h1>Quick Start</h1>
      </div>

      <p>Get up and running with Light-Auth in 3 simple steps. We assume you have a basic Express app ready.</p>

      <h3>1. Install dependencies</h3>
      <p>You need the package itself, plus <code>mongoose</code> and <code>express</code> (which you likely already have).</p>

      <CodeBlock language="bash" code={`npm install @daksh-dev/light-auth mongoose express`} />

      <h3>2. Setup the Middleware</h3>
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
});

// 3. Start Server
app.listen(3000, () => console.log("Server running"));
            `} />

      <h3>3. Protect a Route</h3>
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