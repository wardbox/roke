import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from 'motion/react'
import { ArrowUp } from '@phosphor-icons/react'
import { Button } from '../../client/components/ui/button'
import { scrollToTop } from '../../motion/transitionPresets'
import { useState } from 'react'
import { useMotion } from '../../motion/motion-provider'

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
          className='fixed bottom-24 right-6 z-50 hidden md:block'
          variants={scrollToTop}
          initial='initial'
          animate='animate'
          exit='exit'
          transition={transition}
        >
          <Button
            variant='outline'
            size='icon'
            iconSize='lg'
            onClick={scrollToTopAction}
            className='border-muted-foreground/20 shadow-lg transition-colors hover:border-accent hover:bg-accent'
          >
            <ArrowUp />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
