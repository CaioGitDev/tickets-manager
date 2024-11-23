/* eslint-disable @typescript-eslint/no-explicit-any */
import { query as dbQuery } from '@/database/queries'
import { UserSchema, VwUserGetAllSchema } from '@/schemas/index'

export async function GET() {
  try {
    const userResult = await dbQuery(
      'SELECT * FROM vw_user_get_all order by created_at desc',
    )

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

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate the request body with Zod schema
    const user = UserSchema.parse(body)

    // Insert the user into the database
    const dbResponse = await dbQuery('call sp_user_insert(?, ?, ?, ?)', [
      user.role_id,
      user.service_id,
      user.name,
      user.email,
    ])

    return new Response(JSON.stringify(dbResponse), {
      status: 201,
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    })
  }
}

export async function PUT(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    if (!id) {
      return new Response(JSON.stringify({ error: 'ID is required' }), {
        status: 400,
      })
    }
    const body = await request.json()

    // Validate the request body with Zod schema
    // const user = UserSchema.parse(body)

    // Update the user in the database
    const dbResponse = await dbQuery(
      'call sp_user_update(?, ?, ?, ?, ?, ?, ?)',
      [
        id,
        body.role_id,
        body.service_id,
        body.name,
        body.email,
        body.active,
        body.updated_by,
      ],
    )

    return new Response(JSON.stringify(dbResponse), {
      status: 200,
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    })
  }
}
