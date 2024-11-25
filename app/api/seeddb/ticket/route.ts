/* eslint-disable @typescript-eslint/no-unused-vars */
import { pt_PT, fakerPT_PT } from '@faker-js/faker'
import { query } from '@/database/queries'
import { TTicket } from '@/schemas'
import { Optional } from '@/utils/optional'
import { date, ZodError } from 'zod'

export async function GET() {
  try {
    const TICKET_COUNT = 500

    const ticketData: Optional<TTicket, 'created_at'>[] = Array.from(
      { length: TICKET_COUNT },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (_, i) => {
        return {
          user_id: fakerPT_PT.helpers.arrayElement([
            '61cce333-ab13-11ef-8660-0242ac120002',
            '61cee4c9-ab13-11ef-8660-0242ac120002',
            '61d0e1b4-ab13-11ef-8660-0242ac120002',
            '61d2c0fc-ab13-11ef-8660-0242ac120002',
          ]),
          ticket_priority_id: fakerPT_PT.number.int({ min: 1, max: 3 }),
          ticket_category_id: fakerPT_PT.number.int({ min: 1, max: 5 }),
          ticket_type_id: fakerPT_PT.number.int({ min: 1, max: 4 }),
          subject: fakerPT_PT.lorem.sentence(),
          description: fakerPT_PT.lorem.paragraph(),
        }
      },
    )

    const insertTicket = async (ticket: Optional<TTicket, 'created_at'>) => {
      const queryResult = await query(
        'CALL sp_ticket_insert(?, ?, ?, ?, ?, ?)',
        [
          ticket.user_id,
          ticket.ticket_priority_id,
          ticket.ticket_category_id,
          ticket.ticket_type_id,
          ticket.subject,
          ticket.description,
        ],
      )

      return queryResult
    }

    for (const ticket of ticketData) {
      await insertTicket(ticket)
    }

    return new Response(JSON.stringify({ message: 'seed concluido' }), {
      status: 200,
    })
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
