import { motion } from "framer-motion"
import { fadeIn, staggerContainer } from "../../components/ui/motion"
import { NoteForm } from "./note-form"
import { useQuery, getNotes } from "wasp/client/operations"
import { NoteList } from "./note-list"

export interface NotesProps {
  notes: Awaited<ReturnType<typeof getNotes>>
}

export default function Example() {
  const { data: notes, isLoading } = useQuery(getNotes, {}, {
    refetchInterval: 30000,
    refetchIntervalInBackground: true,
  })
  
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
    >
      <motion.div
        variants={fadeIn}
        className="space-y-4 mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Notes Example
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          A simple demonstration of Wasp's Queries and Actions for data management.
        </p>
      </motion.div>

      <div className="grid gap-12 lg:grid-cols-5">
        <motion.div variants={fadeIn} className="space-y-6 col-span-3">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Create Note</h2>
            <p className="text-sm text-muted-foreground">
              Using Wasp's <a href="https://wasp-lang.dev/docs/data-model/operations/actions" 
                target="_blank" 
                className="font-medium text-primary hover:underline"
              >
                Actions
              </a> to add new notes.
            </p>
          </div>
          <NoteForm />
        </motion.div>
        <motion.div variants={fadeIn} className="space-y-6 col-span-2">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Your Notes</h2>
            <p className="text-sm text-muted-foreground">
              Using Wasp's <a href="https://wasp-lang.dev/docs/data-model/operations/queries" 
                target="_blank" 
                className="font-medium text-primary hover:underline"
              >
                Queries
              </a> to fetch and display notes.
            </p>
          </div>
          <NoteList notes={notes} isLoading={isLoading} />
        </motion.div>
      </div>
    </motion.div>
  )
}
