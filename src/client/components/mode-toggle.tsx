import { MoonStars, Sun } from '@phosphor-icons/react'
import { Button } from './ui/button'
import { AnimatePresence, motion } from 'motion/react'
import { darkMode, lightMode } from '../../motion/transitionPresets'
import { useTheme } from '../../root/components/theme-provider'
import { useMotion } from '../../motion/motion-provider'

export function ModeToggle({
  iconSize = 'sm',
}: {
  iconSize?: 'sm' | 'md' | 'lg' | 'xl'
}) {
  const { theme, setTheme } = useTheme()
  const { transition } = useMotion()

  return (
    <Button
      variant='outline'
      size='icon'
      iconSize={iconSize}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <AnimatePresence>
        {theme === 'dark' ? (
          <motion.div
            key='dark'
            className='absolute'
            variants={darkMode}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={transition}
          >
            <MoonStars />
          </motion.div>
        ) : (
          <motion.div
            key='light'
            className='absolute'
            variants={lightMode}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={transition}
          >
            <Sun />
          </motion.div>
        )}
      </AnimatePresence>
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
