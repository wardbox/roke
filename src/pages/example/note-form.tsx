import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "../../components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import { Textarea } from "../../components/ui/textarea"

import { useToast } from "../../hooks/use-toast"
import { createNote } from "wasp/client/operations"
import { HttpError } from "wasp/server"

const formSchema = z.object({
  content: z.string().min(2, {
    message: "Note must be at least 2 characters.",
  }).max(1000, {
    message: "Note must be less than 1000 characters.",
  }),
})
 
export function NoteForm() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  })
 
  const content = form.watch("content") || ""
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createNote({ content: values.content })
      toast({
        title: "Note created",
        variant: "success",
      })
    } catch (error) {
      const err = error as HttpError
      if (err.statusCode === 401) {
        toast({
          title: "Log in first to create a note.",
          variant: "warning",
        })
      } else {
        toast({
          title: "Something went wrong.",
          variant: "destructive",
        })
      }
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-lg">Content</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="What's on your mind?" 
                  {...field} 
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                      form.handleSubmit(onSubmit)();
                    }
                  }}
                />
              </FormControl>
              <div className="flex justify-between items-center">
                <FormDescription>
                  Craft a beautiful little note. Press <kbd className="px-1 py-0.5 bg-muted rounded-md">⌘</kbd>+<kbd className="px-1 py-0.5 bg-muted rounded-md">Enter</kbd> to submit
                </FormDescription>
                <span className="text-sm text-muted-foreground">
                  {content.length}/1000
                </span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
