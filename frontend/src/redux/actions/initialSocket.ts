import { keySocket } from '@/const/keySocket'
import socketService from '@/services/socket.service'
import { IUserPayload, decodeTokenFromLocalStorage } from '@/utils/jwtToken'
import { Dispatch } from '@reduxjs/toolkit'
import { receiveMessage, setMyRooms } from '../reducers/room.reducer'
import { createCall } from '../reducers/call.reducer'

interface IUserSocket {
  id: string
}

export const initialSocketAction = (userPayload: IUserPayload): any => {
  return (dispatch: Dispatch) => {
    const socket = socketService.getSocketInstance()

    if (!userPayload) return
    const userParams: IUserSocket = { id: userPayload.userId }

    socket.emit(keySocket.joinUser, userParams)
    socket.on(keySocket.messageFromRoom, (data) => {
      dispatch(receiveMessage(data))
    })
    socket.on(keySocket.callFromRoom, (data) => {
      dispatch(createCall(data))
    })
  }
}
