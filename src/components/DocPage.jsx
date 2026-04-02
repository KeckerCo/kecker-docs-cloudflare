import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import './DocPage.css'

// Static imports — Vite bundles these reliably in production
import homeRaw from '../content/home.md?raw'
import privacyRaw from '../content/privacy.md?raw'

const contentMap = {
  home: homeRaw,
  privacy: privacyRaw,
}

function preprocessMarkdown(content) {
  return content.replace(
    /:::info\n([\s\S]*?):::/g,
    (_, body) => `<div class="callout callout--info">${body.trim()}</div>`
  ).replace(
    /:::warning\n([\s\S]*?):::/g,
    (_, body) => `<div class="callout callout--warning">${body.trim()}</div>`
  ).replace(
    /:::tip\n([\s\S]*?):::/g,
    (_, body) => `<div class="callout callout--tip">${body.trim()}</div>`
  )
}

export default function DocPage({ slug }) {
  const raw = contentMap[slug]
  if (!raw) return <div className="doc-error">Page not found.</div>

  const content = preprocessMarkdown(raw)

  return (
    <article className="doc-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children }) => <h1 className="doc-h1">{children}</h1>,
          h2: ({ children }) => <h2 className="doc-h2">{children}</h2>,
          h3: ({ children }) => <h3 className="doc-h3">{children}</h3>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="doc-link"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
          // react-markdown v10: pre wraps code blocks, code handles inline
          pre: ({ children }) => <pre className="doc-pre">{children}</pre>,
          code: ({ children, className }) => {
            const isBlock = className?.startsWith('language-')
            return isBlock
              ? <code className={`doc-code-block ${className ?? ''}`}>{children}</code>
              : <code className="doc-code-inline">{children}</code>
          },
          blockquote: ({ children }) => (
            <blockquote className="doc-blockquote">{children}</blockquote>
          ),
        }}
      />
    </article>
  )
}
