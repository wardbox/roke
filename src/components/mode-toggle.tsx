import { MoonStars, Sun } from '@phosphor-icons/react'
import { Button } from './ui/button'
import { AnimatePresence } from 'motion/react'
import { darkMode, lightMode } from './ui/motion'
import { useTheme } from './theme-provider'
import { motion } from 'motion/react'

export function ModeToggle({
  iconSize = 'sm',
}: {
  iconSize?: 'sm' | 'md' | 'lg' | 'xl'
}) {
  const { theme, setTheme } = useTheme()

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
          >
            <Sun />
          </motion.div>
        )}
      </AnimatePresence>
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
