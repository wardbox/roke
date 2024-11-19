import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAuth } from 'wasp/client/auth'
import { Button } from '../../client/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../client/components/ui/form'
import { Textarea } from '../../client/components/ui/textarea'
import { useToast } from '../../hooks/use-toast'
import { createNote } from 'wasp/client/operations'
import { HttpError } from 'wasp/server'
import { Link } from 'react-router-dom'

const formSchema = z.object({
  content: z
    .string()
    .min(2, {
      message: 'Note must be at least 2 characters.',
    })
    .max(1000, {
      message: 'Note must be less than 1000 characters.',
    }),
})

export function NoteForm() {
  const { data: user } = useAuth()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  })

  const content = form.watch('content') || ''

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createNote({ content: values.content })
      form.reset()
      toast({
        title: 'Note created',
        variant: 'success',
      })
    } catch (error) {
      const err = error as HttpError
      if (err.statusCode === 401) {
        toast({
          title: 'Log in first to create a note.',
          variant: 'warning',
        })
      } else {
        toast({
          title: 'Something went wrong.',
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='max-w-[300px] space-y-8 sm:max-w-none'
      >
        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center gap-2 text-lg'>
                Content
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={
                    user
                      ? "What's on your mind?"
                      : 'Please sign in to create notes...'
                  }
                  {...field}
                  disabled={!user}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                      form.handleSubmit(onSubmit)()
                    }
                  }}
                />
              </FormControl>
              <div className='flex items-center justify-between'>
                <FormDescription>
                  {user ? (
                    <>
                      Craft a beautiful little note. Press{' '}
                      <kbd className='rounded-md bg-muted px-1 py-0.5'>⌘</kbd>+
                      <kbd className='rounded-md bg-muted px-1 py-0.5'>
                        Enter
                      </kbd>{' '}
                      to submit
                    </>
                  ) : (
                    'Log in to start creating notes'
                  )}
                </FormDescription>
                <span className='text-sm text-muted-foreground'>
                  {content.length}/1000
                </span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {user ? (
          <Button type='submit'>Submit</Button>
        ) : (
          <Button asChild>
            <Link to='/login'>Log in to submit</Link>
          </Button>
        )}
      </form>
    </Form>
  )
}
