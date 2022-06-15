import { Client } from 'pg'
import 'dotenv/config'

const db_client = new Client( {
  host    : process.env.DB_HOST,
  user    : process.env.DB_USER,
  port    : +process.env.DB_PORT,
  password: process.env.DB_PSWD,
  database: process.env.DB_NAME
} )

export default db_client
