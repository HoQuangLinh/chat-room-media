import { messageEndpoint } from '@/const/apiEndpoint'
import { IApiResponse } from '@/interfaces/api/Http'
import { IMessageRequest, IMessageResponse } from '@/interfaces/api/Message'
import http from './http.service'

class MessageService {
  async getMessageByRoomId(roomId: string): Promise<IMessageResponse[]> {
    const res = await http.post<IApiResponse<IMessageResponse[]>>(
      messageEndpoint.getMessageByRoomId,
      { roomId }
    )
    return res.data.data
  }
  async sendMessage(payload: IMessageRequest) {
    const res = await http.post<IApiResponse<IMessageResponse>>(
      messageEndpoint.sendMessageToRoom,
      payload
    )
    return res.data.data
  }
}
export const messageService = new MessageService()
