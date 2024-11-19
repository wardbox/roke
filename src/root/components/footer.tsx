import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { fadeIn } from '../../motion/transitionPresets'
import { Mountains, GithubLogo, TwitterLogo } from '@phosphor-icons/react'
import { usePrefetch } from '../../lib/utils'

const ScrollToTopLink = ({
  to,
  children,
  className,
}: {
  to: string
  children: React.ReactNode
  className?: string
}) => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const prefetch = usePrefetch()

  return (
    <Link
      to={to}
      className={className}
      onClick={handleClick}
      onMouseEnter={() => prefetch(to, undefined, { assets: true })}
    >
      {children}
    </Link>
  )
}

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Guide', href: '/guide' },
    { name: 'Notes', href: '/note-example' },
    { name: 'Motion', href: '/motion' },
    { name: 'Utils', href: '/utils' },
  ],
  social: [
    {
      name: 'GitHub',
      href: 'https://github.com/wardbox/roke',
      icon: 'GithubLogo',
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/ward_box',
      icon: 'TwitterLogo',
    },
  ],
}

export function Footer() {
  return (
    <motion.div
      variants={fadeIn}
      initial='initial'
      animate='animate'
      className='relative z-50 mx-auto max-w-7xl'
    >
      <div className='px-6 py-4'>
        {/* Mobile Layout */}
        <div className='flex flex-col space-y-2 md:hidden'>
          {/* Logo & Social */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Mountains size={20} weight='fill' />
              <span className='text-sm text-muted-foreground'>
                &copy; {new Date().getFullYear()}{' '}
                {import.meta.env.REACT_APP_NAME || 'Roke'}
              </span>
            </div>
            <div className='flex gap-4'>
              {navigation.social.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-muted-foreground transition-colors hover:text-foreground'
                  aria-label={item.name}
                >
                  {item.icon === 'GithubLogo' ? (
                    <GithubLogo size={20} weight='fill' />
                  ) : (
                    <TwitterLogo size={20} weight='fill' />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation - Horizontal Scrolling */}
          <div className='overflow-x-auto'>
            <nav className='flex min-w-max gap-4 py-1' aria-label='Footer'>
              {navigation.main.map(item => (
                <ScrollToTopLink
                  key={item.name}
                  to={item.href}
                  className='whitespace-nowrap text-sm text-muted-foreground transition-colors hover:text-foreground'
                >
                  {item.name}
                </ScrollToTopLink>
              ))}
            </nav>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className='hidden md:flex md:items-center md:justify-between'>
          <div className='flex items-center space-x-8'>
            {/* Logo & Title */}
            <div className='flex items-center space-x-3'>
              <h2 className='flex items-center gap-2 text-lg font-semibold'>
                <Mountains size={20} weight='fill' />
                {import.meta.env.REACT_APP_NAME || 'Roke'}
              </h2>
              <span className='text-muted-foreground'>|</span>
              <p className='text-sm text-muted-foreground'>
                A{' '}
                <a
                  href='https://wasp-lang.dev'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-foreground transition-colors hover:text-primary'
                >
                  Wasp
                </a>{' '}
                starter with sensible defaults
              </p>
            </div>

            {/* Navigation */}
            <nav className='flex gap-x-6' aria-label='Footer'>
              {navigation.main.map(item => (
                <ScrollToTopLink
                  key={item.name}
                  to={item.href}
                  className='text-sm text-muted-foreground transition-colors hover:text-foreground'
                >
                  {item.name}
                </ScrollToTopLink>
              ))}
            </nav>
          </div>

          {/* Social & Copyright */}
          <div className='flex items-center gap-6'>
            <div className='flex gap-4'>
              {navigation.social.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-muted-foreground transition-colors hover:text-foreground'
                  aria-label={item.name}
                >
                  {item.icon === 'GithubLogo' ? (
                    <GithubLogo size={20} weight='fill' />
                  ) : (
                    <TwitterLogo size={20} weight='fill' />
                  )}
                </a>
              ))}
            </div>
            <p className='text-xs text-muted-foreground'>
              &copy; {new Date().getFullYear()}{' '}
              {import.meta.env.REACT_APP_NAME || 'Roke'}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Footer
