import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
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
              <h2 id={id} className="scroll-mt-20" {...props}>
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
              <h3 id={id} className="scroll-mt-20" {...props}>
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
              <h4 id={id} className="scroll-mt-20" {...props}>
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
              <h5 id={id} className="scroll-mt-20" {...props}>
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
              <h6 id={id} className="scroll-mt-20" {...props}>
                {children}
              </h6>
            )
          },
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "")
            return !inline && match ? (
              <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" className="rounded-lg" {...props}>
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
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
