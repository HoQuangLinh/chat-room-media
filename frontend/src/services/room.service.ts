import { roomEndpoint } from '@/const/apiEndpoint'
import { IApiResponse } from '@/interfaces/api/Http'
import { IFormAddMember, IFormCreateRoom } from '@/interfaces/form/room/Room'
import http from './http.service'

class RoomService {
  async createRoom(payload: IFormCreateRoom): Promise<boolean> {
    const res = await http.post<IApiResponse<boolean>>(
      roomEndpoint.createRoom,
      payload
    )
    return res.data.data
  }
  async getMyRooms(): Promise<any> {
    const res = await http.get<IApiResponse<any>>(roomEndpoint.getMyRooms)
    return res.data.data
  }

  async getMyOwnerRooms(): Promise<any> {
    const res = await http.get<IApiResponse<any>>(roomEndpoint.getMyOwnerRooms)
    return res.data.data
  }

  async addMemberToRooms(payload: IFormAddMember): Promise<any> {
    const res = await http.post<IApiResponse<boolean>>(
      roomEndpoint.addMembersToRoom,
      payload
    )
    return res.data.data
  }
}

export const roomService = new RoomService()
