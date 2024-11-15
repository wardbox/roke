import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { fadeIn } from './motion'
import { Mountains, GithubLogo, TwitterLogo } from '@phosphor-icons/react'

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

  return (
    <Link to={to} className={className} onClick={handleClick}>
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
    <motion.footer
      variants={fadeIn}
      initial='initial'
      animate='animate'
      className='pb-16 md:pb-4'
    >
      <div className='px-6 py-4'>
        {/* Mobile Layout */}
        <div className='flex flex-col space-y-4 md:hidden'>
          {/* Logo & Social */}
          <div className='flex items-center justify-between'>
            <h2 className='flex items-center gap-2 text-lg font-semibold'>
              <Mountains size={20} weight='fill' />
              {import.meta.env.REACT_APP_NAME || 'Roke'}
            </h2>
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

          {/* Navigation */}
          <nav className='flex flex-wrap gap-x-4 gap-y-2' aria-label='Footer'>
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

          {/* Copyright */}
          <p className='text-xs text-muted-foreground'>
            &copy; {new Date().getFullYear()}{' '}
            {import.meta.env.REACT_APP_NAME || 'Roke'}
          </p>
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
    </motion.footer>
  )
}

export default Footer
