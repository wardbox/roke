import { useAuth } from 'wasp/client/auth'
import { motion } from 'motion/react'
import { fadeIn } from './motion/transitionPresets'

export default function Profile() {
  const { data: user } = useAuth()

  return (
    <motion.div
      initial='initial'
      animate='animate'
      exit='exit'
      variants={fadeIn}
      className='mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:px-8'
    >
      <h1 className='text-4xl font-bold'>Profile</h1>
      <div className='space-y-4'>
        <p>Username: {user?.username}</p>
        <p>Email: {user?.email}</p>
      </div>
    </motion.div>
  )
}
