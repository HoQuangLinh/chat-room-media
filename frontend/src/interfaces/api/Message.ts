import { IMedia } from '../base/Media'
import { IRoom } from '../base/Room'
import { IUser } from '../base/User'

export interface IMessagePayload {
  sender: IUser
  room: IRoom
  text?: string
  media?: IMedia
}

export interface IMessageResponse extends IMessagePayload {
  _id: string
}
