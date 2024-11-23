import { query as dbQuery } from '@/database/queries'
import { ServiceSchema } from '@/schemas/index'

export async function GET(): Promise<Response> {
  try {
    const result = await dbQuery(
      'SELECT id, name, description, created_at, inactive_at FROM service',
    )

    // Check if the result is empty
    if (!Array.isArray(result) || result.length === 0) {
      return new Response(JSON.stringify({ error: 'Role list not found' }), {
        status: 404,
      })
    }

    // Validate the query result with Zod schema
    const serviceList = result.map((row) => ServiceSchema.parse(row))

    return new Response(JSON.stringify({ serviceList }), { status: 200 })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    })
  }
}
