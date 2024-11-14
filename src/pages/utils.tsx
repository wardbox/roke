import { useState, useEffect } from 'react'
import {
  Calendar,
  CurrencyDollar,
  TextT,
  Timer,
  ClipboardText,
  Database,
  Hash,
  EnvelopeSimple,
  WarningCircle,
  HourglassSimple,
  TextColumns,
  Check,
  X,
  Link
} from '@phosphor-icons/react'
import {
  formatDate,
  formatCurrency,
  truncateText,
  debounce,
  copyToClipboard,
  storage,
  generateRandomString,
  isValidEmail,
  getErrorMessage,
  sleep,
  pluralize
} from '../lib/utils'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { CodeBlock } from '../components/ui/code-block'
import { motion } from "motion/react"
import { fadeIn, staggerContainer } from "../components/ui/motion"

type NavItem = {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const SectionHeader = ({ icon: Icon, title, id }: { icon: React.ComponentType<{ className?: string }>, title: string, id: string }) => (
  <div className="flex items-center gap-2 group">
    <Icon className="h-6 w-6" />
    <h2 className="text-2xl font-semibold">{title}</h2>
    <a href={`#${id}`} className="opacity-0 group-hover:opacity-100 transition-opacity">
      <Link className="h-4 w-4" />
    </a>
  </div>
)

export default function UtilsDemo() {
  const [debouncedValue, setDebouncedValue] = useState('')
  const [copyStatus, setCopyStatus] = useState('')
  const [emailValid, setEmailValid] = useState<boolean>(false)

  const handleDebouncedInput = debounce((value: string) => {
    setDebouncedValue(value)
  }, 500)

  useEffect(() => {
    storage.set('demo-key', 'Hello from localStorage!')
  }, [])

  const demonstrateSleep = async () => {
    const message = document.getElementById('sleep-message')
    if (message) {
      message.textContent = 'Starting...'
      await sleep(2000)
      message.textContent = 'Finished after 2 seconds!'
    }
  }

  const navItems: NavItem[] = [
    { id: 'date', label: 'Date Formatting', icon: Calendar },
    { id: 'currency', label: 'Currency Formatting', icon: CurrencyDollar },
    { id: 'truncate', label: 'Text Truncation', icon: TextT },
    { id: 'debounce', label: 'Debounce', icon: Timer },
    { id: 'clipboard', label: 'Clipboard', icon: ClipboardText },
    { id: 'storage', label: 'LocalStorage', icon: Database },
    { id: 'random', label: 'Random String', icon: Hash },
    { id: 'email', label: 'Email Validation', icon: EnvelopeSimple },
    { id: 'error', label: 'Error Handling', icon: WarningCircle },
    { id: 'sleep', label: 'Sleep', icon: HourglassSimple },
    { id: 'pluralize', label: 'Pluralize', icon: TextColumns },
  ]

  return (
    <div className="relative flex justify-center">
      <div className="fixed left-[max(0px,calc(50%-45rem))] top-24 w-44 hidden xl:block">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </a>
            )
          })}
        </nav>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="max-w-5xl w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      >
        <motion.div
          variants={fadeIn}
          transition={{ duration: 0.4 }}
          className="space-y-4 mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Utility Functions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A collection of commonly used utility functions for formatting, validation, and other operations.
            These utilities are designed to be type-safe and respect user preferences.
          </p>
        </motion.div>

        <div className="grid gap-12 grid-cols-1 sm:grid-cols-1">
          <motion.div variants={fadeIn} className="space-y-12">
            <section id="date" className="space-y-4">
              <div className="space-y-2">
                <SectionHeader icon={Calendar} title="Date Formatting" id="date" />
                <p className="text-sm text-muted-foreground">
                  Format dates consistently across your application with localization support.
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card space-y-2">
                <p>Current date: {formatDate(new Date())}</p>
                <p>Custom format: {formatDate(new Date(), { 
                  year: '2-digit', 
                  month: 'short', 
                  day: 'numeric' 
                })}</p>
              </div>
              <CodeBlock
                language="typescript"
                code={`// Basic usage
formatDate(new Date()) // Output: "January 1, 2024"

// With custom options
formatDate(new Date(), { 
  year: '2-digit', 
  month: 'short', 
  day: 'numeric' 
}) // Output: "Jan 1, '24"`}
              />
            </section>
            <section id="currency" className="space-y-4">
              <SectionHeader icon={CurrencyDollar} title="Currency Formatting" id="currency" />
              <div className="border p-4 rounded-lg space-y-2">
                <p>USD: {formatCurrency(1234.56)}</p>
                <p>EUR: {formatCurrency(1234.56, 'EUR')}</p>
              </div>
              <CodeBlock
                language="typescript"
                code={`// Default USD formatting
formatCurrency(1234.56) // Output: "$1,234.56"

// Custom currency
formatCurrency(1234.56, 'EUR') // Output: "€1,234.56"`}
              />
            </section>
            <section id="truncate" className="space-y-4 truncate-section">
              <SectionHeader icon={TextT} title="Text Truncation" id="truncate" />
              
              <div className="border p-4 rounded-lg space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Using Tailwind (Recommended)</h3>
                  <p className="text-sm text-muted-foreground">
                    Truncation requires a container with a defined width. The text will truncate to fit this container.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Fixed width container:</p>
                    <div className="w-[200px] border border-dashed border-border p-2 rounded">
                      <p className="truncate">
                        This is a very long text that will be truncated using Tailwind's truncate class
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Max-width container:</p>
                    <div className="max-w-[200px] border border-dashed border-border p-2 rounded">
                      <p className="truncate">
                        This is a very long text that will be truncated using Tailwind's truncate class
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Responsive container (try resizing):</p>
                    <div className="w-1/2 border border-dashed border-border p-2 rounded">
                      <p className="truncate">
                        This is a very long text that will be truncated using Tailwind's truncate class
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Multi-line truncation:</p>
                    <div className="w-[200px] border border-dashed border-border p-2 rounded">
                      <p className="line-clamp-2">
                        This is a very long text that will span multiple lines and then be truncated after exactly two lines using Tailwind's line-clamp utility class.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Using Utility Function</h3>
                  <p className="text-sm text-muted-foreground">
                    Use the utility function when you need programmatic truncation or need the truncated result for computation
                  </p>
                  <div className="border border-dashed border-border p-2 rounded">
                    <p>Original: {"This is a very long text that should be truncated at some point"}</p>
                    <p>Truncated: {truncateText("This is a very long text that should be truncated at some point", 20)}</p>
                  </div>
                </div>
              </div>

              <CodeBlock
                language="typescript"
                code={`// Method 1: Fixed width container
<div className="w-[200px]">
  <p className="truncate">
    This is a very long text that will be truncated
  </p>
</div>

// Method 2: Max-width container
<div className="max-w-[200px]">
  <p className="truncate">
    This is a very long text that will be truncated
  </p>
</div>

// Method 3: Responsive container
<div className="w-1/2"> {/* or w-full, etc */}
  <p className="truncate">
    This is a very long text that will be truncated
  </p>
</div>

// Method 4: Multi-line truncation
<div className="w-[200px]">
  <p className="line-clamp-2">
    This text will be truncated after exactly two lines...
  </p>
</div>

// Method 5: Programmatic truncation
const longText = "This is a very long text..."
truncateText(longText, 20) // For when you need the truncated string`}
              />
              
              <div className="text-sm text-muted-foreground">
                <p className="font-medium">Key points about truncation:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>The parent container <strong>must</strong> have a defined width (fixed, max, or relative)</li>
                  <li>Use <code>truncate</code> for single-line truncation</li>
                  <li>Use <code>line-clamp-{'{n}'}</code> for multi-line truncation (1-6 lines)</li>
                  <li>The truncated element should be a block or inline-block element</li>
                  <li>Truncation only works when text would otherwise overflow its container</li>
                </ul>
              </div>
            </section>
            <section id="debounce" className="space-y-4">
              <SectionHeader icon={Timer} title="Debounce" id="debounce" />
              <div className="border p-4 rounded-lg space-y-2">
                <Input
                  type="text"
                  onChange={(e) => handleDebouncedInput(e.target.value)}
                  placeholder="Type something..."
                />
                <p className="mt-2">Debounced value: {debouncedValue}</p>
              </div>
              <CodeBlock
                language="typescript"
                code={`const handleSearch = debounce((searchTerm: string) => {
                  // This will only run 500ms after the last call
                  console.log('Searching for:', searchTerm)
                }, 500)

                // Usage in component
                <input onChange={(e) => handleSearch(e.target.value)} />`}
              />
            </section>
            <section id="clipboard" className="space-y-4">
              <SectionHeader icon={ClipboardText} title="Clipboard" id="clipboard" />
              <div className="border p-4 rounded-lg space-y-2">
                <Button
                  onClick={async () => {
                    const success = await copyToClipboard('Text copied to clipboard!')
                    setCopyStatus(success ? 'Copied!' : 'Failed to copy')
                    setTimeout(() => setCopyStatus(''), 2000)
                  }}
                >
                  Copy Text
                </Button>
                <div className="flex items-center gap-2">
                  {copyStatus && (
                    <span className="ml-2 flex items-center gap-1">
                      {copyStatus === 'Copied!' ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                      {copyStatus}
                    </span>
                  )}
                </div>
              </div>
              <CodeBlock
                language="typescript"
                code={`const handleCopy = async () => {
                  const success = await copyToClipboard('Text to copy')
                  if (success) {
                    console.log('Copied successfully!')
                  }
                }`}
              />
            </section>
          </motion.div>
          <motion.div variants={fadeIn} className="space-y-12">
            <section id="storage" className="space-y-4">
              <SectionHeader icon={Database} title="LocalStorage" id="storage" />
              <div className="border p-4 rounded-lg space-y-2">
                <p>Stored value: {storage.get('demo-key')}</p>
              </div>
              <CodeBlock
                language="typescript"
                code={`// Store data
storage.set('user-preferences', { theme: 'dark', fontSize: 14 })

// Retrieve data
const preferences = storage.get<{ theme: string, fontSize: number }>('user-preferences')

// Remove data
storage.remove('user-preferences')`}
              />
            </section>
            <section id="random" className="space-y-4">
              <SectionHeader icon={Hash} title="Random String" id="random" />
              <div className="border p-4 rounded-lg space-y-2">
                <p>Random string (8 chars): {generateRandomString()}</p>
                <p>Random string (12 chars): {generateRandomString(12)}</p>
              </div>
              <CodeBlock
                language="typescript"
                code={`// Default 8 characters
generateRandomString() // e.g., "a7b8c9d0"

// Custom length
generateRandomString(12) // e.g., "a7b8c9d0e1f2"`}
              />
            </section>
            <section id="email" className="space-y-4">
              <SectionHeader icon={EnvelopeSimple} title="Email Validation" id="email" />
              <div className="border p-4 rounded-lg space-y-2">
                <Input
                  type="email"
                  onChange={(e) => setEmailValid(isValidEmail(e.target.value))}
                  placeholder="Enter email to validate"
                />
                <p className="mt-2 flex items-center gap-1">
                  Is valid: {emailValid ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                </p>
              </div>
              <CodeBlock
                language="typescript"
                code={`// Validate email addresses
isValidEmail('user@example.com') // true
isValidEmail('invalid-email') // false
isValidEmail('user@domain') // false`}
              />
            </section>
            <section id="error" className="space-y-4">
              <SectionHeader icon={WarningCircle} title="Error Handling" id="error" />
              <div className="border p-4 rounded-lg space-y-2">
                <p>Error message: {getErrorMessage(new Error('Test error'))}</p>
                <p>Unknown error: {getErrorMessage({})}</p>
              </div>
              <CodeBlock
                language="typescript"
                code={`try {
                  throw new Error('Something went wrong')
                } catch (error) {
                  const message = getErrorMessage(error) // "Something went wrong"
                  console.error(message)
                }`}
              />
            </section>
            <section id="sleep" className="space-y-4">
              <SectionHeader icon={HourglassSimple} title="Sleep" id="sleep" />
              <div className="border p-4 rounded-lg space-y-2">
                <Button onClick={demonstrateSleep}>
                  Test Sleep
                </Button>
                <p id="sleep-message" className="mt-2"></p>
              </div>
              <CodeBlock
                language="typescript"
                code={`async function loadData() {
                  console.log('Starting...')
                  await sleep(2000) // Wait for 2 seconds
                  console.log('Finished!')
                }`}
              />
            </section>
            <section id="pluralize" className="space-y-4">
              <SectionHeader icon={TextColumns} title="Pluralize" id="pluralize" />
              <div className="border p-4 rounded-lg space-y-2">
                <p>{pluralize(1, 'item')}</p>
                <p>{pluralize(2, 'item')}</p>
                <p>{pluralize(3, 'box', 'boxes')}</p>
              </div>
              <CodeBlock
                language="typescript"
                code={`// Basic usage
pluralize(1, 'item') // "1 item"
pluralize(2, 'item') // "2 items"

// Custom plural form
pluralize(1, 'box', 'boxes') // "1 box"
pluralize(3, 'box', 'boxes') // "3 boxes"`}
              />
            </section>
          </motion.div>
        </div>
        <motion.div variants={fadeIn} className="mt-16 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Usage Example</h2>
          <p className="text-sm text-muted-foreground">
            Import any utility function from the utils file and use it in your components:
          </p>
          <CodeBlock 
            language="typescript" 
            code={`import { formatDate, formatCurrency, truncateText } from '../lib/utils'

export function MyComponent() {
  return (
    <div>
      <p>{formatDate(new Date())}</p>
      <p>{formatCurrency(99.99)}</p>
      <p>{truncateText("Long text...", 20)}</p>
    </div>
  )
}`} 
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
