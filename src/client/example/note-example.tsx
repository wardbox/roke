import { motion } from 'motion/react'
import { slideInUp, staggerContainer } from '../../components/ui/motion'
import { NoteForm } from './note-form'
import { useQuery, getNotes } from 'wasp/client/operations'
import { NoteList } from './note-list'

export interface NotesProps {
  notes: Awaited<ReturnType<typeof getNotes>>
}

export default function NoteExample() {
  const { data: notes, isLoading, error } = useQuery(getNotes)

  return (
    <motion.div
      variants={staggerContainer}
      initial='initial'
      animate='animate'
      className='space-y-8'
    >
      <div className='mb-16 space-y-4'>
        <h1 className='medieval text-7xl sm:text-9xl'>Notes Example</h1>
        <motion.p
          variants={slideInUp}
          initial='initial'
          animate='animate'
          className='max-w-2xl text-lg text-muted-foreground'
        >
          A simple demonstration of Wasp&apos;s Queries and Actions for data
          management.
        </motion.p>
      </div>
      <div className='grid gap-12 lg:grid-cols-5'>
        <div className='col-span-3 space-y-6'>
          <div className='space-y-2'>
            <h2 className='text-2xl font-semibold tracking-tight'>
              Create Note
            </h2>
            <p className='text-sm text-muted-foreground'>
              Using Wasp&apos;s{' '}
              <a
                href='https://wasp-lang.dev/docs/data-model/operations/actions'
                target='_blank'
                rel='noopener noreferrer'
                className='font-medium text-primary hover:underline'
              >
                Actions
              </a>{' '}
              to add new notes.
            </p>
          </div>
          <NoteForm />
        </div>
        <div className='col-span-2 space-y-6'>
          <div className='space-y-2'>
            <h2 className='text-2xl font-semibold tracking-tight'>
              Your Notes
            </h2>
            <p className='text-sm text-muted-foreground'>
              Using Wasp&apos;s{' '}
              <a
                href='https://wasp-lang.dev/docs/data-model/operations/queries'
                target='_blank'
                rel='noopener noreferrer'
                className='font-medium text-primary hover:underline'
              >
                Queries
              </a>{' '}
              to fetch and display notes.
            </p>
          </div>
          <NoteList notes={notes} isLoading={isLoading} error={error} />
        </div>
      </div>
    </motion.div>
  )
}
