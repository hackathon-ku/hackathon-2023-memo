import { z } from 'zod'

export const createSchema = z.object({
    username: z.string(),
    password: z.string(),
    email: z.string(),
    createadAt: z.date(),
    updatedAt: z.date(),
  })

export const GetSchema = z.object({
    username: z.string(),
    password: z.string(),
  })