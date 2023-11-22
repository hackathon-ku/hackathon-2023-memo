import { z } from 'zod'

export const createSchema = z.object({
    username: z.string(),
    content: z.string(),
    isNotGPT: z.boolean(),
    type: z.string(),
    chatid: z.string(),
  })