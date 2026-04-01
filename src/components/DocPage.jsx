import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import './DocPage.css'

// Custom renderer for callout blocks (:::info ... :::)
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
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    import(`../content/${slug}.md?raw`)
      .then((mod) => {
        setContent(preprocessMarkdown(mod.default))
        setLoading(false)
      })
      .catch(() => {
        setError('Page not found.')
        setLoading(false)
      })
  }, [slug])

  if (loading) return <div className="doc-loading">Loading…</div>
  if (error) return <div className="doc-error">{error}</div>

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
            <a href={href} className="doc-link" target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}>
              {children}
            </a>
          ),
          code: ({ inline, children, ...props }) =>
            inline ? (
              <code className="doc-code-inline" {...props}>{children}</code>
            ) : (
              <pre className="doc-pre"><code className="doc-code-block" {...props}>{children}</code></pre>
            ),
          blockquote: ({ children }) => (
            <blockquote className="doc-blockquote">{children}</blockquote>
          ),
        }}
      />
    </article>
  )
}
