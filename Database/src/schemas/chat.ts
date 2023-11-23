import { z } from 'zod'
 
export const createSchema = z.object({
    _id : z.string(),
    name : z.string(),
    messages : z.array(z.string()),
    createdAt : z.date(),
    updatedAt : z.date(),
})

export const editSchema = z.object({
    _id : z.string(),
    name : z.string().optional(),
    messages : z.array(z.string()).optional(),
    createdAt : z.date().optional(),
    updatedAt : z.date().optional(),
})

export type createSchema = z.infer<typeof createSchema>
export type editSchema = z.infer<typeof editSchema>