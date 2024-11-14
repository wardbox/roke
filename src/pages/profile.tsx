import { motion } from "framer-motion"
import { fadeIn } from "../components/ui/motion"
import { useAuth } from "wasp/client/auth"

export default function Profile() {
  const { data: user } = useAuth()

  return (
    <motion.div   
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex flex-col gap-8"
    >
      <h1 className="text-4xl font-bold">Profile</h1>
      <div className="space-y-4">
        <p>Username: {user?.username}</p>
        <p>Email: {user?.email}</p>
      </div>
    </motion.div>
  )
}
