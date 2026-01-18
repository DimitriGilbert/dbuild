'use client'

import React from 'react'
import ReactMarkdown from "react-markdown"
import hljs from 'highlight.js'
import { useEffect } from 'react'
import { Copy, Check } from 'lucide-react'
import bash from 'highlight.js/lib/languages/bash'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import php from 'highlight.js/lib/languages/php'
import xml from 'highlight.js/lib/languages/xml'
import json from 'highlight.js/lib/languages/json'
import ini from 'highlight.js/lib/languages/ini'

function CodeBlock({ children, language, className, ...props }: any) {
  const [copied, setCopied] = React.useState(false)
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(String(children))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <div className="relative group my-6">
      <div className="absolute top-3 right-3 text-xs font-mono 
        bg-primary/20 text-primary px-2 py-1 rounded-md 
        uppercase tracking-wide opacity-70 pointer-events-none">
        {language}
      </div>
      
      <pre className="hljs rounded-lg pt-8">
        <code className={className} {...props}>
          {String(children).replace(/\n$/, "")}
        </code>
      </pre>
      
      <button 
        type="button"
        className="absolute top-3 left-3 text-xs font-medium
          bg-muted/80 hover:bg-muted text-muted-foreground 
          hover:text-primary transition-all duration-200 
          opacity-0 group-hover:opacity-100 flex items-center gap-1.5 
          px-2 py-1 rounded-md backdrop-blur-sm"
        onClick={handleCopy}
      >
        {copied ? (
          <>
            <Check className="w-3 h-3" />
            <span>Copied</span>
          </>
        ) : (
          <>
            <Copy className="w-3 h-3" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  )
}

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  useEffect(() => {
    // Register additional languages
    hljs.registerLanguage('bash', bash)
    hljs.registerLanguage('javascript', javascript)
    hljs.registerLanguage('typescript', typescript)
    hljs.registerLanguage('php', php)
    hljs.registerLanguage('xml', xml)
    hljs.registerLanguage('html', xml)
    hljs.registerLanguage('json', json)
    hljs.registerLanguage('ini', ini)
    
    // Configure highlight.js
    hljs.configure({
      ignoreUnescapedHTML: true,
    })
    
    // Highlight all code blocks after component mounts
    hljs.highlightAll()
  }, [])

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
              <h1 
                id={id} 
                className="scroll-mt-20 text-4xl md:text-5xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent pb-3 mb-6 border-b-2 border-accent" 
                {...props}
              >
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
              <CodeBlock className={className} language={language} {...props}>
                {children}
              </CodeBlock>
            ) : (
              <code className="not-prose bg-muted/50 text-foreground 
                px-1.5 py-0.5 rounded-sm text-sm font-mono border 
                border-border" {...props}>
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
