import { IMedia } from '../base/Media'
import { IRoom } from '../base/Room'
import { IUser } from '../base/User'

export interface IMessageRequest {
  roomId: string
  text?: string
  medias?: IMedia[]
}

export interface IMessagePayload {
  sender: IUser
  room?: IRoom
  text?: string
  medias?: IMedia[]
}

export interface IMessageResponse extends IMessagePayload {
  _id: string
}
