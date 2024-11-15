import pool from './db-connection'

export async function query(
  sql: string,
  values?: Array<string | number | boolean>,
) {
  const connection = await pool.getConnection()
  try {
    const [results] = await connection.query(sql, values)
    return results
  } finally {
    connection.release()
  }
}
