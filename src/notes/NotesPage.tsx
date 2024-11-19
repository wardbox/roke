import { useQuery, getNotes } from 'wasp/client/operations'
import { motion } from 'motion/react'
import {
  slideInUp,
  staggerContainer,
  staggerItem,
} from '../motion/transitionPresets'
import { useMotion } from '../motion/motion-provider'
import { NoteForm } from './components/note-form'
import { NoteList } from './components/note-list'

export interface NotesProps {
  notes: Awaited<ReturnType<typeof getNotes>>
}

export default function NoteExample() {
  const { data: notes, isLoading, error } = useQuery(getNotes)
  const { transition, key } = useMotion()

  return (
    <motion.div
      key={key}
      variants={staggerContainer}
      initial='hidden'
      animate='show'
      exit='exit'
      transition={transition}
      className='space-y-8'
    >
      <div className='mb-16 space-y-4'>
        <h1 className='medieval text-7xl sm:text-9xl'>Notes Example</h1>
        <motion.p
          variants={slideInUp}
          transition={transition}
          className='max-w-2xl text-lg text-muted-foreground'
        >
          A simple demonstration of Wasp&apos;s Queries and Actions for data
          management.
        </motion.p>
      </div>
      <div className='grid gap-12 lg:grid-cols-5'>
        <motion.div
          variants={staggerItem}
          transition={transition}
          className='col-span-3 space-y-6'
        >
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
        </motion.div>
        <motion.div
          variants={staggerItem}
          transition={transition}
          className='col-span-2 space-y-6'
        >
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
        </motion.div>
      </div>
    </motion.div>
  )
}
