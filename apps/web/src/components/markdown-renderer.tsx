'use client'

import ReactMarkdown from "react-markdown"
import hljs from 'highlight.js'
import { useEffect } from 'react'

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  useEffect(() => {
    // Configure highlight.js
    hljs.configure({
      ignoreUnescapedHTML: true,
    })
    
    // Highlight all code blocks after component mounts
    hljs.highlightAll()
  }, [content])

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <ReactMarkdown
        components={{
          h1: ({ children, ...props }) => {
            const id =
              children
                ?.toString()
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "") || ""
            return (
              <h1 id={id} className="scroll-mt-20" {...props}>
                {children}
              </h1>
            )
          },
          h2: ({ children, ...props }) => {
            const id =
              children
                ?.toString()
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "") || ""
            return (
              <h2 id={id} className="scroll-mt-20 text-3xl font-bold text-primary border-b-2 border-accent pb-2 mb-4" {...props}>
                {children}
              </h2>
            )
          },
          h3: ({ children, ...props }) => {
            const id =
              children
                ?.toString()
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "") || ""
            return (
              <h3 id={id} className="scroll-mt-20 text-2xl font-bold text-accent border-b-2 border-primary pb-2 mb-3" {...props}>
                {children}
              </h3>
            )
          },
          h4: ({ children, ...props }) => {
            const id =
              children
                ?.toString()
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "") || ""
            return (
              <h4 id={id} className="scroll-mt-20 text-xl font-semibold text-primary border-b border-accent pb-1 mb-3" {...props}>
                {children}
              </h4>
            )
          },
          h5: ({ children, ...props }) => {
            const id =
              children
                ?.toString()
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "") || ""
            return (
              <h5 id={id} className="scroll-mt-20 text-lg font-semibold text-accent border-b border-primary pb-1 mb-2" {...props}>
                {children}
              </h5>
            )
          },
          h6: ({ children, ...props }) => {
            const id =
              children
                ?.toString()
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "") || ""
            return (
              <h6 id={id} className="scroll-mt-20 text-base font-medium text-primary border-b border-accent pb-1 mb-2" {...props}>
                {children}
              </h6>
            )
          },
          p: ({ children, ...props }) => (
            <p className="mb-4" {...props}>
              {children}
            </p>
          ),
          code: ({ node, inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || "")
            const language = match ? match[1] : ''
            
            return !inline && match ? (
              <pre className="hljs">
                <code className={`language-${language}`} {...props}>
                  {String(children).replace(/\n$/, "")}
                </code>
              </pre>
            ) : (
              <code className="not-prose" {...props}>
                {children}
              </code>
            )
          },
          blockquote: ({ children, ...props }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground" {...props}>
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
