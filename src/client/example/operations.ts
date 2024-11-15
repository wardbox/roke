import {
  type CreateNote,
  type DeleteNote,
  type GetNotes,
  type UpdateNote,
} from 'wasp/server/operations'
import { type Note } from 'wasp/entities'
import { HttpError } from 'wasp/server'

export const createNote: CreateNote<Pick<Note, 'content'>, Note> = async (
  { content },
  context,
) => {
  if (!context.user) {
    throw new HttpError(401, 'You must be logged in to create notes')
  }

  if (!content?.trim()) {
    throw new HttpError(400, 'Note content cannot be empty')
  }

  const note = await context.entities.Note.create({
    data: {
      content,
      userId: context.user.id,
    },
  })
  return note
}

export const getNotes = (async (args: { all?: boolean } = {}, context) => {
  if (!context.user) {
    throw new HttpError(401, 'You must be logged in to view notes')
  }

  try {
    const notes = await context.entities.Note.findMany({
      where: args.all
        ? {}
        : {
            userId: context.user.id,
          },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return notes
  } catch (error) {
    const err = error as Error
    throw new HttpError(500, err.message)
  }
}) satisfies GetNotes<{ all?: boolean }, Note[]>

export const updateNote: UpdateNote<
  { id: string; content: string },
  Note
> = async ({ id, content }, context) => {
  if (!context.user) {
    throw new HttpError(401, 'You must be logged in to update notes')
  }

  const existingNote = await context.entities.Note.findUnique({
    where: { id },
  })

  if (!existingNote) {
    throw new HttpError(404, 'Note not found')
  }

  if (existingNote.userId !== context.user.id) {
    throw new HttpError(403, "You don't have permission to update this note")
  }

  if (!content?.trim()) {
    throw new HttpError(400, 'Note content cannot be empty')
  }

  const note = await context.entities.Note.update({
    where: { id },
    data: { content },
  })

  return note
}

export const deleteNote: DeleteNote = async ({ id }, context) => {
  if (!context.user) {
    throw new HttpError(401, 'You must be logged in to delete notes')
  }

  const existingNote = await context.entities.Note.findUnique({
    where: { id },
  })

  if (!existingNote) {
    throw new HttpError(404, 'Note not found')
  }

  if (existingNote.userId !== context.user.id) {
    throw new HttpError(403, "You don't have permission to delete this note")
  }

  await context.entities.Note.delete({
    where: { id },
  })

  return {
    success: true,
  }
}
