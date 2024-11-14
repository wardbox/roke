import React, { useState, useEffect } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '../../lib/utils'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
import { Button } from './button'

interface CodeBlockProps {
  language?: string
  code: string
  className?: string
  variant?: 'default' | 'compact'
}

export function CodeBlock({ 
  language = 'bash', 
  code, 
  className,
  variant = 'default' 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    Prism.highlightAll()
  }, [code])

  const onCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
  }

  return (
    <div className={cn(
      "relative rounded-lg bg-muted overflow-hidden",
      "border border-border",
      variant === 'compact' && "text-sm",
      className
    )}>
      <div className={cn(
        "flex items-center justify-between bg-accent",
        variant === 'default' ? "px-4 py-2" : "px-2 py-1"
      )}>
        <span className="text-xs text-muted-foreground">
          {language}
        </span>
        <Button
          onClick={onCopy}
          variant="ghost"
          size="icon"
          aria-label="Copy code"
          className={cn(
            "rounded-md hover:bg-muted transition-colors",
            variant === 'default' ? "p-1" : "p-0.5"
          )}
        >
          {copied ? (
            <Check className="h-3 w-3 text-green-500" />
          ) : (
            <Copy className="h-3 w-3 text-muted-foreground" />
          )}
        </Button>
      </div>
      <pre className={cn(
        "overflow-x-auto",
        variant === 'default' ? "p-4" : "p-2"
      )}>
        <code className={`language-${language} ${variant === 'compact' ? "text-xs" : "text-sm"}`}>
          {code}
        </code>
      </pre>
    </div>
  )
} 
