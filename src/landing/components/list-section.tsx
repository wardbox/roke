import { motion } from 'motion/react'
import {
  fadeIn,
  staggerContainer,
  staggerItem,
} from '../../motion/transitionPresets'
import type { Icon } from '@phosphor-icons/react'
import { useMotion } from '../../motion/motion-provider'
import { ArrowRight } from '@phosphor-icons/react'

type ListItem = string | { href: string; text: string }

interface ListSectionProps {
  icon: Icon
  title: string
  items: ListItem[]
}

export function ListSection({ icon: Icon, title, items }: ListSectionProps) {
  const { transition, key } = useMotion()

  return (
    <motion.div
      key={key}
      variants={staggerContainer}
      initial='initial'
      animate='animate'
      transition={transition}
      className='space-y-8'
    >
      <div className='mb-8 flex items-center gap-3'>
        <Icon size={32} weight='fill' className='text-brand-accent' />
        <motion.div
          variants={fadeIn}
          transition={transition}
          className='text-2xl font-medium tracking-tight'
        >
          {title}
        </motion.div>
      </div>
      <motion.ul
        variants={staggerContainer}
        initial='hidden'
        animate='show'
        transition={transition}
        className='space-y-4 text-lg text-foreground/90'
      >
        {items.map((item, i) => (
          <motion.li
            key={i}
            variants={staggerItem}
            transition={transition}
            whileHover={{ x: 5 }}
          >
            {typeof item === 'string' ? (
              item
            ) : (
              <a
                href={item.href}
                target='_blank'
                rel='noopener noreferrer'
                className='group flex items-center gap-2'
              >
                {item.text}
                <ArrowRight
                  weight='fill'
                  className='text-muted-foreground transition-transform duration-200 group-hover:translate-x-1'
                  size={20}
                />
              </a>
            )}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  )
}
