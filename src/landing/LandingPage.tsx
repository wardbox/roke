import { Link } from 'wasp/client/router'
import { Button } from '../client/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../client/components/ui/card'
import {
  Lightning,
  ShieldCheck,
  CreditCard,
  Sparkle,
} from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import { useMotion } from '../motion/motion-provider'
import { staggerContainer, staggerItem } from '../motion/transitionPresets'

export default function Landing() {
  // useMotion provides the global transition settings and a key for re-renders
  const { transition, key } = useMotion()
  const reduceMotion = useReducedMotion()

  return (
    // Wrap the page in motion.div with staggerContainer for staggered children
    <motion.div
      key={key}
      variants={reduceMotion ? undefined : staggerContainer}
      initial={reduceMotion ? 'show' : 'hidden'}
      animate='show'
      exit={reduceMotion ? undefined : 'exit'}
      transition={reduceMotion ? { duration: 0 } : transition}
      className='flex flex-col gap-16 py-8 lg:gap-24 lg:py-16'
    >
      {/* Hero Section - Replace with your value proposition */}
      {/* Use motion.section with staggerItem variant for staggered animation */}
      <motion.section
        id='hero'
        variants={reduceMotion ? undefined : staggerItem}
        className='flex flex-col gap-6'
      >
        <h1 className='text-4xl font-bold tracking-tight lg:text-6xl'>
          {/* Replace with your app name */}
          Your App Name
        </h1>
        <p className='max-w-2xl text-lg text-muted-foreground lg:text-xl'>
          {/* Replace with your tagline */}A brief, compelling description of
          what your app does and why users should care. Keep it to one or two
          sentences.
        </p>
        <div className='flex flex-wrap gap-4'>
          <Button size='lg' asChild>
            <Link to='/signup'>Get Started</Link>
          </Button>
          <Button size='lg' variant='outline' asChild>
            <Link to='/login'>Sign In</Link>
          </Button>
        </div>
      </motion.section>

      {/* Features Section - Replace with your features */}
      <motion.section
        id='features'
        variants={reduceMotion ? undefined : staggerItem}
        className='flex flex-col gap-8'
      >
        <div className='flex flex-col gap-2'>
          <h2 className='text-2xl font-semibold tracking-tight lg:text-3xl'>
            {/* Replace with your section title */}
            Features
          </h2>
          <p className='text-muted-foreground'>
            {/* Replace with your section description */}
            Everything you need to build your next project.
          </p>
        </div>

        {/* Nested staggerContainer inherits animation state from parent */}
        <motion.div
          variants={reduceMotion ? undefined : staggerContainer}
          className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'
        >
          {/* Feature 1 - Replace icon, title, and description */}
          {/* Each card uses staggerItem variant */}
          <motion.div variants={reduceMotion ? undefined : staggerItem}>
            <Card>
              <CardHeader>
                <Lightning size={32} className='mb-2 text-primary' />
                <CardTitle>Feature One</CardTitle>
                <CardDescription>
                  Describe this feature and its benefit to users.
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Feature 2 */}
          <motion.div variants={reduceMotion ? undefined : staggerItem}>
            <Card>
              <CardHeader>
                <ShieldCheck size={32} className='mb-2 text-primary' />
                <CardTitle>Feature Two</CardTitle>
                <CardDescription>
                  Describe this feature and its benefit to users.
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Feature 3 */}
          <motion.div variants={reduceMotion ? undefined : staggerItem}>
            <Card>
              <CardHeader>
                <CreditCard size={32} className='mb-2 text-primary' />
                <CardTitle>Feature Three</CardTitle>
                <CardDescription>
                  Describe this feature and its benefit to users.
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Feature 4 */}
          <motion.div variants={reduceMotion ? undefined : staggerItem}>
            <Card>
              <CardHeader>
                <Sparkle size={32} className='mb-2 text-primary' />
                <CardTitle>Feature Four</CardTitle>
                <CardDescription>
                  Describe this feature and its benefit to users.
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* CTA Section - Final call to action */}
      <motion.section
        id='cta'
        variants={reduceMotion ? undefined : staggerItem}
        className='flex flex-col items-center gap-6 rounded-lg bg-muted/50 p-8 text-center lg:p-12'
      >
        <h2 className='text-2xl font-semibold tracking-tight lg:text-3xl'>
          {/* Replace with your CTA headline */}
          Ready to get started?
        </h2>
        <p className='max-w-xl text-muted-foreground'>
          {/* Replace with your CTA description */}
          Join thousands of users who are already building with our platform.
        </p>
        <Button size='lg' asChild>
          <Link to='/signup'>Create Your Account</Link>
        </Button>
      </motion.section>
    </motion.div>
  )
}
