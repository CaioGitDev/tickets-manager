import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string().uuid(),
  role_id: z.number().int(),
  service_id: z.number().int(),
  name: z.string().max(255),
  email: z.string().email().max(50),
  active: z.boolean().default(true),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
  updated_by: z.string().uuid().nullable(),
})

export const VwUserGetAllSchema = z.object({
  id: z.string().uuid(),
  name: z.string().max(255),
  email: z.string().email().max(50),
  role: z.string().max(255),
  role_id: z.number().int(),
  service: z.string().max(255),
  service_id: z.number().int(),
  active: z.number().int(),
  created_at: z.date(),
  updated_at: z.date(),
})

export type User = z.infer<typeof UserSchema>
export type VwUserGetAll = z.infer<typeof VwUserGetAllSchema>
