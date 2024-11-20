import { motion } from 'motion/react'
import { fadeIn } from './motion/transitionPresets'
import { Button } from './client/components/ui/button'
import { Link } from 'wasp/client/router'
import { ArrowLeft, Sparkle } from '@phosphor-icons/react'

export default function NotFound() {
  return (
    <motion.div
      variants={fadeIn}
      initial='initial'
      animate='animate'
      className='flex flex-col items-center justify-center gap-8 py-32 text-center'
    >
      <div className='relative'>
        <h1 className='medieval text-9xl'>404</h1>
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className='absolute -right-12 -top-4'
        >
          <Sparkle size={32} className='text-brand-accent' weight='fill' />
        </motion.div>
      </div>
      <p className='text-2xl font-medium'>By Ged&apos;s beard!</p>
      <p className='max-w-md text-muted-foreground'>
        Looks like this page got lost in the Ninety Isles. Perhaps it summoned
        its own shadow, or maybe it&apos;s just locked up in the Isolate Tower.
        Who knows? But it ain&apos;t here!
      </p>
      <Link to='/'>
        <Button variant='outline' className='gap-2'>
          <ArrowLeft size={16} />
          Return to the mortal realm
        </Button>
      </Link>
    </motion.div>
  )
}
