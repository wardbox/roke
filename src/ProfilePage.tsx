import { useAuth } from 'wasp/client/auth'

export default function Profile() {
  const { data: user } = useAuth()

  return (
    <div className='flex flex-col gap-8'>
      <h1 className='text-4xl font-thin tracking-tight xl:text-6xl'>Profile</h1>
      <p>Welcome back, {user?.username}!</p>
    </div>
  )
}
