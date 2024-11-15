import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from 'motion/react'
import { ArrowUp } from '@phosphor-icons/react'
import { Button } from './button'
import { scrollToTop as scrollToTopVariant } from './motion'
import { useState } from 'react'

export function ScrollToTop() {
  const { scrollY } = useScroll()
  const [isVisible, setIsVisible] = useState(false)

  useMotionValueEvent(scrollY, 'change', latest => {
    if (latest > 200) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className='z-100 fixed bottom-24 right-6 hidden md:block'
          variants={scrollToTopVariant}
          initial='initial'
          animate='animate'
          exit='exit'
        >
          <Button
            variant='outline'
            size='icon'
            iconSize='lg'
            onClick={scrollToTop}
            className='border-muted-foreground/20 shadow-lg transition-colors hover:border-accent hover:bg-accent'
          >
            <ArrowUp />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
