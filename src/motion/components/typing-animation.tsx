// Inspired by @noelcserepy

import { motion, useMotionValue } from 'motion/react'
import { useEffect } from 'react'
import React from 'react'
import { typingCursor, typingText } from '../../motion/transitionPresets'

const DEFAULT_TEXTS = ['Check out this typed text!']

interface TypingAnimationProps {
  texts?: string[]
  delay?: number
  typingSpeed?: {
    min: number
    max: number
  }
  pauseBetweenTexts?: number
  className?: string
}

export default function TypingAnimation({
  texts = DEFAULT_TEXTS,
  delay = 0,
  typingSpeed = { min: 0.05, max: 0.15 },
  pauseBetweenTexts = 2,
  className,
}: TypingAnimationProps) {
  const textIndex = useMotionValue(0)
  const [displayText, setDisplayText] = React.useState('')

  useEffect(() => {
    let currentIndex = 0
    let charIndex = 0
    let timeoutId: NodeJS.Timeout
    let mounted = true

    const typeNextChar = async () => {
      if (!mounted) return

      const currentText = texts[currentIndex]

      if (charIndex < currentText.length) {
        setDisplayText(currentText.slice(0, charIndex + 1))
        charIndex++

        const randomDelay =
          Math.random() * (typingSpeed.max - typingSpeed.min) + typingSpeed.min

        timeoutId = setTimeout(typeNextChar, randomDelay * 1000)
      } else {
        timeoutId = setTimeout(() => {
          if (!mounted) return
          charIndex = 0
          currentIndex = (currentIndex + 1) % texts.length
          textIndex.set(currentIndex)
          setDisplayText('')
          typeNextChar()
        }, pauseBetweenTexts * 1000)
      }
    }

    timeoutId = setTimeout(typeNextChar, delay * 1000)

    return () => {
      mounted = false
      clearTimeout(timeoutId)
    }
  }, [texts, delay, typingSpeed, pauseBetweenTexts, textIndex])

  return (
    <span className={className}>
      <motion.span
        className='inline'
        variants={typingText}
        initial='initial'
        animate='animate'
      >
        {displayText}
      </motion.span>
      <motion.div
        variants={typingCursor}
        animate='blinking'
        className='ml-[0.1em] inline-block h-[1em] w-[0.1em] translate-y-[0.1em] bg-current'
      />
    </span>
  )
}
