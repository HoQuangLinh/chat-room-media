import { IMedia } from '../common'

export interface IPayloadMessageDTO {
  sender: string
  text: string
  medias: IMedia[]
  roomId: string
}
export interface IGetMessageByRoomIdRequest {
  sender: string
  roomId: string
}
