# Motion Module

Spring-based animations using Motion (motion.dev).

## Files

- `transitionPresets.tsx` - Animation variants and spring configurations
- `motion-provider.tsx` - React context for global animation settings
- `config.ts` - Default transition preset selection
- `components/typing-animation.tsx` - Typewriter effect component
- `components/use-reduced-motion.ts` - Accessibility hook for reduced motion

## Spring Presets

| Preset   | Character         | Use Case                  |
| -------- | ----------------- | ------------------------- |
| `snappy` | Quick, responsive | Default, general UI       |
| `bouncy` | Friendly, playful | Buttons, interactions     |
| `heavy`  | Weighted, serious | Modals, important actions |
| `sicko`  | Extreme bounce    | Sparingly, for fun        |

## Animation Variants

- `fadeIn` - Simple opacity fade
- `slideInUp` - Slide up with fade
- `staggerContainer` / `staggerItem` - Staggered children animations
- `pageTransition` - Full page transitions
- `hoverScale` / `hoverTilt` - Hover effects
- `darkMode` / `lightMode` - Theme toggle animations

## Usage

```tsx
import { motion } from 'motion/react'
import { fadeIn, transitions } from '../motion/transitionPresets'

;<motion.div
  variants={fadeIn}
  initial='initial'
  animate='animate'
  transition={transitions.snappy}
>
  Content
</motion.div>
```

## Global Transition

The app uses MotionProvider to share a global transition. Access via:

```tsx
const { transition, key } = useMotion()
```

## Customization

### Change Default Preset

Edit `config.ts` to change the default transition:

```ts
export const defaultTransition = transitions.bouncy
```

### Create New Presets

Add to `transitionPresets.tsx`:

```ts
export const transitions = {
  // ...existing
  custom: {
    type: 'spring',
    stiffness: 150,
    damping: 15,
    mass: 1,
  },
}
```

## Accessibility

Use `useReducedMotion()` hook to respect user's motion preferences:

```tsx
const prefersReducedMotion = useReducedMotion()
const animation = prefersReducedMotion ? {} : fadeIn
```
