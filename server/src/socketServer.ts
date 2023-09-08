import { Socket } from 'socket.io'
import { SOCKET_KEYS } from './const/socketKeys'
import RoomModel from './entities/Room'
import UserModel from './entities/User'

interface IUserSocket {
  id: string
  username: string
  socketId: string
  peerId?: string
  roomIds?: string[]
}
let users: IUserSocket[] = []

const SocketServer = (socket: Socket) => {
  // Connect
  socket.on(SOCKET_KEYS.joinUser, async (user: IUserSocket) => {
    console.log(user)
    console.log('join socket')
    const me = user.id
    const myRoomIds = await RoomModel.find({
      $or: [
        {
          creator: me
        },
        { members: { $in: [me] } }
      ]
    })
    const userAccount = await UserModel.findById(me)
    if (!userAccount) {
      return
    }
    users.push({
      id: me,
      socketId: socket.id,
      peerId: user.peerId,
      roomIds: myRoomIds.map((item) => item._id.toString()),
      username: userAccount.username
    })
  })
  socket.on(SOCKET_KEYS.sendMessageToRoom, (data) => {
    users
      .filter(
        (user) =>
          user.id !== data.sender &&
          user.roomIds?.includes(data.roomId)
      )
      .forEach((client) => {
        socket
          .to(`${client.socketId}`)
          .emit(SOCKET_KEYS.messageFromRoom, data)
      })
  })

  socket.on(SOCKET_KEYS.callToRoom, (data) => {
    const userByRoomId = users.filter((user) =>
      user.roomIds?.includes(data.roomId)
    )
    const peersByRoomId = userByRoomId.map((item) => {
      return {
        username: item.username,
        peerId: item.peerId
      }
    })
    console.log(peersByRoomId)
    userByRoomId
      .filter((user) => user.id !== data.sender)
      .forEach((client) => {
        socket
          .to(`${client.socketId}`)
          .emit(SOCKET_KEYS.callFromRoom, {
            ...data,
            peerInfos: peersByRoomId
          })
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
