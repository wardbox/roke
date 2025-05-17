import { type AuthUser } from 'wasp/auth'
import { motion } from 'motion/react'
import { fadeIn } from './motion/transitionPresets'
import { Link as WaspLink, routes } from 'wasp/client/router'
import { Button } from './client/components/ui/button'
import { useState, useEffect, forwardRef, type ComponentProps } from 'react'

// Define ForwardedLink component
type ForwardedLinkProps = ComponentProps<typeof WaspLink> & {
  children?: React.ReactNode
}

const ForwardedLink = forwardRef<HTMLAnchorElement, ForwardedLinkProps>(
  (props, ref) => {
    return <WaspLink {...props} ref={ref} />
  },
)
ForwardedLink.displayName = 'ForwardedLink'

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

const Profile = ({ user }: { user: AuthUser }) => {
  const subscriptionStatus = user?.subscriptionStatus || 'No Subscription'
  const isSubscribed = subscriptionStatus === 'active'
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    setGreeting(getGreeting())
  }, [])

  return (
    <motion.div
      initial='initial'
      animate='animate'
      exit='exit'
      variants={fadeIn}
      className='mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:px-8'
    >
      <h1 className='text-4xl font-thin tracking-tight'>Profile</h1>
      <p className='text-lg text-muted-foreground'>
        {greeting}, {user?.username || 'there'}!
      </p>
      <div className='space-y-6 rounded-lg border bg-card p-6 text-card-foreground shadow-sm'>
        <div className='space-y-2'>
          <p className='text-sm font-medium text-muted-foreground'>Email</p>
          <p className='text-lg'>{user?.email || 'N/A'}</p>
        </div>
        <div className='space-y-3'>
          <p className='text-sm font-medium text-muted-foreground'>
            Subscription Status
          </p>
          <p className='text-lg capitalize'>
            {subscriptionStatus.replace('_', ' ')}
          </p>
          <Button variant='outline' size='sm' className='font-light'>
            <ForwardedLink to={routes.SubscriptionRoute.to}>
              {isSubscribed ? 'Manage Subscription' : 'Subscribe Now'}
            </ForwardedLink>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default Profile
