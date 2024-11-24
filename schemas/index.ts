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

export const vwTicketGetAllSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  created_by: z.string(),
  ticket_priority_id: z.number().int(),
  priority: z.string(),
  ticket_category_id: z.number().int(),
  category: z.string(),
  ticket_type_id: z.number().int(),
  type: z.string(),
  ticket_number: z.string(),
  subject: z.string(),
  description: z.string(),
  lkp_ticket_status_id: z.number().int().nullable(),
  status: z.string().nullable(),
  assigned_to_id: z.string().uuid().nullable(),
  assigned_to_name: z.string().nullable(),
  assigned_at: z.date().nullable(),
  assigned_notes: z.string().nullable(),
  created_at: z.date(),
  updated_at: z.date().nullable(),
  updated_by: z.string().uuid().nullable(),
})

export const TicketGenericSchema = z.object({
  id: z.number().int(),
  value: z.string().max(255),
  description: z.string().max(255),
  created_at: z.date(),
})

export const TicketSchema = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string().uuid(),
  ticket_priority_id: z.number().int(),
  ticket_category_id: z.number().int(),
  ticket_type_id: z.number().int(),
  ticket_number: z.string().max(255).optional(),
  subject: z.string().max(255),
  description: z.string().max(255),
  created_at: z.date(),
  updated_at: z.date().optional(),
  updated_by: z.string().uuid().nullable().optional(),
})

export const DashboardOverviewSchema = z.object({
  category: z.string().max(255),
  key: z.string().max(255),
  value: z.number().int(),
})

export const DashboardTicketTriageSchema = z.object({
  created_by: z.string(),
  ticket_number: z.string(),
  subject: z.string(),
  category: z.string(),
})

export type User = z.infer<typeof UserSchema>
export type VwUserGetAll = z.infer<typeof VwUserGetAllSchema>
export type TLookup = z.infer<typeof LookupSchema>
export type TRole = z.infer<typeof RoleSchema>
export type TService = z.infer<typeof ServiceSchema>
export type TVwTicketGetAll = z.infer<typeof vwTicketGetAllSchema>
export type TTicketPriority = z.infer<typeof TicketGenericSchema>
export type TTicketCategory = z.infer<typeof TicketGenericSchema>
export type TTicketType = z.infer<typeof TicketGenericSchema>
export type TTicketStatus = z.infer<typeof TicketGenericSchema>
export type TTicket = z.infer<typeof TicketSchema>

export type TDashboardOverview = z.infer<typeof DashboardOverviewSchema>
export type TDashboardTicketTriage = z.infer<typeof DashboardTicketTriageSchema>
