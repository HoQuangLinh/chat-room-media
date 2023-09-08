import { keySocket } from '@/const/keySocket'
import { createCall } from '@/redux/reducers/call.reducer'
import { receiveMessage } from '@/redux/reducers/room.reducer'
import peerService from '@/services/peer.service'
import socketService from '@/services/socket.service'
import { IUserPayload } from '@/utils/jwtToken'
import { Dispatch } from '@reduxjs/toolkit'

interface IUserSocket {
  id: string
  peerId?: string
}

export const initialSocketAction = (userPayload: IUserPayload) => {
  return (dispatch: Dispatch) => {
    const userParams: IUserSocket = {
      id: userPayload.userId
    }
    const socket = socketService.getSocketInstance()

    const peer = peerService.getPeerInstance()
    peer &&
      peer.on('open', (id) => {
        userParams.peerId = id
        if (!userPayload) return

        socket.emit(keySocket.joinUser, userParams)
        socket.on(keySocket.messageFromRoom, (data) => {
          dispatch(receiveMessage(data))
        })
        socket.on(keySocket.callFromRoom, (data) => {
          dispatch(createCall(data))
        })
      })
  }
}
