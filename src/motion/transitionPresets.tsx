export type SpringTransition = {
  type: 'spring'
  stiffness: number
  damping: number
  mass: number
  opacity: {
    type: 'tween'
    duration: number
    ease: string
  }
}

// Transition Presets
export const transitions = {
  // Default motion transition
  default: {},

  // Quick and snappy
  snappy: {
    type: 'spring',
    damping: 8, // Strength of opposing force. If set to 0, spring will oscillate indefinitely.
    mass: 0.2, // Mass of the moving object. Higher values will result in more lethargic movement.
    stiffness: 200, // Stiffness of the spring. Higher values will create more sudden movement.
    opacity: {
      // We want this to be tween because we don't want it fading in and out like a spring, unless you do! You can decide to remove this if you want.
      type: 'tween',
      duration: 0.2,
      ease: 'easeInOut',
    },
  },

  // Friendly and bouncy
  bouncy: {
    type: 'spring',
    stiffness: 300,
    damping: 12,
    mass: 0.7,
    opacity: {
      type: 'tween',
      duration: 0.4,
      ease: 'easeInOut',
    },
  },

  // Heavy and weighted
  heavy: {
    type: 'spring',
    stiffness: 200,
    damping: 50,
    mass: 8,
    opacity: {
      type: 'tween',
      duration: 0.4,
      ease: 'easeInOut',
    },
  },

  // Sicko mode - use sparingly!
  sicko: {
    type: 'spring',
    stiffness: 800,
    damping: 5,
    mass: 2,
    bounce: 1,
    restDelta: 0.001,
    opacity: {
      type: 'tween',
      duration: 0.4,
      ease: 'easeInOut',
    },
  },
} as const

export const fadeIn = {
  initial: {
    opacity: 0,
  },
  animate: () => ({
    opacity: 1,
  }),
  exit: () => ({
    opacity: 0,
  }),
}

export const hover = {
  whileHover: {
    scale: 1.2,
  },
}

export const slideInUp = {
  initial: {
    y: 20,
    opacity: 0,
  },
  animate: () => ({
    y: 0,
    opacity: 1,
  }),
  exit: () => ({
    y: 20,
    opacity: 0,
  }),
}

// Theme Toggle Animation
export const darkMode = {
  initial: {
    opacity: 0,
    rotate: 45,
  },
  animate: {
    opacity: 1,
    rotate: 0,
  },
  exit: {
    opacity: 0,
    rotate: 45,
  },
}

export const lightMode = {
  initial: {
    opacity: 0,
    rotate: 0,
  },
  animate: {
    opacity: 1,
    rotate: 45,
  },
  exit: {
    opacity: 0,
    rotate: 0,
  },
}

// Hover Effects
export const hoverScale = {
  whileHover: {
    scale: 1.2,
  },
  whileTap: {
    scale: 1.1,
  },
}

export const hoverTilt = {
  whileHover: {
    rotate: 5,
    scale: 1.05,
  },
}

// Loading Spinner
export const spinner = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1,
    },
  },
}

// Stagger Children - Update to use functions
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: () => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  }),
  exit: () => ({
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: 'afterChildren',
    },
  }),
}

export const staggerItem = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  show: () => ({
    y: 0,
    opacity: 1,
  }),
  exit: () => ({
    y: -20,
    opacity: 0,
  }),
}

// Scroll To Top
export const scrollToTop = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: transitions.bouncy,
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: transitions.snappy,
  },
}

// Page Transitions
export const pageTransition = {
  initial: {
    opacity: 0,
    y: 20,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 300,
    },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 300,
    },
  },
}

// Text Animation - Typing Effect
export const textContainer = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
}

export const textChild = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: 'easeOut',
    },
  },
}

// Cursor Animation
export const cursorBlink = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: [0, 1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
      times: [0, 0.5, 1],
    },
  },
}

// Typing Animation Variants
export const typingCursor = {
  blinking: {
    opacity: [0, 0, 1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 0,
      ease: 'linear',
      times: [0, 0.5, 0.5, 1],
    },
  },
}

export const typingText = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
}
