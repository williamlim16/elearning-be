import http from 'http'
import { Server } from 'socket.io'
export default function (server: http.Server): void {
  const io = new Server(server, { cors: { origin: '*' } })

  io.on('connection', (socket) => {
    socket.on('message', (data) => {
      socket.broadcast.emit('receive_message', data)
    })
  })
}
