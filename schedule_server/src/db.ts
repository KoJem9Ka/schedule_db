import { Client } from 'pg'

const db_client = new Client( {
  host    : '',
  user    : '',
  port    : 0,
  password: '',
  database: ''
} )

export default db_client
