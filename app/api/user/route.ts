import { query as dbQuery } from '@/database/queries'
import { VwUserGetAllSchema } from '@/schemas/index'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('id')

    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query parameter is missing' }),
        {
          status: 400,
        },
      )
    }

    const userResult = await dbQuery(
      'SELECT * FROM vw_user_get_all WHERE id = ?',
      [query],
    )

    // Check if the result is empty
    if (!Array.isArray(userResult) || userResult.length === 0) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
      })
    }

    // Validate the query result with Zod schema
    const user = VwUserGetAllSchema.parse(userResult[0])

    return new Response(JSON.stringify({ user }), { status: 200 })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    })
  }
}
