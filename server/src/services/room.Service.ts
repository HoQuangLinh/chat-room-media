import { injectable } from 'tsyringe'
import { ICreateRoomRequestDTO } from '../interfaces/dto/RoomDTO'

@injectable()
export default class RoomService {
  createRoom(roomRequestDto: ICreateRoomRequestDTO): boolean {
    return false
  }
  getMyOwnerRoom() {}
}
