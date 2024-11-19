import { motion, useScroll, useTransform, useSpring } from 'motion/react'
import daBoi from '../../static/da-boi.webp'

export function SlidingBoi() {
  const { scrollYProgress } = useScroll()

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 1,
    restDelta: 0.001,
  })

  const translateY = useTransform(
    smoothProgress,
    [0.7, 0.85, 1],
    [200, 0, -90],
    { clamp: true },
  )

  const rotate = useTransform(smoothProgress, [0.7, 0.85, 1], [8, 2, 0], {
    clamp: true,
  })

  return (
    <motion.div
      className='pointer-events-none fixed bottom-0 right-24 z-40 hidden md:right-32 lg:block'
      style={{
        translateY,
        rotate,
      }}
      animate={{
        y: [0, -4, 4, 0],
      }}
      transition={{
        y: {
          duration: 3,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        },
      }}
    >
      <img src={daBoi} alt='da boi' className='w-48' />
    </motion.div>
  )
}
