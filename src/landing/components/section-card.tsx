import { motion } from 'motion/react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../client/components/ui/card'
import { fadeIn } from '../../motion/transitionPresets'
import { ReactNode } from 'react'
import { Link } from '@phosphor-icons/react'
import { cn } from '../../lib/utils'
import { useMotion } from '../../motion/motion-provider'

interface SectionCardProps {
  sectionId: string
  title: string
  subtitle?: string
  children: ReactNode
}

export function SectionCard({
  sectionId,
  title,
  subtitle,
  children,
}: SectionCardProps) {
  const { key } = useMotion()

  return (
    <motion.section
      key={key}
      id={sectionId}
      variants={fadeIn}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      <Card>
        <CardHeader>
          <CardTitle className='group flex items-baseline text-4xl font-medium tracking-tight'>
            <div className='flex flex-col'>
              <span>{title}</span>
              {subtitle && (
                <span className='text-sm tracking-normal text-muted-foreground/50'>
                  {subtitle}
                </span>
              )}
            </div>
            <a
              href={`#${sectionId}`}
              aria-label={`Link to ${title} section`}
              className={cn(
                'ml-2 text-muted-foreground/50 transition-all hover:text-muted-foreground',
                'sm:invisible sm:group-hover:visible',
              )}
              onClick={e => {
                e.preventDefault()
                window.history.pushState({}, '', `#${sectionId}`)
                document
                  .getElementById(sectionId)
                  ?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <Link
                size={20}
                weight='bold'
                aria-hidden='true'
                className='-translate-y-1'
              />
            </a>
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-8'>{children}</CardContent>
      </Card>
    </motion.section>
  )
}
