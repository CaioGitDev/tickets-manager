import { query as dbQuery } from '@/database/queries'
import { RoleSchema } from '@/schemas/index'

export async function GET(): Promise<Response> {
  try {
    const result = await dbQuery(
      'SELECT id, name, active, created_at FROM role',
    )

    // Check if the result is empty
    if (!Array.isArray(result) || result.length === 0) {
      return new Response(JSON.stringify({ error: 'Role list not found' }), {
        status: 404,
      })
    }

    // Validate the query result with Zod schema
    const RoleList = result.map((row) => RoleSchema.parse(row))

    return new Response(JSON.stringify({ RoleList }), { status: 200 })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    })
  }
}
