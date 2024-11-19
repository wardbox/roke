import { motion } from 'motion/react'
import {
  fadeIn,
  staggerContainer,
  staggerItem,
} from '../../motion/transitionPresets'
import { PrismaLogo } from '../../static/prisma-logo'
import waspLogo from '../../static/wasp.png'
import motionLogo from '../../static/motion.png'
import tailwindLogo from '../../static/tailwind.svg'
import shadcnuiLogo from '../../static/shadcnui.png'
import { useMotion } from '../../motion/motion-provider'

interface TechLogoProps {
  href: string
  src?: string
  alt: string
  width?: number
  children?: React.ReactNode
}

function TechLogo({ href, src, alt, width = 100, children }: TechLogoProps) {
  const { transition } = useMotion()

  return (
    <motion.a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className='group relative flex items-center gap-2'
    >
      {src ? (
        <motion.img
          whileHover={{ scale: 1.1 }}
          variants={staggerItem}
          transition={transition}
          src={src}
          alt={alt}
          width={width}
          className='text-foreground'
        />
      ) : (
        <motion.div
          whileHover={{ scale: 1.1 }}
          variants={staggerItem}
          transition={transition}
          className='w-[80px] text-foreground'
        >
          {children}
        </motion.div>
      )}
    </motion.a>
  )
}

export function TechStack() {
  const { transition, key } = useMotion()

  return (
    <div className='flex w-full flex-col items-center'>
      <motion.div variants={fadeIn} transition={transition}>
        <h2 className='mb-16 text-balance text-center text-4xl font-thin tracking-tight sm:text-start'>
          powered and inspired by
        </h2>
      </motion.div>
      <motion.div
        key={key}
        variants={staggerContainer}
        initial='hidden'
        whileInView='show'
        transition={transition}
        className='grid grid-cols-2 items-center justify-items-center gap-8 sm:grid-cols-5'
      >
        <TechLogo href='https://wasp-lang.dev' src={waspLogo} alt='wasp' />
        <TechLogo href='https://motion.dev/' src={motionLogo} alt='motion' />
        <TechLogo
          href='https://tailwindcss.com/'
          src={tailwindLogo}
          alt='tailwind'
        />
        <TechLogo
          href='https://ui.shadcn.com/docs'
          src={shadcnuiLogo}
          alt='shadcn/ui'
        />
        <div className='col-span-2 sm:col-span-1'>
          <TechLogo href='https://www.prisma.io/' alt='prisma'>
            <PrismaLogo />
          </TechLogo>
        </div>
      </motion.div>
    </div>
  )
}
