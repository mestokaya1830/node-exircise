import express from 'express'
const app = express()
import http from 'http'
const server = http.createServer(app)
import { Server } from "socket.io"
const io = new Server(server)
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('static'))
dotenv.config()

app.get('/', (req, res) => {
  res.sendFile('index.html')
})


io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(process.env.PORT, () => {
  console.log('listening on *:3000')
})
