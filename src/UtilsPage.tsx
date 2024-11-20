import { useState } from 'react'
import type { Icon } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { fadeIn, staggerContainer } from './motion/transitionPresets'
import { Input } from './client/components/ui/input'
import { Button } from './client/components/ui/button'
import { CodeBlock } from './client/components/ui/code-block'
import {
  Calendar,
  Timer,
  ClipboardText,
  Database,
  Hash,
  WarningCircle,
  Link,
  TextT,
  Check,
  X,
  Hourglass,
  LinkSimple,
} from '@phosphor-icons/react'
import {
  formatDate,
  timeSince,
  humanizeMs,
  generateSlug,
  copyToClipboard,
  storage,
  getErrorMessage,
  extractInitials,
  formatCompactNumber,
} from './lib/utils'

type NavItem = {
  id: string
  label: string
  icon: Icon
  children?: Array<{
    id: string
    label: string
    icon: Icon
  }>
}

const SectionHeader = ({
  icon: Icon,
  title,
  id,
}: {
  icon: Icon
  title: string
  id: string
}) => (
  <div className='group flex items-center gap-2'>
    <Icon size={24} />
    <h2 className='text-2xl font-semibold'>{title}</h2>
    <a
      href={`#${id}`}
      className='opacity-0 transition-opacity group-hover:opacity-100'
    >
      <Link className='h-4 w-4' />
    </a>
  </div>
)

export default function Utils() {
  const [copyStatus, setCopyStatus] = useState('')

  const navItems: NavItem[] = [
    // Date & Time Section
    {
      id: 'date-time',
      label: 'Date & Time',
      icon: Calendar,
      children: [
        { id: 'date', label: 'Date Formatting', icon: Calendar },
        { id: 'timeSince', label: 'Time Since', icon: Hourglass },
        { id: 'humanize', label: 'Humanize Time', icon: Timer },
      ],
    },
    // Text Section
    {
      id: 'text',
      label: 'Text',
      icon: TextT,
      children: [
        { id: 'slug', label: 'Slug Generation', icon: LinkSimple },
        { id: 'initials', label: 'Extract Initials', icon: TextT },
      ],
    },
    // Numbers Section
    {
      id: 'numbers',
      label: 'Numbers',
      icon: Hash,
      children: [{ id: 'compact', label: 'Compact Numbers', icon: Hash }],
    },
    // Browser APIs
    {
      id: 'browser',
      label: 'Browser APIs',
      icon: Database,
      children: [
        { id: 'clipboard', label: 'Clipboard', icon: ClipboardText },
        { id: 'storage', label: 'LocalStorage', icon: Database },
      ],
    },
    // Utilities
    {
      id: 'utils',
      label: 'Utilities',
      icon: WarningCircle,
      children: [{ id: 'error', label: 'Error Handling', icon: WarningCircle }],
    },
  ]

  return (
    <div className='relative'>
      <div className='fixed left-[max(0px,calc(50%-45rem))] top-24 hidden w-64 xl:block'>
        <nav className='space-y-1'>
          {navItems.map(section => (
            <div key={section.id} className='space-y-1'>
              <div className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground'>
                <section.icon className='h-4 w-4' />
                {section.label}
              </div>
              <div className='ml-4 space-y-1'>
                {section.children?.map(item => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className='flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground'
                  >
                    <item.icon className='h-4 w-4' />
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <motion.div
        variants={staggerContainer}
        initial='initial'
        animate='animate'
        className='xl:pl-64'
      >
        <motion.div
          variants={fadeIn}
          transition={{ duration: 0.4 }}
          className='mb-16 space-y-4'
        >
          <h1 className='medieval text-7xl sm:text-9xl'>Utility Functions</h1>
          <p className='max-w-2xl text-lg text-muted-foreground'>
            A collection of commonly used utility functions for formatting,
            validation, and other operations. These utilities are designed to be
            type-safe and respect user preferences.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 gap-12'>
          <motion.div variants={fadeIn} className='space-y-12'>
            {/* Date & Time Section */}
            <div id='date-time' className='space-y-8'>
              <h2 className='text-3xl font-bold tracking-tight'>Date & Time</h2>

              <section id='date' className='space-y-4'>
                <SectionHeader
                  icon={Calendar}
                  title='Date Formatting'
                  id='date'
                />
                <div className='space-y-2 rounded-lg border p-4'>
                  <p>Standard format: {formatDate(new Date())}</p>
                  <p>Custom format: {formatDate(new Date(), 'PP')}</p>
                </div>
                <CodeBlock
                  language='typescript'
                  code={`// Basic usage
formatDate(new Date()) // Output: "January 1, 2024"

// With custom format string
formatDate(new Date(), 'PP') // Output: "Jan 1, 2024"`}
                />
              </section>

              <section id='timeSince' className='space-y-4'>
                <SectionHeader
                  icon={Hourglass}
                  title='Time Since'
                  id='timeSince'
                />
                <div className='space-y-2 rounded-lg border p-4'>
                  <p>1 hour ago: {timeSince(new Date(Date.now() - 3600000))}</p>
                  <p>1 day ago: {timeSince(new Date(Date.now() - 86400000))}</p>
                </div>
                <CodeBlock
                  language='typescript'
                  code={`// Shows relative time with "ago" suffix
timeSince(new Date('2024-01-01')) // e.g., "2 months ago"
timeSince(new Date()) // "just now"`}
                />
              </section>

              <section id='humanize' className='space-y-4'>
                <SectionHeader
                  icon={Timer}
                  title='Humanize Time'
                  id='humanize'
                />
                <div className='space-y-2 rounded-lg border p-4'>
                  <p>1 minute: {humanizeMs(60000)}</p>
                  <p>2.5 hours: {humanizeMs(9000000)}</p>
                </div>
                <CodeBlock
                  language='typescript'
                  code={`humanizeMs(60000) // "1 minute"
humanizeMs(9000000) // "2.5 hours"`}
                />
              </section>
            </div>

            {/* Text Section */}
            <div id='text' className='space-y-8'>
              <h2 className='text-3xl font-bold tracking-tight'>Text</h2>

              <section id='slug' className='space-y-4'>
                <SectionHeader icon={Hash} title='Slug Generation' id='slug' />
                <div className='space-y-2 rounded-lg border p-4'>
                  <p>Original: Hello World!</p>
                  <p>Slug: {generateSlug('Hello World!')}</p>
                </div>
                <CodeBlock
                  language='typescript'
                  code={`generateSlug("Hello World!") // "hello-world"
generateSlug("This & That") // "this-and-that"`}
                />
              </section>

              <section id='initials' className='space-y-4'>
                <SectionHeader
                  icon={TextT}
                  title='Extract Initials'
                  id='initials'
                />
                <div className='space-y-2 rounded-lg border p-4'>
                  <p>Full name: John Doe</p>
                  <p>Initials: {extractInitials('John Doe')}</p>
                </div>
                <CodeBlock
                  language='typescript'
                  code={`extractInitials("John Doe") // "JD"
extractInitials("John Middle Doe") // "JM"`}
                />
              </section>
            </div>

            {/* Numbers Section */}
            <div id='numbers' className='space-y-8'>
              <h2 className='text-3xl font-bold tracking-tight'>Numbers</h2>

              <section id='compact' className='space-y-4'>
                <SectionHeader
                  icon={Hash}
                  title='Number Formatting'
                  id='compact'
                />
                <div className='space-y-2 rounded-lg border p-4'>
                  <p>1234567: {formatCompactNumber(1234567)}</p>
                  <p>987654: {formatCompactNumber(987654)}</p>
                </div>
                <CodeBlock
                  language='typescript'
                  code={`formatCompactNumber(1234567) // "1.2M"
formatCompactNumber(987654) // "988K"`}
                />
              </section>
            </div>

            {/* Browser APIs Section */}
            <div id='browser' className='space-y-8'>
              <h2 className='text-3xl font-bold tracking-tight'>
                Browser APIs
              </h2>

              <section id='clipboard' className='space-y-4'>
                <SectionHeader
                  icon={ClipboardText}
                  title='Clipboard'
                  id='clipboard'
                />
                <div className='space-y-4 rounded-lg border p-4'>
                  <div className='flex items-center gap-2'>
                    <Button
                      onClick={async () => {
                        const success = await copyToClipboard(
                          'Hello from clipboard!',
                        )
                        setCopyStatus(success ? 'Copied!' : 'Failed to copy')
                        setTimeout(() => setCopyStatus(''), 2000)
                      }}
                    >
                      Copy Text
                    </Button>
                    {copyStatus && (
                      <span className='ml-2 flex items-center gap-1'>
                        {copyStatus === 'Copied!' ? (
                          <Check className='h-4 w-4 text-green-500' />
                        ) : (
                          <X className='h-4 w-4 text-red-500' />
                        )}
                        {copyStatus}
                      </span>
                    )}
                  </div>

                  <div className='space-y-2'>
                    <p className='text-sm text-muted-foreground'>
                      Test it out! Paste here:
                    </p>
                    <Input
                      type='text'
                      placeholder='Paste the copied text here...'
                      className='max-w-sm'
                    />
                  </div>
                </div>
                <CodeBlock
                  language='typescript'
                  code={`const handleCopy = async () => {
                    const success = await copyToClipboard('Text to copy')
                    if (success) {
                      console.log('Copied successfully!')
                    }
                  }`}
                />
              </section>

              <section id='storage' className='space-y-4'>
                <SectionHeader
                  icon={Database}
                  title='LocalStorage'
                  id='storage'
                />
                <div className='space-y-2 rounded-lg border p-4'>
                  <p>Stored value: {storage.get('demo-key')}</p>
                </div>
                <CodeBlock
                  language='typescript'
                  code={`// Store data
storage.set('user-preferences', { theme: 'dark', fontSize: 14 })

// Retrieve data
const preferences = storage.get<{ theme: string, fontSize: number }>('user-preferences')

// Remove data
storage.remove('user-preferences')`}
                />
              </section>
            </div>

            {/* Utilities Section */}
            <div id='utils' className='space-y-8'>
              <h2 className='text-3xl font-bold tracking-tight'>Utilities</h2>

              <section id='error' className='space-y-4'>
                <SectionHeader
                  icon={WarningCircle}
                  title='Error Handling'
                  id='error'
                />
                <div className='space-y-2 rounded-lg border p-4'>
                  <p>
                    Error message: {getErrorMessage(new Error('Test error'))}
                  </p>
                  <p>Unknown error: {getErrorMessage({})}</p>
                </div>
                <CodeBlock
                  language='typescript'
                  code={`try {
                    throw new Error('Something went wrong')
                  } catch (error) {
                    const message = getErrorMessage(error) // "Something went wrong"
                    console.error(message)
                  }`}
                />
              </section>
            </div>
          </motion.div>
        </div>

        <motion.div variants={fadeIn} className='mt-16 space-y-4'>
          <h2 className='text-2xl font-semibold tracking-tight'>
            Usage Example
          </h2>
          <p className='text-sm text-muted-foreground'>
            Import any utility function from the utils file and use it in your
            components:
          </p>
          <CodeBlock
            language='typescript'
            code={`import { timeSince, generateSlug, formatCompactNumber } from '../lib/utils'

export function MyComponent() {
  return (
    <div>
      <p>Posted {timeSince(post.createdAt)}</p>
      <p>Slug: {generateSlug(title)}</p>
      <p>Views: {formatCompactNumber(viewCount)}</p>
    </div>
  )
}`}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
