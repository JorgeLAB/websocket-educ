import express from 'express'

import { createServer } from "node:http"
import { Server } from "socket.io"

const firstMessage = { username: 'Admin', content: 'Welcome to our chat!' }
const messsagesDatabase = [firstMessage]

const app = express()
const server = createServer(app)
const io = new Server(server)

app.use(express.static('public'))

app.get('/messages', (req, res) => res.json(messsagesDatabase))

// app.listen(3000, () => console.log('Server started!'))

io.on("connection", (socket) => {
	console.log(`Usuário conectado: ${socket.id}`)

	socket.on("disconnect", () => {
		console.log(`Usuário ${socket.id} foi desconectado!`)
	})
})

server.listen(3000, () => console.log('Server started!'))
