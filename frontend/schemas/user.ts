import { z } from "zod"

export const UserSchema = z.object({
  token: z.string(),
  id: z.number(),
  username: z.string(),
  email: z.email(),
  roles: z.array(z.string())
})

export type User = z.infer<typeof UserSchema>
