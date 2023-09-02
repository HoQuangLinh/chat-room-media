import { keySocket } from '@/const/keySocket'
import socketService from '@/services/socket.service'
import { IUserPayload, decodeTokenFromLocalStorage } from '@/utils/jwtToken'
import { Dispatch } from '@reduxjs/toolkit'

interface IUserSocket {
  id: string
}

export const initialSocketAction = (userPayload: IUserPayload): any => {
  return (dispatch: Dispatch) => {
    const socket = socketService.getSocketInstance()

    if (!userPayload) return
    const userParams: IUserSocket = { id: userPayload.userId }

    socket.emit(keySocket.joinUser, userParams)
  }
}
