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
