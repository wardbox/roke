import { type AuthUser } from 'wasp/auth'
import { motion } from 'motion/react'
import { fadeIn } from './motion/transitionPresets'
import { useState, useEffect } from 'react'

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

const Profile = ({ user }: { user: AuthUser }) => {
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
      <p className='text-muted-foreground text-lg'>
        {greeting}, {user?.username || 'there'}!
      </p>
      <div className='bg-card text-card-foreground space-y-6 rounded-lg border p-6 shadow-sm'>
        <div className='space-y-2'>
          <p className='text-muted-foreground text-sm font-medium'>Email</p>
          <p className='text-lg'>{user?.email || 'N/A'}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default Profile
