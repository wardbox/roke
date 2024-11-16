import { motion, useScroll, useTransform, useSpring } from 'motion/react'
import daBoi from '../../static/da-boi.webp'

export function SlidingBoi() {
  const { scrollYProgress } = useScroll()

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 35,
    damping: 15,
    mass: 0.8,
    restDelta: 0.0001,
    restSpeed: 0.5,
  })

  const translateY = useTransform(
    smoothProgress,
    [0.5, 1],
    [200, -90],
    {
      ease: x => x,
    },
  )

  const rotate = useTransform(
    smoothProgress,
    [0.75, 1],
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
        y: [0, -3, 3, 0],
        rotate: [0, -2, 2, 0],
      }}
      transition={{
        duration: 4,
        ease: 'easeInOut',
        repeat: Infinity,
      }}
    >
      <img src={daBoi} alt='da boi' className='w-48 object-contain' />
    </motion.div>
  )
}
