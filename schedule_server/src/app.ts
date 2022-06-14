import express from 'express'
import db_client from "./db";
import routing from "./index";
import cors from 'cors'

//TODO: параметризованные запросы

const app = express()

db_client.connect()

// app.use( helmet() )
app.use( express.json() )
app.use( cors() )

app.listen( 3001, () => void console.log( 'App listening on http://localhost:3001' ) )

routing( app )
