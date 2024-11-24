// create script to seed the database
// populate ticket table with 1000 records
import { faker } from '@faker-js/faker'
import { query } from './queries'
import { TTicket } from '@/schemas'
import { Optional } from '@/utils/optional'

const TICKET_COUNT = 1

const ticketData: Optional<TTicket, 'created_at'>[] = Array.from(
  { length: TICKET_COUNT },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (_, i) => {
    return {
      user_id: faker.helpers.arrayElement([
        '77fceba5-a082-11ef-9737-0242ac170002',
        '77f9d5e4-a082-11ef-9737-0242ac170002',
        '0a9a5a7b-a928-11ef-b8ed-0242ac170002',
        '5039c827-a928-11ef-b8ed-0242ac170002',
        'db20a143-a97f-11ef-b8ed-0242ac170002',
        '77f19a80-a082-11ef-9737-0242ac170002',
      ]),
      ticket_priority_id: faker.number.int({ min: 1, max: 3 }),
      ticket_category_id: faker.number.int({ min: 1, max: 5 }),
      ticket_type_id: faker.number.int({ min: 1, max: 4 }),
      subject: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
    }
  },
)

const insertTicket = async (ticket: Optional<TTicket, 'created_at'>) => {
  const queryResult = await query('CALL sp_ticket_insert(?, ?, ?, ?, ?, ?,)', [
    ticket.user_id,
    ticket.ticket_priority_id,
    ticket.ticket_category_id,
    ticket.ticket_type_id,
    ticket.subject,
    ticket.description,
  ])

  return queryResult
}

export const seedDatabase = async () => {
  for (const ticket of ticketData) {
    await insertTicket(ticket)
  }
}
