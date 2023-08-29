import * as dotenv from 'dotenv'
import SocketServer from './socketServer'
dotenv.config()

import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import mongoose, { ConnectOptions } from 'mongoose'
import { Socket } from 'socket.io'
import { IResponse } from './interfaces/common'
import customResponse from './middleware/customResponse'

const app = express()

app.use(express.json())
app.use(cors())

// Socket
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origin: [process.env.CLIENT_URL],
    methods: ['GET', 'POST', 'PUT', 'PATCH']
  }
})

io.on('connection', (socket: Socket) => {
  SocketServer(socket)
})

// Routes
app.use(function (req: Request, res: Response, next: NextFunction) {
  res = customResponse(res as IResponse)
  next()
})
app.get('/', (req: Request, res: Response) => {
  return res.send('hello')
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: err.message })
})

const mongoUrl = process.env.MONGODB_URL
if (mongoUrl) {
  mongoose
    .connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as ConnectOptions)
    .then(() => {
      console.log('Connected to mongo')
    })
    .catch((err) => {
      console.log(err)
    })
}

const port = process.env.PORT || 5000

http.listen(port, () => {
  console.log('Server is running on port', port)
})

module.exports = app
