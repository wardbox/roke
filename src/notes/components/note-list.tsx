import { useState } from 'react'
import { Trash } from '@phosphor-icons/react'
import { deleteNote, updateNote } from 'wasp/client/operations'
import { Button } from '../../client/components/ui/button'
import { AnimatePresence, motion } from 'motion/react'
import {
  fadeIn,
  staggerContainer,
  staggerItem,
} from '../../motion/transitionPresets'
import { Skeleton } from '../../client/components/ui/skeleton'
import { Textarea } from '../../client/components/ui/textarea'
import { useToast } from '../../hooks/use-toast'
import { NotesProps } from '../NotesPage'
import { timeSince, getErrorMessage } from '../../lib/utils'

type Note = NotesProps['notes'][number]

export function NoteList({
  notes,
  isLoading,
  error,
}: {
  notes: NotesProps['notes'] | undefined
  isLoading: boolean
  error: unknown
}) {
  const { toast } = useToast()
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)
  const [editedContent, setEditedContent] = useState('')

  async function handleDelete(id: string) {
    try {
      await deleteNote({ id })
      toast({
        title: 'Note deleted',
        variant: 'destructive',
      })
    } catch (error) {
      toast({
        title: 'Error deleting note',
        description: getErrorMessage(error),
      })
    }
  }

  async function handleUpdate(id: string) {
    try {
      await updateNote({ id, content: editedContent })
      setEditingNoteId(null)
      toast({
        title: 'Note updated',
        description: 'Your note has been updated successfully.',
        variant: 'success',
      })
    } catch (error) {
      toast({
        title: 'Error updating note',
        description: getErrorMessage(error),
        variant: 'destructive',
      })
    }
  }

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={isLoading ? 'loading' : 'content'}
        variants={staggerContainer}
        initial='hidden'
        animate='show'
        exit='exit'
        className='space-y-4'
      >
        {isLoading ? (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                custom={2 - i}
                className='rounded-lg border p-4'
              >
                <div className='space-y-3'>
                  <Skeleton className='h-4 w-3/4' />
                  <Skeleton className='h-3 w-1/4' />
                </div>
              </motion.div>
            ))}
          </>
        ) : error ? (
          <motion.div
            variants={fadeIn}
            className='rounded-lg border border-dashed p-8 text-center'
          >
            <p className='text-muted-foreground'>
              {(error as Error)?.message || 'Please sign in to view notes'}
            </p>
          </motion.div>
        ) : !notes || notes.length === 0 ? (
          <motion.div
            variants={fadeIn}
            className='rounded-lg border border-dashed p-8 text-center'
          >
            <p className='text-muted-foreground'>
              No notes yet. Why not create one?
            </p>
          </motion.div>
        ) : (
          notes.map((note: Note, i) => (
            <motion.div
              key={note.id}
              variants={staggerItem}
              custom={notes.length - 1 - i}
              layout='position'
              transition={{ layout: { duration: 0.2 } }}
              className='group relative rounded-lg border p-6 leading-8 transition-colors hover:bg-muted/50'
            >
              <div className='flex items-start justify-between gap-4'>
                <div className='flex flex-1 flex-col gap-4'>
                  {editingNoteId === note.id ? (
                    <div className='space-y-2'>
                      <Textarea
                        value={editedContent}
                        onChange={e => setEditedContent(e.target.value)}
                        autoFocus
                        onKeyDown={e => {
                          if (e.key === 'Escape') {
                            setEditingNoteId(null)
                          }
                          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                            handleUpdate(note.id)
                          }
                        }}
                      />
                      <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                        <Button
                          size='sm'
                          variant='secondary'
                          onClick={() => handleUpdate(note.id)}
                          className='h-7 px-2 text-xs'
                        >
                          Save
                        </Button>
                        <Button
                          size='sm'
                          variant='ghost'
                          onClick={() => setEditingNoteId(null)}
                          className='h-7 px-2 text-xs'
                        >
                          Cancel
                        </Button>
                        <span className='text-xs'>
                          Press{' '}
                          <kbd className='rounded-md bg-muted px-1 py-0.5'>
                            ⌘
                          </kbd>
                          +
                          <kbd className='rounded-md bg-muted px-1 py-0.5'>
                            Enter
                          </kbd>{' '}
                          to save
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p
                      className='mb-2 cursor-pointer text-pretty font-medium hover:text-foreground/80'
                      onClick={() => {
                        setEditingNoteId(note.id)
                        setEditedContent(note.content)
                      }}
                    >
                      {note.content}
                    </p>
                  )}
                  <div className='text-pretty text-sm text-muted-foreground'>
                    <span>By {note.user.username}</span>
                    <span className='mx-2'>•</span>
                    <span>
                      updated <time>{timeSince(new Date(note.updatedAt))}</time>
                    </span>
                  </div>
                </div>

                <Button
                  size='icon'
                  variant='ghost'
                  className='shrink-0'
                  onClick={() => handleDelete(note.id)}
                  aria-label='Delete note'
                >
                  <Trash weight='bold' className='h-4 w-4' />
                </Button>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </AnimatePresence>
  )
}
