import { Link } from 'wasp/client/router'
import { Button } from '../client/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../client/components/ui/card'
import {
  LightningIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  SparkleIcon,
  type Icon,
} from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { useMotion } from '../motion/motion-provider'
import { staggerContainer, staggerItem } from '../motion/transitionPresets'

const features: { icon: Icon; title: string; description: string }[] = [
  {
    icon: LightningIcon,
    title: 'Feature One',
    description: 'Describe this feature and its benefit to users.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Feature Two',
    description: 'Describe this feature and its benefit to users.',
  },
  {
    icon: CreditCardIcon,
    title: 'Feature Three',
    description: 'Describe this feature and its benefit to users.',
  },
  {
    icon: SparkleIcon,
    title: 'Feature Four',
    description: 'Describe this feature and its benefit to users.',
  },
]

export default function Landing() {
  const { transition, key } = useMotion()

  return (
    <motion.div
      key={key}
      variants={staggerContainer}
      initial='hidden'
      animate='show'
      exit='exit'
      transition={transition}
      className='flex flex-col gap-16 py-8 lg:gap-24 lg:py-16'
    >
      {/* Hero Section - Replace with your value proposition */}
      {/* Use motion.section with staggerItem variant for staggered animation */}
      <motion.section
        id='hero'
        variants={staggerItem}
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
        variants={staggerItem}
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
          variants={staggerContainer}
          className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'
        >
          {features.map(({ icon: Icon, title, description }) => (
            <motion.div key={title} variants={staggerItem}>
              <Card>
                <CardHeader>
                  <Icon size={32} className='mb-2 text-primary' />
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* CTA Section - Final call to action */}
      <motion.section
        id='cta'
        variants={staggerItem}
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
