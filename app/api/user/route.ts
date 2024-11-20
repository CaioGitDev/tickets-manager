import { query as dbQuery } from '@/database/queries'
import { VwUserGetAllSchema } from '@/schemas/index'

export async function GET() {
  try {
    const userResult = await dbQuery('SELECT * FROM vw_user_get_all')

    // Check if the result is empty
    if (!Array.isArray(userResult) || userResult.length === 0) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
      })
    }

    // Validate the query result with Zod schema
    const users = userResult.map((user) => VwUserGetAllSchema.parse(user))

    return new Response(JSON.stringify({ users }), { status: 200 })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    })
  }
}
