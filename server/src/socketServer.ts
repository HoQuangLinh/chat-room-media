import { Socket } from 'socket.io'
import { SOCKET_KEYS } from './const/socketKeys'

interface IUserSocket {
  id: string
  socketId: string
}
let users: IUserSocket[] = []

const SocketServer = (socket: Socket) => {
  // Connect
  socket.on(SOCKET_KEYS.joinUser, (user) => {
    console.log('join socket')
    users.push({
      id: user._id,
      socketId: socket.id
    })
  })

  socket.on(SOCKET_KEYS.disconnect, () => {
    const user = users.find((user) => user.socketId === socket.id)
    if (!user) {
      return
    }
    if (user) {
      console.log(`${user.id} is disconnected`)
    }
    //Disconnect to system
    users = users.filter((user) => user.socketId !== socket.id)
  })
}

export default SocketServer
