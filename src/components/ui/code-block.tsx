import React, { useState, useEffect } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '../../lib/utils'
import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'
import typescript from 'highlight.js/lib/languages/typescript'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/base16/gruvbox-dark-medium.css'
import { Button } from './button'

interface CodeBlockProps {
  language?: string
  code: string
  className?: string
  variant?: 'default' | 'compact'
}

// Register languages
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('json', json)
export function CodeBlock({
  language = 'bash',
  code,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    hljs.highlightAll()
  }, [code, language])

  const onCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
  }

  return (
    <div className={cn(
      "relative rounded-lg bg-muted overflow-hidden",
      "border border-border",
      className
    )}>
      <div className={cn(
        "flex items-center justify-between bg-accent",
      )}>
        <span className="text-xs text-muted-foreground font-mono px-4">
          {language}
        </span>
        <Button
          onClick={onCopy}
          variant="ghost"
          size="icon"
          aria-label="Copy code"
          className="rounded-md hover:bg-muted transition-colors px-4"
        >
          {copied ? (
            <Check size={16} className="text-success" />
          ) : (
            <Copy size={16} className="text-muted-foreground" />
          )}
        </Button>
      </div>
      <pre className="overflow-x-auto">
        <code
          className={`language-${language}`}
        >
          {code}
        </code>
      </pre>
    </div >
  )
} 
