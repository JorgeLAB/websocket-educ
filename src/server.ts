import express from 'express'

import { createServer } from "node:http"
import { Server } from "socket.io"

const firstMessage = { username: 'Admin', content: 'Bem-vindo ao chat!' }
const messsagesDatabase = [firstMessage]

const app = express()
const server = createServer(app)
const io = new Server(server)

app.use(express.static('public'))

app.get('/messages', (req, res) => res.json(messsagesDatabase))

io.on("connection", (socket) => {
	console.log(`Usuário conectado: ${socket.id}`)

	socket.on('message_sent', (messageData) => {
		console.log(`Nova messagem ${messageData}`)
		const newMessage = { username: `Usuário ${socket.id}`, content: messageData}

		messsagesDatabase.push(newMessage)

		io.emit('message_received', newMessage)
	})

	socket.on("disconnect", () => {
		console.log(`Usuário ${socket.id} foi desconectado!`)
	})
})

server.listen(3000, () => console.log('Server started!'))
