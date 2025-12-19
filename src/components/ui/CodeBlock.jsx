import React, { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { Check, Copy } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function CodeBlock({ code, language = 'javascript', title }) {
    const [copied, setCopied] = useState(false);
    const { theme } = useTheme();

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ 
            margin: '2rem 0', 
            borderRadius: '12px', 
            overflow: 'hidden', 
            border: '1px solid var(--border-light)',
            background: 'var(--bg-subtle)'
        }}>
            {/* Optional Title Bar */}
            {title && (
                <div style={{
                    padding: '0.75rem 1rem',
                    borderBottom: '1px solid var(--border-light)',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    fontFamily: 'system-ui',
                    background: 'var(--bg-card)'
                }}>
                    {title}
                </div>
            )}

            <div style={{ position: 'relative' }}>
                <Highlight theme={theme === 'dark' ? themes.vsDark : themes.vsLight} code={code.trim()} language={language}>
                    {({ style, tokens, getLineProps, getTokenProps }) => (
                        <pre style={{ 
                            ...style, 
                            padding: '1.5rem', 
                            margin: 0, 
                            overflowX: 'auto', 
                            fontFamily: '"JetBrains Mono", monospace', 
                            fontSize: '0.9rem', 
                            lineHeight: '1.6',
                            background: 'transparent' /* Use container bg */
                        }}>
                            {tokens.map((line, i) => (
                                <div key={i} {...getLineProps({ line })}>
                                    {line.map((token, key) => (
                                        <span key={key} {...getTokenProps({ token })} />
                                    ))}
                                </div>
                            ))}
                        </pre>
                    )}
                </Highlight>
                
                <button 
                    onClick={copyToClipboard}
                    style={{
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.75rem',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '6px',
                        padding: '0.4rem',
                        color: copied ? '#42d392' : 'var(--text-muted)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    title="Copy code"
                >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
            </div>
        </div>
    );
}