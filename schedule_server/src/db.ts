import { Client } from 'pg'

const db_client = new Client( {
  host    : 'localhost',
  user    : 'kojem9ka',
  port    : 5432,
  password: '31325@',
  database: 'schedule_2'
} )

export default db_client
