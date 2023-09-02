import { messageEndpoint } from '@/const/apiEndpoint'
import { IApiResponse } from '@/interfaces/api/Http'
import { IMessagePayload, IMessageResponse } from '@/interfaces/api/Message'
import http from './http.service'

class MessageService {
  async getMessageByRoomId(roomId: string): Promise<IMessageResponse[]> {
    const res = await http.post<IApiResponse<IMessageResponse[]>>(
      messageEndpoint.getMessageByRoomId,
      { roomId }
    )
    return res.data.data
  }
  async sendMessage(payload: IMessagePayload) {
    const res = await http.post<IApiResponse<boolean>>(
      messageEndpoint.getMessageByRoomId,
      payload
    )
    return res.data.data
  }
}
export const messageService = new MessageService()
