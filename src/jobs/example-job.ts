import { JSONObject } from 'wasp/server/_types'
import { type ExampleJob } from 'wasp/server/jobs'

export const exampleJob: ExampleJob<JSONObject, void> = async (
  _args,
  context,
) => {
  console.log("I'm going to make a note!")
  const randomlyGeneratedId = crypto.randomUUID()

  const users = await context.entities.User.findMany()
  for (const user of users) {
    console.log(`Making a note for ${user.email}`)
    try {
      await context.entities.Note.create({
        data: {
          content: `I was created by a cron job that runs every 15 minutes, my id is ${randomlyGeneratedId}. I hope you're having a beautiful day.`,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      })
      console.log(`Note created for ${user.email}`)
    } catch (error) {
      console.error(`Error creating note for ${user.email}:`, error)
    }
  }
}
