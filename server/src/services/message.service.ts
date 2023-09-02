import { injectable } from 'tsyringe'
import {
  IGetMessageByRoomIdRequest,
  IPayloadMessageDTO
} from '../interfaces/dto/MessageDTO'
import MessageModel from '../entities/Message'

@injectable()
export class MessageService {
  async sendMessageToRoom(message: IPayloadMessageDTO): Promise<any> {
    const { medias, roomId, sender, text } = message
    if (!sender) {
      throw new Error('sender is required')
    }
    if (!roomId) {
      throw new Error('roomId is required')
    }
    const newMessage = new MessageModel({
      medias: medias,
      room: roomId,
      sender: sender,
      text: text
    })
    await newMessage.save()
    return newMessage.populate('sender', '-password')
  }
  async getMessageByRoomId(payload: IGetMessageByRoomIdRequest) {
    const { roomId } = payload
    if (!roomId) {
      throw new Error('roomId not found')
    }
    const messages = await MessageModel.find({
      room: roomId
    }).populate('sender', '-password')
    return messages
  }
}
