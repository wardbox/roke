import { motion, useScroll, useTransform, useSpring } from 'motion/react'
import daBoi from '../../static/da-boi.webp'

export function SlidingBoi() {
  const { scrollYProgress } = useScroll()

  // Add a very light spring effect to the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 35, // Keep low stiffness for floaty movement
    damping: 15, // Keep low damping for bounce
    mass: 0.8, // Keep higher mass for inertia
    restDelta: 0.0001, // Keep small restDelta for smooth finish
    restSpeed: 0.5, // Increased for faster initial response
  })

  // Transform scroll progress to y position
  const translateY = useTransform(
    smoothProgress,
    [0.5, 1], // Much wider range for earlier trigger
    [200, -90],
    {
      ease: x => x,
    },
  )

  // Also make rotation springy but gentler
  const rotate = useTransform(
    smoothProgress,
    [0.75, 1], // Match the translateY range
    [8, 0],
    {
      ease: x => x,
    },
  )

  return (
    <motion.div
      className='pointer-events-none fixed bottom-0 right-24 z-40 md:right-32'
      style={{
        translateY,
        rotate,
      }}
      animate={{
        y: [0, -3, 3, 0], // Gentler floating motion
        rotate: [0, -2, 2, 0], // Subtler rotation
      }}
      transition={{
        duration: 4, // Longer duration for floatier feel
        ease: 'easeInOut',
        repeat: Infinity,
      }}
    >
      <img src={daBoi} alt='da boi' className='w-48 object-contain' />
    </motion.div>
  )
}
