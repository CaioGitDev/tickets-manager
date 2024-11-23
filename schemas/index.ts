import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string().uuid().optional(),
  role_id: z.number().int(),
  service_id: z.number().int(),
  name: z.string().max(255),
  email: z.string().email().max(50),
  active: z.boolean().default(true).optional(),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
  updated_by: z.string().uuid().nullable().optional(),
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

export const LookupSchema = z.object({
  id: z.string().uuid(),
  value: z.string().max(255),
  description: z.string().max(255),
  created_at: z.date(),
})

export const RoleSchema = z.object({
  id: z.number().int(),
  name: z.string().max(255),
  active: z.number().int(),
  created_at: z.date(),
})

export const ServiceSchema = z.object({
  id: z.number().int(),
  name: z.string().max(255),
  description: z.string().max(255),
  created_at: z.date(),
  inactive_at: z.date().nullable(),
})

export type User = z.infer<typeof UserSchema>
export type VwUserGetAll = z.infer<typeof VwUserGetAllSchema>
export type TLookup = z.infer<typeof LookupSchema>
export type TRole = z.infer<typeof RoleSchema>
export type TService = z.infer<typeof ServiceSchema>
