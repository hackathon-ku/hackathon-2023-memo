import { z } from "zod";

export const createSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string(),
});

export const GetSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type createSchema = z.infer<typeof createSchema>;
export type GetSchema = z.infer<typeof GetSchema>;
