import { injectable } from 'tsyringe'
import { IRequest, IResponse } from '../interfaces/common'
import { ICreateRoomRequestDTO } from '../interfaces/dto/RoomDTO'
import RoomService from '../services/room.Service'

@injectable()
export class RoomController {
  constructor(private roomService: RoomService) {}
  async createRoom(req: IRequest, res: IResponse) {
    const roomRequestDto = req.body as ICreateRoomRequestDTO
    const room = await this.roomService.createRoom(roomRequestDto)
    return res.success(room)
  }
}

export default RoomController
