import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import * as animations from '../motion/transitionPresets'
import { useMotion } from './motion-provider'
import { Button } from '../client/components/ui/button'
import { CodeBlock } from '../client/components/ui/code-block'
import { ModeToggle } from '../client/components/mode-toggle'
import TypingAnimation from './components/typing-animation'
import { ArrowsClockwise, Spinner } from '@phosphor-icons/react'

function ReplayButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant='outline'
      size='sm'
      onClick={onClick}
      className='absolute right-2 top-2'
    >
      <ArrowsClockwise size={24} />
    </Button>
  )
}

function AnimationExample({
  title,
  description,
  code,
  children,
}: {
  title: string
  description: string
  code: string
  children: React.ReactNode
}) {
  const [key, setKey] = useState(0)

  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <h3 className='text-xl font-semibold'>{title}</h3>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </div>
      <div className='relative rounded-lg border bg-card p-6'>
        <ReplayButton onClick={() => setKey(prev => prev + 1)} />
        <div
          className='flex min-h-[100px] items-center justify-center'
          key={key}
        >
          <AnimatePresence mode='wait'>{children}</AnimatePresence>
        </div>
      </div>
      <CodeBlock language='typescript' code={code} />
    </div>
  )
}

export default function Motion() {
  const { transition, key } = useMotion()

  return (
    <motion.div
      key={key}
      variants={animations.staggerContainer}
      initial='hidden'
      animate='show'
      exit='exit'
      transition={transition}
      className='space-y-16'
    >
      {/* Introduction */}
      <motion.div variants={animations.fadeIn} className='mb-16 space-y-4'>
        <h1 className='medieval text-7xl sm:text-9xl'>Animation System</h1>
        <div className='max-w-4xl text-pretty leading-8'>
          <p className='text-pretty text-base text-muted-foreground sm:text-lg'>
            Our animation system is built on top of Motion, providing a
            consistent way to animate components across your app. You can use
            our pre-built transitions and variants, or create your own.
          </p>
          <div className='mt-6 space-y-4'>
            <p className='text-muted-foreground'>
              Configure your app-wide transition in Root.tsx:
            </p>
            <CodeBlock
              language='typescript'
              code={`// Root.tsx
import { MotionConfig } from 'motion/react'
import { transitions } from './components/ui/motion'

export default function Root() {
  return (
    <MotionConfig 
      reducedMotion='user'
      transition={transitions.snappy}
    >
      <ThemeProvider>
        <MotionProvider>
          <App />
          <TransitionPlayground />
        </MotionProvider>
      </ThemeProvider>
    </MotionConfig>
  )
}`}
            />
          </div>
        </div>
      </motion.div>

      {/* Transition Presets */}
      <motion.div variants={animations.fadeIn} className='mt-16 space-y-12'>
        <h2 className='text-3xl font-semibold'>Transition Presets</h2>
        <p className='mb-8 text-muted-foreground'>
          We provide several transition presets that you can use throughout your
          app:
        </p>
        <div className='grid gap-8 lg:grid-cols-2'>
          {Object.entries(animations.transitions).map(([name, transition]) => (
            <AnimationExample
              key={name}
              title={name.charAt(0).toUpperCase() + name.slice(1)}
              description={`A ${name} transition preset.`}
              code={`// Use in MotionConfig for app-wide default
<MotionConfig transition={transitions.${name}}>
  <App />
</MotionConfig>

// Or use directly in components
<motion.div transition={transitions.${name}} />`}
            >
              <motion.div
                className='cursor-pointer rounded-lg bg-muted p-8'
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={transition}
              >
                Click to replay
              </motion.div>
            </AnimationExample>
          ))}
        </div>
      </motion.div>

      {/* Basic Transitions */}
      <div className='space-y-12'>
        <h2 className='text-3xl font-semibold'>Basic Transitions</h2>
        <div className='grid gap-8 lg:grid-cols-2'>
          <AnimationExample
            title='Fade In'
            description='A simple fade in animation.'
            code={`const fadeIn = ${JSON.stringify(animations.fadeIn, null, 2)}`}
          >
            <motion.div
              variants={animations.fadeIn}
              initial='initial'
              animate='animate'
              exit='exit'
              className='rounded-lg bg-muted p-8'
            >
              Fade In Content
            </motion.div>
          </AnimationExample>

          <AnimationExample
            title='Slide In Up'
            description='Content that slides up while fading in.'
            code={`const slideInUp = ${JSON.stringify(animations.slideInUp, null, 2)}`}
          >
            <motion.div
              variants={animations.slideInUp}
              initial='initial'
              animate='animate'
              exit='exit'
              className='rounded-lg bg-muted p-8'
            >
              Slide Up Content
            </motion.div>
          </AnimationExample>
        </div>
      </div>

      {/* List Animations */}
      <motion.div variants={animations.fadeIn} className='mt-16 space-y-12'>
        <h2 className='text-3xl font-semibold'>List Animations</h2>
        <AnimationExample
          title='Staggered List'
          description='List items that animate in sequence.'
          code={`const staggerContainer = ${JSON.stringify(animations.staggerContainer, null, 2)}
const staggerItem = ${JSON.stringify(animations.staggerItem, null, 2)}`}
        >
          <motion.ol
            variants={animations.staggerContainer}
            initial='hidden'
            whileInView='show'
            className='w-full space-y-2'
          >
            {[1, 2, 3].map(item => (
              <motion.li
                key={item}
                variants={animations.staggerItem}
                className='rounded-lg bg-muted p-4'
              >
                List Item {item}
              </motion.li>
            ))}
          </motion.ol>
        </AnimationExample>
      </motion.div>

      {/* Theme Toggle */}
      <motion.div variants={animations.fadeIn} className='mt-16 space-y-12'>
        <h2 className='text-3xl font-semibold'>Theme Toggle</h2>
        <AnimationExample
          title='Theme Switch Animation'
          description='Smooth transition between light and dark mode icons.'
          code={`const darkMode = ${JSON.stringify(animations.darkMode, null, 2)}
const lightMode = ${JSON.stringify(animations.lightMode, null, 2)}`}
        >
          <ModeToggle iconSize='xl' />
        </AnimationExample>
      </motion.div>

      {/* Hover Effects */}
      <motion.div variants={animations.fadeIn} className='mt-16 space-y-12'>
        <h2 className='text-3xl font-semibold'>Hover Effects</h2>
        <div className='grid gap-8 lg:grid-cols-2'>
          <AnimationExample
            title='Scale'
            description='Simple scale effect on hover and tap.'
            code={`const hoverScale = ${JSON.stringify(animations.hoverScale, null, 2)}`}
          >
            <motion.div
              className='cursor-pointer select-none rounded-lg bg-muted p-8'
              variants={animations.hoverScale}
              whileHover='whileHover'
              whileTap='whileTap'
            >
              Hover Me
            </motion.div>
          </AnimationExample>

          <AnimationExample
            title='Tilt'
            description='Playful tilt animation on hover.'
            code={`const hoverTilt = ${JSON.stringify(animations.hoverTilt, null, 2)}`}
          >
            <motion.div
              className='cursor-pointer select-none rounded-lg bg-muted p-8'
              whileHover='whileHover'
              variants={animations.hoverTilt}
            >
              Hover to Tilt
            </motion.div>
          </AnimationExample>
        </div>
      </motion.div>

      {/* Loading Spinner */}
      <motion.div variants={animations.fadeIn} className='mt-16 space-y-12'>
        <h2 className='text-3xl font-semibold'>Loading Animations</h2>
        <AnimationExample
          title='Spinner'
          description='Smooth spinning animation that slows to stop.'
          code={`const spinner = ${JSON.stringify(animations.spinner, null, 2)}`}
        >
          <motion.div variants={animations.spinner} animate='animate'>
            <Spinner size={64} weight='bold' />
          </motion.div>
        </AnimationExample>
      </motion.div>

      {/* Text Animation */}
      <motion.div variants={animations.fadeIn} className='mt-16 space-y-12'>
        <h2 className='text-3xl font-semibold'>Text Animation</h2>
        <AnimationExample
          title='Letter by Letter'
          description='Reveals text one character at a time.'
          code={`const textContainer = ${JSON.stringify(animations.textContainer, null, 2)}
const textChild = ${JSON.stringify(animations.textChild, null, 2)}`}
        >
          <TypingAnimation
            texts={[
              "Hello! I'm a web page typing to you!",
              "I hope you're having a great day!",
              'Da boi prevails.',
            ]}
            typingSpeed={{
              min: Math.random() * (0.09 - 0.05) + 0.05,
              max: Math.random() * (0.09 - 0.05) + 0.09,
            }}
            pauseBetweenTexts={Math.random() * (2 - 1) + 1}
            className='text-4xl font-bold'
          />
        </AnimationExample>
      </motion.div>

      {/* Development Tools */}
      <motion.div variants={animations.fadeIn} className='mt-16 space-y-12'>
        <h2 className='text-3xl font-semibold'>Development Tools</h2>
        <p className='mb-8 text-muted-foreground'>
          The Transition Playground is available in development mode to help you
          find the perfect animation values:
        </p>
        <CodeBlock
          language='typescript'
          code={`// Only show playground in development
{process.env.NODE_ENV === 'development' && <TransitionPlayground />}

// For production, remove the playground and use your configured transitions
<MotionConfig transition={transitions.snappy}>
  <MotionProvider>
    <App />
  </MotionProvider>
</MotionConfig>`}
        />
      </motion.div>
    </motion.div>
  )
}
