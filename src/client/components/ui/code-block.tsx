import React, { useState, useEffect } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '../../../lib/utils'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
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
}: CodeBlockProps) {
  useEffect(() => {
    Prism.highlightAll()
  }, [code])

  const [copied, setCopied] = useState(false)

  const onCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg bg-muted',
        'border border-border',
        className,
      )}
    >
      <div className={cn('flex items-center justify-between bg-accent')}>
        <span className='px-4 font-mono text-xs text-muted-foreground'>
          {language}
        </span>
        <Button
          onClick={onCopy}
          variant='ghost'
          size='icon'
          aria-label='Copy code'
          className='rounded-md px-4 transition-colors hover:bg-muted'
        >
          {copied ? (
            <Check size={16} className='text-success' />
          ) : (
            <Copy size={16} className='text-muted-foreground' />
          )}
        </Button>
      </div>
      <pre className='overflow-x-auto'>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  )
}
