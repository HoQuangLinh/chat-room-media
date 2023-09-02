import { injectable } from 'tsyringe'
import { IRequest, IResponse } from '../interfaces/common'
import { ICreateRoomRequestDTO } from '../interfaces/dto/RoomDTO'
import RoomService from '../services/room.service'
import {
  IGetMessageByRoomIdRequest,
  IPayloadMessageDTO
} from '../interfaces/dto/MessageDTO'
import { MessageService } from '../services/message.service'

@injectable()
export class MessageController {
  constructor(private messageService: MessageService) {}
  async sendMessageToRoom(req: IRequest, res: IResponse) {
    const messageDTO = req.body as IPayloadMessageDTO
    messageDTO.sender = req.user.userId
    const room = await this.messageService.sendMessageToRoom(
      messageDTO
    )
    return res.success(room)
  }

  async getMessageByRoomId(req: IRequest, res: IResponse) {
    const me = req.user.userId
    const payload = req.body as IGetMessageByRoomIdRequest
    payload.sender = me
    const myRooms = await this.messageService.getMessageByRoomId(
      payload
    )
    return res.success(myRooms)
  }
}

export default MessageController
