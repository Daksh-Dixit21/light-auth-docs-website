import React from 'react';

const prompts = [
    {
        label: 'Which authentication mode do you want to use?',
        options: [
            { text: 'JWT (Stateless, great for React/Next.js SPA)', selected: true },
            { text: 'Sessions (Stateful, great for traditional web apps)' },
        ],
    },
    {
        label: 'Which password hashing algorithm do you want to use?',
        options: [
            { text: 'Bcrypt (Standard, default)', selected: true },
            { text: "Argon2 (More secure, requires installing 'argon2' package)", optional: true },
        ],
    },
    {
        label: 'Enable OAuth2 providers?',
        optional: true,
        hint: 'Space to select, Enter to skip',
        options: [
            { text: 'Google' },
            { text: 'GitHub' },
        ],
    },
    {
        label: 'Enable Email Verification & Password Reset?',
        optional: true,
        options: [
            { text: 'No', selected: true },
            { text: 'Yes' },
        ],
    },
    {
        label: 'Where should we generate the auth file?',
        input: 'src/config/auth.js',
    },
    {
        label: 'Where is your User model?',
        hint: 'Existing files are reused, not overwritten',
        input: 'models/User.js',
    },
];

export default function CliPreview() {
    return (
        <div className="cli-preview" aria-label="Light-Auth CLI prompt preview">
            <div className="cli-preview-header">
                <span className="cli-dot" />
                <span className="cli-dot" />
                <span className="cli-dot" />
                <span className="cli-title">npx @daksh-dev/light-auth init</span>
            </div>

            <div className="cli-preview-body">
                <div className="cli-intro">Welcome to Light-Auth Setup</div>
                <div className="cli-note">
                    <span>Optional Features</span>
                    OAuth, email flows, and Argon2 can be skipped now and configured later.
                </div>
                <div className="cli-note safe">
                    <span>Safe Integration</span>
                    Existing auth files ask before overwrite. Existing user models are imported as-is.
                </div>

                {prompts.map((prompt) => (
                    <div className="cli-prompt" key={prompt.label}>
                        <div className="cli-question">
                            <span className="cli-marker">?</span>
                            <span>{prompt.label}</span>
                            {prompt.optional && <span className="cli-badge">optional</span>}
                            {prompt.hint && <span className="cli-hint">{prompt.hint}</span>}
                        </div>

                        {prompt.input ? (
                            <div className="cli-input">{prompt.input}</div>
                        ) : (
                            <div className="cli-options">
                                {prompt.options.map((option) => (
                                    <div className={option.selected ? 'cli-option selected' : 'cli-option'} key={option.text}>
                                        <span className="cli-cursor">{option.selected ? '>' : ' '}</span>
                                        <span className="cli-radio">{option.selected ? '*' : 'o'}</span>
                                        <span>{option.text}</span>
                                        {option.optional && <span className="cli-badge subtle">optional</span>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <style>{`
                .cli-preview {
                    margin: 2rem 0;
                    border: 1px solid var(--border-light);
                    border-radius: 8px;
                    overflow: hidden;
                    background: #0f1015;
                    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.22);
                }

                .cli-preview-header {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    min-height: 42px;
                    padding: 0 1rem;
                    border-bottom: 1px solid rgba(255,255,255,0.08);
                    background: #171821;
                }

                .cli-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 999px;
                    background: #3e4252;
                }

                .cli-title {
                    margin-left: 0.5rem;
                    color: #a7adbe;
                    font-family: "JetBrains Mono", monospace;
                    font-size: 0.78rem;
                }

                .cli-preview-body {
                    padding: 1.25rem;
                    color: #e7eaf3;
                    font-family: "JetBrains Mono", monospace;
                    font-size: 0.88rem;
                    line-height: 1.6;
                }

                .cli-intro {
                    color: #8ee6b0;
                    font-weight: 700;
                    margin-bottom: 0.9rem;
                }

                .cli-note {
                    display: grid;
                    gap: 0.15rem;
                    margin-bottom: 1.25rem;
                    padding: 0.8rem 1rem;
                    border: 1px solid rgba(100, 108, 255, 0.34);
                    border-radius: 8px;
                    background: rgba(100, 108, 255, 0.1);
                    color: #c9cdfb;
                }

                .cli-note.safe {
                    border-color: rgba(142, 230, 176, 0.28);
                    background: rgba(142, 230, 176, 0.08);
                    color: #b8e9ca;
                }

                .cli-note span {
                    color: #ffffff;
                    font-weight: 700;
                }

                .cli-prompt {
                    margin-top: 1.15rem;
                }

                .cli-question {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                    color: #ffffff;
                    font-weight: 650;
                }

                .cli-marker {
                    color: #8ee6b0;
                    font-weight: 800;
                }

                .cli-badge {
                    display: inline-flex;
                    align-items: center;
                    height: 1.35rem;
                    padding: 0 0.45rem;
                    border-radius: 999px;
                    background: rgba(142, 230, 176, 0.12);
                    color: #8ee6b0;
                    border: 1px solid rgba(142, 230, 176, 0.28);
                    font-size: 0.68rem;
                    text-transform: uppercase;
                    font-family: Inter, system-ui, sans-serif;
                    letter-spacing: 0;
                }

                .cli-badge.subtle {
                    color: #c9cdfb;
                    border-color: rgba(201, 205, 251, 0.24);
                    background: rgba(201, 205, 251, 0.08);
                }

                .cli-hint {
                    color: #8b91a7;
                    font-size: 0.78rem;
                    font-weight: 500;
                }

                .cli-options {
                    margin-top: 0.35rem;
                    display: grid;
                    gap: 0.2rem;
                }

                .cli-option {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    min-height: 1.75rem;
                    padding: 0.08rem 0.25rem;
                    color: #a7adbe;
                }

                .cli-option.selected {
                    color: #ffffff;
                    background: rgba(100, 108, 255, 0.16);
                    border-radius: 6px;
                }

                .cli-cursor {
                    width: 1ch;
                    color: #8ee6b0;
                    font-weight: 800;
                }

                .cli-radio {
                    color: #8ee6b0;
                    font-size: 0.78rem;
                }

                .cli-input {
                    display: inline-block;
                    margin-top: 0.45rem;
                    padding: 0.35rem 0.55rem;
                    border-radius: 6px;
                    color: #ffffff;
                    background: rgba(255,255,255,0.08);
                    border: 1px solid rgba(255,255,255,0.12);
                }

                @media (max-width: 640px) {
                    .cli-preview-body {
                        padding: 1rem;
                        font-size: 0.78rem;
                    }
                }
            `}</style>
        </div>
    );
}
