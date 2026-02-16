import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from 'motion/react'
import { ArrowUpIcon } from '@phosphor-icons/react'
import { Button } from '../client/components/ui/button'
import { scrollToTop } from '../motion/transitionPresets'
import { useState } from 'react'
import { useMotion } from '../motion/motion-provider'

export function ScrollToTop() {
  const { scrollY } = useScroll()
  const [isVisible, setIsVisible] = useState(false)
  const { transition } = useMotion()

  useMotionValueEvent(scrollY, 'change', latest => {
    if (latest > 200) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  })

  const scrollToTopAction = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className='fixed right-6 bottom-24 z-50 hidden md:block'
          variants={scrollToTop}
          initial='initial'
          animate='animate'
          exit='exit'
          transition={transition}
        >
          <Button
            variant='outline'
            size='icon'
            onClick={scrollToTopAction}
            className='border-muted-foreground/20 hover:border-accent hover:bg-accent shadow-lg transition-colors'
          >
            <ArrowUpIcon />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
