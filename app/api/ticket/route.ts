/* eslint-disable @typescript-eslint/no-unused-vars */
import { query as dbQuery } from '@/database/queries'
import { TVwTicketGetAll, vwTicketGetAllSchema } from '@/schemas/index'
import { ZodError } from 'zod'

export async function GET() {
  try {
    const queryResult = await dbQuery(
      'SELECT * FROM vw_ticket_get_all ORDER BY created_at DESC',
    )

    if (!Array.isArray(queryResult) || queryResult.length === 0) {
      return new Response(JSON.stringify({ error: 'No data found' }), {
        status: 404,
      })
    }

    const data = queryResult.map((row) => vwTicketGetAllSchema.parse(row))

    return new Response(JSON.stringify({ data }), { status: 200 })
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      // Converte os erros do Zod em mensagens mais amigáveis
      const formattedErrors = error.errors.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }))

      return new Response(
        JSON.stringify({
          error: 'Validation failed',
          details: formattedErrors,
        }),
        { status: 400 },
      )
    }

    // Erros gerais
    return new Response(
      JSON.stringify({ error: 'Internal Server Error', details: error }),
      { status: 500 },
    )
  }
}
