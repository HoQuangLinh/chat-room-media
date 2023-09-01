import { injectable } from 'tsyringe'
import { IRequest, IResponse } from '../interfaces/common'
import { ICreateRoomRequestDTO } from '../interfaces/dto/RoomDTO'
import RoomService from '../services/room.service'

@injectable()
export class RoomController {
  constructor(private roomService: RoomService) {}
  async createRoom(req: IRequest, res: IResponse) {
    const roomRequestDto = req.body as ICreateRoomRequestDTO

    roomRequestDto.creator = req.user.userId
    const room = await this.roomService.createRoom(roomRequestDto)
    return res.success(room)
  }
  async getMyOwnerRooms(req: IRequest, res: IResponse) {
    const creator = req.user.userId
    const myOwnerRoom = await this.roomService.getMyOwnerRooms(
      creator
    )
    return res.success(myOwnerRoom)
  }
  async getMyRooms(req: IRequest, res: IResponse) {
    const me = req.user.userId
    const myRooms = await this.roomService.getMyRooms(me)
    return res.success(myRooms)
  }
}

export default RoomController
