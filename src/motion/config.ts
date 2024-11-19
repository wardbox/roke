import type { SpringTransition } from './transitionPresets'

// Developer-defined transition presets
export const motionConfig: Record<string, SpringTransition> = {
  default: {
    type: 'spring',
    stiffness: 200,
    damping: 8,
    mass: 0.2,
    opacity: {
      type: 'tween',
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
  // Custom presets for different parts of your app
  heroSection: {
    type: 'spring',
    stiffness: 300,
    damping: 15,
    mass: 0.5,
    opacity: {
      type: 'tween',
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  modalAnimation: {
    type: 'spring',
    stiffness: 400,
    damping: 25,
    mass: 0.8,
    opacity: {
      type: 'tween',
      duration: 0.2,
      ease: 'easeOut',
    },
  },
}

// Set the default transition to use throughout the app
export const defaultTransition = motionConfig.default
