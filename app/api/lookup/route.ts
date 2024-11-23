import { query as dbQuery } from '@/database/queries'
import { LookupSchema } from '@/schemas/index'

export async function GET(request: Request): Promise<Response> {
  try {
    // Get the list name from the query string
    const listName = new URLSearchParams(request.url).get('listName')

    // Check if the list name is empty
    if (!listName) {
      return new Response(JSON.stringify({ error: 'List name is required' }), {
        status: 400,
      })
    }

    const result = await dbQuery('SELECT * FROM $1 ', [listName])

    // Check if the result is empty
    if (!Array.isArray(result) || result.length === 0) {
      return new Response(JSON.stringify({ error: 'List not found' }), {
        status: 404,
      })
    }

    // Validate the query result with Zod schema
    const lookupList = result.map((row) => LookupSchema.parse(row))

    return new Response(JSON.stringify({ lookupList }), { status: 200 })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    })
  }
}
