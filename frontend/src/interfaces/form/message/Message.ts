import { IMedia } from '../../base/Media'

export interface IFormMessage {
  roomId: string
  text?: string
  media?: IMedia
}
